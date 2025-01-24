from flask import Flask, jsonify, request, Response
from flask_cors import CORS  # Import CORS
from pymongo import MongoClient
import gridfs
import os
import cv2
import time
import datetime
from threading import Thread
from twilio.rest import Client
import subprocess  # For ffmpeg integration

# Initialize Flask app
app = Flask(__name__)

# Configure CORS
# Allow all origins, methods, and headers (for development purposes)
CORS(app, resources={
    r"/*": {
        "origins": "*",  # Allow all origins
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Allow all methods
        "allow_headers": ["Content-Type", "Authorization"]  # Allow specific headers
    }
})

# MongoDB Configuration
client = MongoClient("mongodb://localhost:27017")
db = client["security_system"]
fs = gridfs.GridFS(db)
logs_collection = db["logs"]

# Directories for Temporary File Saving
image_dir = 'backend/images'
video_dir = 'backend/videos'
os.makedirs(image_dir, exist_ok=True)
os.makedirs(video_dir, exist_ok=True)

# Twilio Configuration
twilio_sid = 'AC547a3c88e044e0343266e53a11f48c4b'
twilio_auth_token = '52278c0d47274ce221f877db1145a8e3'
twilio_phone_number = '+12315387903'
user_phone_number = '+917032348501'
client_twilio = Client(twilio_sid, twilio_auth_token)

# Security System State
is_armed = False
sms_sent = False

# Video Parameters
SECONDS_TO_RECORD_AFTER_DETECTION = 5
frame_size = None
fourcc = cv2.VideoWriter_fourcc(*"mp4v")

def send_sms():
    """
    Sends an SMS notification to the user using Twilio.
    """
    message_body = (
        "ALERT: A possible breach has been detected in your premises.\n\n"
        "Our system has detected human movement. Please take the necessary actions.\n\n"
        "For further details and to monitor your security system, please log in to your account on our website:\n"
        "https://smarthomeservices.netlify.app/dashboard"
        "Thank you for using our security services. Stay safe!"
    )
    try:
        message = client_twilio.messages.create(
            body=message_body,
            from_=twilio_phone_number,
            to=user_phone_number
        )
        print(f"Message sent with SID: {message.sid}")
    except Exception as e:
        print(f"Failed to send SMS: {str(e)}")

def reset_sms_flag(delay):
    global sms_sent
    time.sleep(delay)
    sms_sent = False

def transcode_video(input_path, output_path):
    """
    Transcodes a video to H.264 format using ffmpeg.
    """
    try:
        command = [
            'ffmpeg',
            '-i', input_path,  # Input file
            '-c:v', 'libx264',  # Video codec
            '-c:a', 'aac',      # Audio codec
            '-strict', 'experimental',
            '-b:a', '128k',     # Audio bitrate
            output_path         # Output file
        ]
        subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print(f"Video transcoded successfully: {output_path}")
    except subprocess.CalledProcessError as e:
        print(f"FFmpeg error: {e.stderr.decode('utf-8')}")
        raise Exception("Failed to transcode video.")
    except FileNotFoundError:
        print("FFmpeg not found. Please ensure FFmpeg is installed and added to your PATH.")
        raise Exception("FFmpeg not found.")

def start_recording():
    global is_armed, sms_sent, frame_size

    cap = cv2.VideoCapture(0)
    frame_size = (int(cap.get(3)), int(cap.get(4)))
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    body_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_fullbody.xml")

    detection = False
    detection_stopped_time = None
    timer_started = False
    out = None

    while is_armed:
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        bodies = body_cascade.detectMultiScale(gray, 1.3, 5)

        if len(faces) + len(bodies) > 0:
            if detection:
                timer_started = False
            else:
                detection = True
                current_time = datetime.datetime.now().strftime("%d-%m-%Y-%H-%M-%S")
                video_file = os.path.join(video_dir, f"{current_time}.mp4")
                out = cv2.VideoWriter(video_file, fourcc, 20, frame_size)
                print("Started Recording!")

                if not sms_sent:
                    send_sms()
                    sms_sent = True
                    Thread(target=reset_sms_flag, args=(10,)).start()

        elif detection:
            if timer_started:
                if time.time() - detection_stopped_time >= SECONDS_TO_RECORD_AFTER_DETECTION:
                    detection = False
                    timer_started = False
                    if out:
                        out.release()
                        print("Stopped Recording!")

                        try:
                            # Transcode the video
                            transcoded_video_file = os.path.join(video_dir, f"transcoded_{current_time}.mp4")
                            transcode_video(video_file, transcoded_video_file)

                            # Save the transcoded video to MongoDB
                            with open(transcoded_video_file, 'rb') as f:
                                video_id = fs.put(f, filename=transcoded_video_file)

                            # Log the event
                            logs_collection.insert_one({
                                "timestamp": datetime.datetime.now(),
                                "action": "motion_detected",
                                "video": video_id
                            })

                            # Clean up the original and transcoded video files
                            os.remove(video_file)
                            os.remove(transcoded_video_file)
                        except Exception as e:
                            print(f"Error during video processing: {str(e)}")
                            # Save the original video if transcoding fails
                            with open(video_file, 'rb') as f:
                                video_id = fs.put(f, filename=video_file)
                            logs_collection.insert_one({
                                "timestamp": datetime.datetime.now(),
                                "action": "motion_detected",
                                "video": video_id
                            })
                            os.remove(video_file)
            else:
                timer_started = True
                detection_stopped_time = time.time()

        if detection and out:
            out.write(frame)

        cv2.imshow("Camera", frame)
        if cv2.waitKey(1) == ord('q'):
            break

    if out:
        out.release()
    cap.release()
    cv2.destroyAllWindows()

@app.route('/arm', methods=['POST'])
def arm_system():
    global is_armed
    is_armed = True
    Thread(target=start_recording).start()
    return jsonify({"message": "System armed, recording started"}), 200

@app.route('/disarm', methods=['POST'])
def disarm_system():
    global is_armed
    is_armed = False
    return jsonify({"message": "System disarmed"}), 200

@app.route('/get-armed', methods=['GET'])
def get_armed_status():
    return jsonify({"armed": is_armed}), 200

@app.route('/get-logs', methods=['GET'])
def get_logs():
    start_date = request.args.get("startDate")
    end_date = request.args.get("endDate")

    logs = logs_collection.find({
        "timestamp": {
            "$gte": datetime.datetime.fromisoformat(start_date),
            "$lte": datetime.datetime.fromisoformat(end_date)
        }
    })

    log_list = []
    for log in logs:
        log_list.append({
            "timestamp": log["timestamp"].isoformat(),
            "action": log["action"],
            "video": str(log.get("video", "")),
        })

    return jsonify({"logs": log_list}), 200

@app.route('/get-file/<file_id>', methods=['GET'])
def get_file(file_id):
    try:
        file = fs.get(file_id)
        response = Response(file.read(), content_type="video/mp4")
        response.headers["Content-Disposition"] = f"attachment; filename={file.filename}"
        return response
    except:
        return jsonify({"error": "File not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)

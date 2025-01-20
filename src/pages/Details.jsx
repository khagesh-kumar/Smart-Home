import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import "./Details.css";

function DetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const videoUrl = queryParams.get("video");
  const date = queryParams.get("date");

  // Handle missing video or date
  if (!videoUrl || !date) {
    return (
      <div className="details-page">
        <h3>Error: Missing video or date information.</h3>
        <button onClick={() => navigate("/")} className="back-btn">
          Go Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="details-page">
      {/* Back button */}
      <button onClick={() => navigate("/main")} className="back-btn">
        Back
      </button>

      {/* Video details */}
      <h3>Person Motion Detected</h3>
      <div className="video-container">
        <ReactPlayer
          url={`${videoUrl}`} // Ensure the video URL is correct
          controls={true}
          width="100%"
          height="auto"
          config={{
            file: {
              attributes: {
                controlsList: "nodownload", // Disable download option
              },
            },
          }}
        />
      </div>
      <p>Date: {date}</p>
    </div>
  );
}

export default DetailsPage;
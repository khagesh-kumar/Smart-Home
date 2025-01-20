import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import "./Log.css";

function Log({ url, date, onClick }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    onClick?.(); // Call the onClick prop if provided
  };

  return (
    <div className="log" onClick={handleClick}>
      {/* Video player */}
      <ReactPlayer
        ref={videoRef}
        url={url}
        playing={isPlaying}
        controls={true}
        width="100%"
        height="auto"
      />

      {/* Video details */}
      <div className="details">
        <h3>Person Motion Detected</h3>
        <p>{date}</p>
      </div>
    </div>
  );
}

export default Log;
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Main.css";
import Log from "./Log"; // Import the Log component

const API_BASE = "http://127.0.0.1:5000";

function MainPage({ isLoggedIn, handleLogout }) {
  const [armed, setArmed] = useState(false); // State for armed status
  const [logs, setLogs] = useState([]); // State for logs
  const [daysOffset, setDaysOffset] = useState(0); // State for days offset
  const navigate = useNavigate();

  // Define the onLogClicked function
  const onLogClicked = (videoId, timestamp) => {
    // Navigate to the Details page with the video URL and timestamp
    navigate(`/details?video=${videoId}&date=${timestamp}`);
  };

  // Fetch armed status from the backend
  useEffect(() => {
    fetch(`${API_BASE}/get-armed`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch armed status.");
        }
        return res.json();
      })
      .then((data) => setArmed(data.armed))
      .catch(() => alert("Error retrieving armed status from the camera."));
  }, []);

  // Helper function to get the date X days ago
  const getDateXDaysAgo = (x) => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - x);
    return pastDate.toISOString().split("T")[0];
  };

  // Fetch logs from the backend based on days offset
  const fetchLogs = useCallback(() => {
    fetch(
      `${API_BASE}/get-logs?startDate=${getDateXDaysAgo(
        daysOffset
      )}&endDate=${getDateXDaysAgo(daysOffset - 1)}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch logs.");
        }
        return res.json();
      })
      .then((data) => setLogs(data.logs || []))
      .catch(() => alert("Error fetching logs."));
  }, [daysOffset]); // Add daysOffset as a dependency

  // Fetch logs initially and set up polling
  useEffect(() => {
    fetchLogs(); // Fetch logs immediately

    // Set up polling to fetch logs every 5 seconds
    const intervalId = setInterval(fetchLogs, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [fetchLogs]); // Add fetchLogs to the dependency array

  // Toggle armed status
  const toggleArmed = () => {
    fetch(`${API_BASE}/${armed ? "disarm" : "arm"}`, { method: "POST" })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to toggle armed status.");
        }
        return res.json();
      })
      .then(() => setArmed(!armed))
      .catch(() => alert("Error arming/disarming the system."));
  };

  return (
    <div className="main">
      <div className="header">
        <h2>Security System Admin Panel</h2>
        <div className="toggle-container">
          <h2>
            System is{" "}
            {armed ? (
              <span style={{ color: "red" }}>Armed</span>
            ) : (
              <span style={{ color: "green" }}>Disarmed</span>
            )}
          </h2>
          <label className="switch">
            <input
              type="checkbox"
              id="togBtn"
              onChange={toggleArmed}
              checked={armed}
            />
            <div className="slider round"></div>
          </label>
        </div>
      </div>
      <div className="logs-container">
        <div className="logs-header">
          <h3>Logs</h3>
          <div className="pages">
            <button
              className="prev"
              onClick={() => setDaysOffset(daysOffset + 1)}
            >
              ← Previous
            </button>
            <p>{getDateXDaysAgo(daysOffset)}</p>
            <button
              className="next"
              onClick={() => daysOffset > 0 && setDaysOffset(daysOffset - 1)}
            >
              Next →
            </button>
          </div>
        </div>
        <div className="logs">
          {logs.map((log, i) => (
            <Log
              key={i}
              url={`${API_BASE}/get-file/${log.video}`}
              date={log.timestamp}
              onClick={() => onLogClicked(log.video, log.timestamp)} // Pass the function here
            />
          ))}
          {logs.length === 0 && <p>No events to display.</p>}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
// src/components/SingleVideo.tsx
import React, { useState } from "react";
import "../Css/Single.css";

export interface SingleVideoProps {
  onBack: () => void;
}

const SingleVideo: React.FC<SingleVideoProps> = ({ onBack }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [checked, setChecked] = useState(false);

  const startAutomation = () => {
    setLoading(true);
    setError("");
    setSuccess("");
    chrome.runtime.sendMessage(
      { action: "startAutomation", checked },
      (response) => {
        setLoading(false);
        if (response?.status === "success") {
          setSuccess("Automation started!");
        } else {
          setError("Failed to start automation");
        }
      }
    );
  };

  return (
    <div className="container">
      {/* Back button */}
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <header className="header">
        <h1 className="title">YT One-Click</h1>
        <p className="description">Like · Subscribe · Comment — Effortlessly</p>
      </header>

      <main className="main">
        <label className="customCheckbox">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            id="checkbox"
          />
          <span className="checkmark" />
          <span>AI Comment</span>
        </label>

        <button
          className="actionButton"
          onClick={startAutomation}
          disabled={loading}
        >
          {loading ? "Starting..." : "Start Automation"}
        </button>
      </main>

      {error && <div style={{ color: "#c00", marginTop: 8 }}>{error}</div>}
      {success && (
        <div style={{ color: "#090", marginTop: 8 }}>{success}</div>
      )}
    </div>
  );
};

export default SingleVideo;

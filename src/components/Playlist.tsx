// src/components/Playlist.tsx
import React, { useState } from "react";
import "../Css/Playlist.css";

export interface PlaylistProps {
  onBack: () => void;
}

const Playlist: React.FC<PlaylistProps> = ({ onBack }) => {
  const [error, setError] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const YT_PLAYLIST_REGEX = /[?&]list=([a-zA-Z0-9_-]+)/;
  const extractPlaylistId = (url: string): string | null => {
    const match = url.match(YT_PLAYLIST_REGEX);
    return match ? match[1] : null;
  };

  const handleStartAutomation = async () => {
    setError("");
    const playlistId = extractPlaylistId(playlistUrl.trim());
    if (!playlistId) {
      setError("Please enter a valid YouTube playlist URL.");
      return;
    }
    setIsLoading(true);
    const fullPlaylistUrl = `https://www.youtube.com/playlist?list=${playlistId}`;

    try {
      await new Promise((resolve) =>
        chrome.runtime.sendMessage(
          { action: "startAutomation", url: fullPlaylistUrl },
          resolve
        )
      );
      console.log("Automation started for:", fullPlaylistUrl);
    } catch {
      setError("Failed to start automation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="playlist-main">
      <div className="glass-card">
        {/* Back button */}
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>

        <div className="playlist-header">
          <div className="logo-text">
            YT<span className="logo-accent">Auto</span>
          </div>
        </div>

        <div className="input-group">
          <input
            id="playlistUrl"
            type="text"
            value={playlistUrl}
            onChange={(e) => setPlaylistUrl(e.target.value)}
            className={`input${error ? " shake" : ""}`}
            required
          />
          <label htmlFor="playlistUrl" className={playlistUrl ? "filled" : ""}>
            Paste playlist URL
          </label>
          {error && <span className="error-msg">{error}</span>}
        </div>

        <button
          className="playlist-btn"
          onClick={handleStartAutomation}
          disabled={isLoading}
        >
          <span className="btn-text">
            {isLoading ? "Loading..." : "Start Automation"}
          </span>
          <div className="ripple-container" />
        </button>
      </div>
    </div>
  );
};

export default Playlist;

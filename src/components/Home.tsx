// src/components/Home.tsx
import React from "react";
import "../Css/Home.css";

export type ViewOption = "SingleVideo" | "Playlist" | "Channel";

export interface HomeProps {
  onSelect: (option: ViewOption) => void;
}

const Home: React.FC<HomeProps> = ({ onSelect }) => (
  <div className="main">
    <div className="top-heading">
      <div className="heading-left">
        <div className="icon">Y</div>
        <div className="extension-info">
          <h1 className="heading">AutoFlow Pro</h1>
          <p className="slogan">YouTube Automation</p>
        </div>
      </div>
      <div className="heading-right">
        <div className="version">v4.4.1</div>
      </div>
    </div>

    <div className="instructions">
      <p>Select automation type to continue</p>
    </div>

    <div className="selections">
      <div className="single options">
        <button
          className="option"
          onClick={() => onSelect("SingleVideo")}
        >
          Single Video
        </button>
        <span className="info info-1">Automate one home page video</span>
      </div>

      <div className="playlist options">
        <button
          className="option"
          onClick={() => onSelect("Playlist")}
        >
          Playlist
        </button>
        <span className="info info-2">Automate playlist videos</span>
      </div>

      <div className="channel options">
        <button
          className="option"
          onClick={() => onSelect("Channel")}
        >
          Channel
        </button>
        <span className="info info-2">
          Automate your favourite channel
        </span>
      </div>
    </div>
  </div>
);

export default Home;

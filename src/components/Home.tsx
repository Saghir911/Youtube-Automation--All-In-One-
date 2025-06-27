import React from "react";
import "../Css/Home.css";

export const Home = () => {
  return (
    <>
      <div className="main">
        <div className="top-heading">
          <div className="heading-left">
            <div className="icon">Y</div>
            <div className="extension-info">
              <h1 className="heading">AutoFlow Pro</h1>
              <p className="slogan">Youtube Automation</p>
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
            <button className="option ">Single Video</button>
            <span className="info info-1">Automate one home page video</span>
          </div>

          <div className="playlist options">
            <button className="option">Playlist</button>
            <span className="info info-2">Automate one playlist Videos</span>
          </div>

          <div className="channel options">
            <button className="option">Channel</button>
            <span className="info info-2">
              Automate your favourite channel
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;

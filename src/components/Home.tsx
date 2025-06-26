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
              <h1 className="heading">AutoFlow</h1>
              <p className="slogan">Youtube Automation</p>
            </div>
          </div>
           <div className="heading-right">
            <div className="version">v4.4.1</div>
          </div>
        </div>
        <div className="selections">
          <button className="option single">Single</button>
          <button className="option playlist">Playlist</button>
          <button className="option channel">Channel</button>
        </div>
      </div>
    </>
  );
};
export default Home;

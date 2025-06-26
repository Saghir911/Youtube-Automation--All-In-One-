import React from "react";
import "../Css/Home.css";

export const Home = () => {
  return (
    <>
      <div className="main">
        <div className="top-heading">
          <h1 className="heading">Choose any Automation</h1>
          <p className="slogan">Like.Subscriber.Comment</p>
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

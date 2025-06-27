/* src/pages/Popup.tsx */
import React, { useState } from "react";
import Home from "../../components/Home";
import Single from "../../components/Single";
import Playlist from "../../components/Playlist";
import Channel from "../../components/Channel";
import "./Popup.css";

type View = "Home" | "SingleVideo" | "Playlist" | "Channel";

const Popup: React.FC = () => {
  const [view, setView] = useState<View>("Home");

  const renderView = () => {
    switch (view) {
      case "SingleVideo":
        return <Single onBack={() => setView("Home")} />;
      case "Playlist":
        return <Playlist onBack={() => setView("Home")} />;
      case "Channel":
        return <Channel onBack={() => setView("Home")} />;
      case "Home":
      default:
        return <Home onSelect={setView} />;
    }
  };

  return <div className="popup-container">{renderView()}</div>;
};

export default Popup;
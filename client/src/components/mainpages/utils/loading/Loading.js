import React from "react";
import "./loading.css";

function Loading() {
  return (
    <div id="building">
      <div id="blocks">
        <div className="b" id="b1"></div>
        <div className="b" id="b2"></div>
        <div className="b" id="b3"></div>
        <div className="b" id="b4"></div>
      </div>
      <div id="caption">Your product is almost ready...</div>
    </div>
  );
}

export default Loading;

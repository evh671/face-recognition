import React from "react";
import "./FaceRecognition.styles.css";

const FaceRecognition = ({ imageUrl, box }) => (
  <div className="center ma">
    <div className="face-recognition absolute mt2">
      <img id="face-image" src={imageUrl} alt="image" />
      <div
        className="bounding-box"
        style={{
          left: box.left,
          top: box.top,
          right: box.right,
          bottom: box.bottom,
        }}
      ></div>
    </div>
  </div>
);

export default FaceRecognition;

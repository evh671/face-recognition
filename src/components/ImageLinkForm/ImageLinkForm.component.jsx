import React from "react";
// import "../../App.css";
import "./ImageLinkForm.styles.css";

const ImageLinkForm = ({ onChangeInput, onClickDetectSubmit }) => (
  <div>
    <p className="f3">
      {"This Magic Brain will detect faces in your pictures. Give it a try."}
    </p>

    <div className="center">
      <div className="form center pa4 br3 shadow-5">
        <input
          type="text"
          className="w-70 f4 pa2"
          placeholder="Enter Image URL"
          onChange={onChangeInput}
        />
        <button
          type="button"
          className="w-30 dib f4 link white bg-light-purple ph3 pv2 grow"
          onClick={onClickDetectSubmit}
        >
          DETECT
        </button>
      </div>
    </div>
  </div>
);

export default ImageLinkForm;

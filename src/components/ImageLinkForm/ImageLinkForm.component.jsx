import React, { Component } from "react";
// import "../../App.css";
import "./ImageLinkForm.styles.css";
import Clarifai from "clarifai";

const isUrlEmpty = (url) => url === "" || url === null;

const app = new Clarifai.App({
  apiKey: "b91ec4ae740d4fc8899f56b470c07e90",
});

class ImageLinkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
  }

  calculateBox = (data) => {
    let faceImage = document.getElementById("face-image");
    console.log("faceImage: ", faceImage);

    let width = faceImage.clientWidth;
    let height = faceImage.clientHeight;

    let boundingBox = data.outputs[0].data.regions[0].region_info.bounding_box;

    return {
      left: boundingBox.left_col * width,
      right: width - boundingBox.right_col * width,
      top: boundingBox.top_row * height,
      bottom: height - boundingBox.bottom_row * height,
    };
  };

  onChangeInput = (event) => {
    this.setState({ input: event.target.value });
  };

  onClickDetectSubmit = () => {
    const { setImageBox, setImageUrl } = this.props;

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => setImageBox(this.calculateBox(response)))
      .catch((err) => {
        console.log(err);
      });

    setImageUrl(this.state.input);
  };

  render() {
    return (
      <div>
        <p className="f3">
          {
            "This Magic Brain will detect faces in your pictures. Give it a try."
          }
        </p>

        <div className="center">
          <div className="form center pa4 br3 shadow-5">
            <input
              type="text"
              className="w-70 f4 pa2"
              placeholder="Enter Image URL"
              onChange={this.onChangeInput}
            />
            <button
              type="button"
              className="w-30 dib f4 link white bg-light-purple ph3 pv2 grow"
              onClick={this.onClickDetectSubmit}
              disabled={isUrlEmpty(this.state.input)}
            >
              DETECT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageLinkForm;

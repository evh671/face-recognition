import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

import Navigation from "./components/Navigation/Navigation.component";
import Logo from "./components/Logo/Logo.component";
import Rank from "./components/Rank/Rank.component";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.component";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.component";

import SignIn from "./components/SignIn/SignIn.component";
import Register from "./components/Register/Register.component";

import Routes from "./utilities/routes";

import "./App.css";

const isImageUrl = (url) => url.match(/\.(jpeg|jpg|gif|png)$/) != null;

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

const app = new Clarifai.App({
  apiKey: "b91ec4ae740d4fc8899f56b470c07e90",
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: Routes.SIGN_IN,
    };
  }

  calculateBox = (data) => {
    let faceImage = document.getElementById("face-image");
    console.log(faceImage);

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

  setImageBox = (box) => {
    this.setState({ box });
  };

  onChangeInput = (event) => {
    this.setState({ input: event.target.value });
  };

  onClickDetectSubmit = () => {
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) => this.setImageBox(this.calculateBox(response)))
      .catch((err) => {
        console.log(err);
      });

    this.setState({ imageUrl: this.state.input });
  };

  onChangeRoute = (route) => {
    this.setState({ route });
  };

  render() {
    const { imageUrl, box, route } = this.state;
    console.log(imageUrl);

    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation route={route} onChangeRoute={this.onChangeRoute} />

        {route === Routes.SIGN_IN ? (
          <SignIn onChangeRoute={this.onChangeRoute} />
        ) : route === Routes.REGISTER ? (
          <Register onChangeRoute={this.onChangeRoute} />
        ) : (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onChangeInput={this.onChangeInput}
              onClickDetectSubmit={this.onClickDetectSubmit}
            />

            {isImageUrl(imageUrl) ? (
              <FaceRecognition imageUrl={imageUrl} box={box} />
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;

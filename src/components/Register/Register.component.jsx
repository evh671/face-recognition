import React, { Component } from "react";
import Routes from "../../utilities/routes";

import "./Register.styles.css";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      registerName: "",
      registerEmail: "",
      registerPassword: "",
    };
  }

  onChangeRegisterName = (event) => {
    this.setState({ registerName: event.target.value });
  };

  onChangeRegisterEmail = (event) => {
    this.setState({ registerEmail: event.target.value });
  };

  onChangeRegisterPassword = (event) => {
    this.setState({ registerPassword: event.target.value });
  };

  onSubmitRegister = () => {
    const { onChangeRoute } = this.props;

    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.registerName,
        email: this.state.registerEmail,
        password: this.state.registerPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log("Registered User: ", data);
          onChangeRoute(Routes.SIGN_IN);
        }
      });
  };

  render() {
    // const { onChangeRoute } = this.props;

    return (
      <div className="pa4 black-80">
        <div className="measure center shadow-5">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0 mt3">
            <legend className="f2 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f4" htmlFor="full-name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="full-name"
                id="full-name"
                onChange={this.onChangeRegisterName}
              />
            </div>

            <div className="mv3">
              <label className="db fw6 lh-copy f4" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={this.onChangeRegisterEmail}
              />
            </div>

            <div className="mv3">
              <label className="db fw6 lh-copy f4" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
                onChange={this.onChangeRegisterPassword}
              />

              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib mt3"
                type="submit"
                value="Register"
                onClick={this.onSubmitRegister}
              />
            </div>
          </fieldset>
        </div>
      </div>
    );
  }
}

export default Register;

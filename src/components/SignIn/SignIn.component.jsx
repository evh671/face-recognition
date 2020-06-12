import React from "react";
import Routes from "../../utilities/routes";

import "./SignIn.styles.css";

const SignIn = ({ onChangeRoute }) => (
  <div className="pa4 black-80">
    <div className="measure center shadow-5">
      <fieldset id="sign_up" className="ba b--transparent ph0 mh0 mt3">
        <legend className="f2 fw6 ph0 mh0">Sign In</legend>
        <div className="mt3">
          <label className="db fw6 lh-copy f4" htmlFor="email-address">
            Email
          </label>
          <input
            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
            type="email"
            name="email-address"
            id="email-address"
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
          />

          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib mt3"
            type="submit"
            defaultValue="Sign in"
            onClick={() => onChangeRoute(Routes.HOME)}
          />

          <div className="lh-copy mt3">
            <a
              onClick={() => onChangeRoute(Routes.REGISTER)}
              href="#0"
              className="f4 link dim black db"
            >
              Register
            </a>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
);

export default SignIn;

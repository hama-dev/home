import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  startLoginWithPopup,
  StartSingUpWithEmailAndPassword,
  StartSaveAccInDatabase
} from "../actions/auth";

import moment from "moment";

class RegisterPage extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: "",
    loadingRegisterBtn: false,
    loadingLoginWithGoogleBtn: false,
    ref: "users",
    adminProperty: false
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    if (this.checkInputValidate(this.state)) {
      this.setState({ loadingRegisterBtn: true });
      this.props
        .StartSingUpWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdAcc => {
          createdAcc.user
            .updateProfile({
              displayName: this.state.username
            })
            .then(() => {
              this.saveUser(createdAcc)
                .then(user => {
                  this.setState({ loadingRegisterBtn: false });
                })
                .catch(e => {
                  this.setState({ errors: e, loadingRegisterBtn: false });
                });
            });

          this.setState({ loadingRegisterBtn: false });
        })
        .catch(e => {
          this.setState({ errors: `${e}`, loadingRegisterBtn: false });
          setTimeout(() => {
            this.state({ errors: "" });
          }, 5000);
        });
    }
  };

  checkInputValidate = ({
    password,
    passwordConfirmation,
    email,
    username
  }) => {
    if (!password || !passwordConfirmation || !email || !username) {
      this.setState({ errors: "Please Fill All The Feilds" });
      setTimeout(() => {
        this.setState({ errors: "" });
      }, 4000);
      return false;
    } else if (password !== passwordConfirmation) {
      this.setState({ errors: "Passwords Do Not Much" });
      setTimeout(() => {
        this.setState({ errors: "" });
      }, 4000);
      return false;
    } else if (password.length < 6 && passwordConfirmation.length < 6) {
      this.setState({ errors: "Password Must Be At Least 6 Character" });
      setTimeout(() => {
        this.setState({ errors: "" });
      }, 4000);
      return false;
    } else {
      if (email === "hariadrahim@gmail.com") {
        this.setState({ adminProperty: true });
      }
      return true;
    }
  };

  singUpWithGmail = e => {
    this.setState({ loadingLoginWithGoogleBtn: true });
    e.preventDefault();
    this.props.startLoginWithPopup().then(user => {
      this.saveUser(user)
        .then(() => {
          this.setState({ loadingLoginWithGoogleBtn: false });
        })
        .catch(e => {
          this.setState({ errors: e, loadingLoginWithGoogleBtn: false });
        });
    });
  };

  saveUser = ({ user }) => {
    const createdAt = moment();
    return this.props.StartSaveAccInDatabase(
      this.state.ref,
      user.uid,
      user.displayName,
      createdAt.valueOf(),
      user.email,
      this.state.adminProperty
    );
  };

  render() {
    const {
      password,
      passwordConfirmation,
      errors,
      email,
      username,
      loadingLoginWithGoogleBtn,
      loadingRegisterBtn
    } = this.state;
    return (
      <div className="form-box">
        <form onSubmit={this.onSubmitHandler} className="loginForm">
          <h2 className="title-form"> Sign Up </h2>

          {errors && <p className="form-error-msg"> {errors} </p>}
          <input
            name="username"
            placeholder="Username"
            type="text"
            className="username form-input"
            value={username}
            onChange={this.onChangeHandler}
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            className="email form-input"
            value={email}
            onChange={this.onChangeHandler}
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            className="password form-input"
            value={password}
            onChange={this.onChangeHandler}
          />
          <input
            name="passwordConfirmation"
            placeholder="Password Confirmation"
            type="password"
            className="password form-input"
            value={passwordConfirmation}
            onChange={this.onChangeHandler}
          />
          <button
            className={
              loadingRegisterBtn
                ? "form-register-main-btn fa fa-refresh ld ld-spin"
                : "form-register-main-btn"
            }
          >
            Register
          </button>

          <p className="form-or">-------- OR --------</p>

          <p className="form-register-btn">
            Already have an account? <NavLink to="/login"> Login </NavLink>
          </p>
          <br />
          <br />

          <button
            className={
              loadingLoginWithGoogleBtn
                ? "login-with-google-btn fa fa-refresh ld ld-spin google-ionic"
                : "login-with-google-btn google-ionic"
            }
            onClick={this.singUpWithGmail}
          >
            <ion-icon className="google-logo" name="logo-google"></ion-icon>
            <span className="login-with-google-txt">Login in with Google</span>
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  startLoginWithPopup: () => dispatch(startLoginWithPopup()),

  StartSingUpWithEmailAndPassword: (email, password) =>
    dispatch(StartSingUpWithEmailAndPassword(email, password)),

  StartSaveAccInDatabase: (
    refLocat,
    uid,
    displayName,
    createdAt,
    email,
    adminProperty
  ) =>
    dispatch(
      StartSaveAccInDatabase(
        refLocat,
        uid,
        displayName,
        createdAt,
        email,
        adminProperty
      )
    )
});

export default connect(
  undefined,
  mapDispatchToProps
)(RegisterPage);

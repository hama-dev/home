import React from "react";
import {
  StartLoginWithEmailAndPassword,
  startLoginWithPopup,
  StartSaveAccInDatabase
} from "../actions/auth";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import moment from "moment";

class LoginPage extends React.Component {
  state = {
    email: "",
    password: "",
    errors: "",
    ref: "users",
    loadingLoginBtn: false,
    loadingLoginWithGoogleBtn: false,
    adminProperty: false
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.setState({ loadingLoginBtn: true });
    if (this.checkInputValidate(this.state)) {
      this.props
        .StartLoginWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
          this.setState({ loadingLoginBtn: false });
        })
        .catch(er => {
          this.setState({ errors: er.message, loadingLoginBtn: false });
          setTimeout(() => {
            this.setState({ errors: "" });
          }, 9000);
        });
    }
  };

  checkInputValidate = ({ email, password }) => {
    if (!email || !password) {
      this.setState({ errors: "Please Fill All The Feilds" });
      setTimeout(() => {
        this.setState({ errors: "" });
      }, 3000);
      return false;
    } else {
      return true;
    }
  };

  singUpWtihGoogleHandler = e => {
    e.preventDefault();
    this.setState({ loadingLoginWithGoogleBtn: true });

    this.props
      .startLoginWithPopup()
      .then(user => {
        this.saveUser(user);
      })
      .catch(er => {
        this.setState({ errors: er.message, loadingLoginWithGoogleBtn: false });
        setTimeout(() => {
          this.setState({ errors: "" });
        }, 9000);
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
      email,
      password,
      errors,
      loadingLoginBtn,
      loadingLoginWithGoogleBtn
    } = this.state;
    return (
      <div>
        <div className="loginForm">
          <form onSubmit={this.onSubmitHandler}>
            <h2 className="title-form"> Login </h2>
            {errors && <p className="form-error-msg"> {errors} </p>}
            <input
              className="email form-input"
              icon="mail"
              type="mail"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.onChangeHandler}
            />

            <br />

            <input
              className="password form-input"
              icon="lock"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.onChangeHandler}
            />

            <br />

            <button
              type="submit"
              className={
                loadingLoginBtn
                  ? "form-login-btn  fa fa-refresh ld ld-spin"
                  : "form-login-btn"
              }
            >
              Login
            </button>

            <br />
            <p className="form-or">-------- OR --------</p>

            <p className="form-register-btn">
              Don't have an account? <NavLink to="/register"> Sign up </NavLink>
            </p>
            <br />
            <br />
            <button
              className={
                loadingLoginWithGoogleBtn
                  ? "login-with-google-btn fa fa-refresh ld ld-spin google-ionic"
                  : "login-with-google-btn google-ionic"
              }
              onClick={this.singUpWtihGoogleHandler}
            >
              <ion-icon className="google-logo" name="logo-google">
                {" "}
              </ion-icon>
              <span className="login-with-google-txt">
                {" "}
                SIGN IN WITH GOOGLE{" "}
              </span>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToState = dispatch => ({
  startLoginWithPopup: () => dispatch(startLoginWithPopup()),

  StartLoginWithEmailAndPassword: (email, password) =>
    dispatch(StartLoginWithEmailAndPassword(email, password)),

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

const connectToRedux = connect(
  undefined,
  mapDispatchToState
)(LoginPage);

export default connectToRedux;

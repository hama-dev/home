import React, { useState, useEffect } from "react";
import { StartFetchUser } from "../actions/auth";
import { connect } from "react-redux";
import moment from "moment";
import UserRequestForm from "./UserRequestForm";

const UserProfile = props => {
  const [username, setUsername] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [numberOfRequest, setNumberOfRequest] = useState("");

  const refLocat = `users/${props.match.params.id}`;
  props
    .StartFetchUser(refLocat)
    .then(snapshot => {
      snapshot.val().request &&
        setNumberOfRequest(Object.entries(snapshot.val().request).length);
      setUsername(snapshot.val().name);
      setCreatedAt(snapshot.val().createdAt);
    })
    .catch(e => {});

  return (
    <div>
      <div className="card">
        <div className="card-form">
          <img
            className="profile-picture"
            src="http://pngimg.com/uploads/pubg/pubg_PNG46.png"
          />
          <p className="profile-username"> {username.toUpperCase()} </p>
          <p className="profile-type"> Player </p>
          <p className="profile-jointat">
            {" "}
            Joined At: {moment(createdAt).format("M-D-YYYY")}{" "}
          </p>

          <div className="num-of-request">
            <ion-icon
              className="num-of-request-icon"
              name="pricetag"
            ></ion-icon>
            <p className="num-of-request-count">
              {" "}
              {numberOfRequest ? numberOfRequest : 0} Request{" "}
            </p>
          </div>

          <div>
            <p>&shy;</p>
          </div>
        </div>
      </div>

      { props.isAdmin || (props.userUid  === props.match.params.id) ? (
        <UserRequestForm id={props.match.params.id} />
      ) : (
        <div>
          <img
            className="card-from-lock-icon"
            src="https://cdn1.iconfinder.com/data/icons/hawcons/32/698634-icon-118-lock-rounded-512.png"
          />
        </div>
      )}
    </div>
  );
};

const mapDistpatchToProps = dispatch => ({
  StartFetchUser: refLocat => dispatch(StartFetchUser(refLocat))
});

const mapStateToProps = state => ({
  userUid: state.auth.uid,
  isAdmin: state.auth.adminProperty
});

const connectToRedux = connect(
  mapStateToProps,
  mapDistpatchToProps
)(UserProfile);
export default connectToRedux;

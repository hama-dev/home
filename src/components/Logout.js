import React from "react";
import { connect } from "react-redux";
import { startSingOut } from "../actions/auth";
import { Button } from "semantic-ui-react";

const Logout = ({ startSingOut }) => {
  return (
    <div>
      <a onClick={startSingOut}> Logout </a>
    </div>
  );
};

const mapDispatchToState = dispatch => ({
  startSingOut: () => dispatch(startSingOut())
});

const connectToRedux = connect(
  undefined,
  mapDispatchToState
)(Logout);

export default connectToRedux;

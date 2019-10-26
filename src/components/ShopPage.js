import React from "react";
import PostForm from "./PostForm";
import { connect } from "react-redux";


const ExpenseDashboardPage = ({ isAuth, uid, isAdmin }) => (
  <div>
    <PostForm />
  </div>
);

const mapStateToDispatch = state => {
  return {
    isAuth: !!state.auth.uid,
    uid: state.auth.uid,
    isAdmin: state.auth.adminProperty
  };
};

const connectToRedux = connect(mapStateToDispatch)(ExpenseDashboardPage);

export default connectToRedux;

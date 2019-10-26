import { connect } from "react-redux";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import Header from "../components/Header";

export const AdminRoute = ({ isAuth ,isAdmin, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={props =>
      isAuth && isAdmin ? (
        <div>
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuth: !!state.auth.uid,
  isAdmin: state.auth.adminProperty
});

export default connect(mapStateToProps)(AdminRoute);

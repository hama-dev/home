import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import AdminRoute from "./AdminRoute";

//! Import Component
import NotFoundPage from "../components/NotFoundPage";
import AddPost from "../components/AddItem";
import RequestForm from "../components/RequestForm";
import RegisterPage from "../components/RegisterPage";
import ShopPage from "../components/ShopPage";
import LoginPage from "../components/LoginPage";
import UserProfile from "../components/UserProfile";
import AdminDashboard from "../components/AdminDashboard";
import ViewPost from "../components/ViewPost";
import Header from "../components/Header";
import DashboardPage from "../components/DashboardPage";
import PlayerForm from "../components/PlayerForm";
import AddPlayer from "../components/AddPlayer";
import Footer from "../components/Footer";
import PageNotFound from '../components/404';

export const history = createBrowserHistory();

//Create an component
//inside componenet w add <BrowserRouter> </BrowserRouter>
// and we add Swith if any of Route a run the BrowserRouter will be break;
// we define <Header />
//path content the link
//if th path is {excat} the link the component will be run

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path={"/"} component={DashboardPage} exact />
        <Route path={"/shop"} component={ShopPage} />
        <Route path={"/post/:id"} component={ViewPost} />
        <Route path={"/player"} component={PlayerForm} />
        <PublicRoute path={"/Register"} component={RegisterPage} exact />
        <PublicRoute path={"/login"} component={LoginPage} exact />
        <Route path={"/user/:id"} component={UserProfile} />
        <AdminRoute path={"/admin"} component={AdminDashboard} exact />
        <AdminRoute path={"/admin/additem"} component={AddPost} />
        <AdminRoute path={"/admin/addplayer"} component={AddPlayer} />
        <AdminRoute path={"/admin/requests"} component={RequestForm} />
        <Route path={"*"} component={PageNotFound} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default AppRouter;

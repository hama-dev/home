import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import { login, logout } from "./actions/auth";
import configureStore from "../src/store/configureStore";
import "normalize.css/normalize.css";
import "./styles/styles.scss";
import { firebase } from "./firebase/firebase";
import { StartSetPost } from "./actions/post";
import { SatrtFetchPlayer } from "./actions/player";
import Loading from "../src/components/Loading";
const store = configureStore();

const jsx = (
  <div>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </div>
);
ReactDOM.render(<Loading />, document.getElementById("app"));

let isRender = true;
const render = async () => {
  if (isRender) {
    //await store.dispatch(StartSetPost());
    ReactDOM.render(jsx, document.getElementById("app"));
    isRender = true;
  }
};

firebase.auth().onAuthStateChanged(async user => {
  let adminProperty = false;
  if (user) {
    if (user.email === "kurdsquad196@gmail.com") {
      adminProperty = true;
    }
    await store.dispatch(SatrtFetchPlayer());
    await store.dispatch(login(user.uid, adminProperty));
    store.dispatch(StartSetPost()).then(() => {
      render();
    });
  } else {
    await store.dispatch(SatrtFetchPlayer());
    await store.dispatch(logout());
    await store.dispatch(StartSetPost()).then(() => {
      render();
    });
  }
});

// $('a[href*="#"]')
//       // Remove links that don't actually link to anything
//       .not('[href="#"]')
//       .not('[href="#0"]')
//       .click(function (event) {
//         // On-page links
//         if (
//           location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
//           location.hostname == this.hostname
//         ) {
//           // Figure out element to scroll to
//           var target = $(this.hash);
//           target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//           // Does a scroll target exist?
//           if (target.length) {
//             // Only prevent default if animation is actually gonna happen
//             event.preventDefault();
//             $('html, body').animate({
//               scrollTop: target.offset().top
//             }, 1000, function () {
//               // Callback after animation
//               // Must change focus!
//               var $target = $(target);
//               $target.focus();
//               if ($target.is(":focus")) { // Checking if the target was focused
//                 return false;
//               } else {
//                 $target.attr('tabindex',
//                   '-1'); // Adding tabindex for elements not focusable
//                 $target.focus(); // Set focus again
//               };
//             });
//           }
//         }
//       });

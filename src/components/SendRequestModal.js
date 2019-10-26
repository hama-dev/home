import React from "react";
import { connect } from "react-redux";
import { StartFetchUser } from "../actions/auth";
import uuid from "uuid";
import moment from "moment";
import { NavLink } from "react-router-dom";
import numeral from "numeral";
import { StartSendRequest, StartSaveRequestAtDb } from "../actions/request";

class SendRequestModal extends React.Component {
  state = {
    loading: false,
    error: "",
    open: false,
    productPrice: this.props.productPrice,
    quantity: 1,
    success: false,
    phoneNumber: "",
    authError: false
  };

  buyButtonHandler = () => {
    if (!this.props.isAuth) {
      this.setState({ authError: true });
    } else {
      this.setState({ loading: true, error: "" });
      const phoneNumber = this.state.phoneNumber;
      const requestId = uuid();
      const sentAt = moment().valueOf();
      const userId = this.props.authId;
      const reject = "";
      const ref = `users/${userId}/request/${requestId}`;
      const refDb = `request/${requestId}`;
      const productId = this.props.productId;
      const productPrice = parseFloat(this.props.productPrice, 10) * 100;
      let sendBy = "";
      let userEmail = "";
      const quantity = this.state.quantity;
      const requestRead = false;
      const requestAccept = false;
      const refLocat = `users/${userId}`;
      const productImg = this.props.productImg;
      const totalPrice =
        parseFloat(this.state.quantity * this.props.productPrice, 10) * 100;

      this.props
        .StartFetchUser(refLocat)
        .then(snapshot => {
          sendBy = snapshot.val().name;
          userEmail = snapshot.val().email;

          this.props
            .StartSendRequest(
              ref,
              sendBy,
              userId,
              userEmail,
              productId,
              productImg,
              sentAt,
              requestRead,
              requestAccept,
              quantity,
              productPrice,
              totalPrice,
              reject,
              phoneNumber
            )
            .then(() => {
              this.props
                .StartSaveRequestAtDb(
                  refDb,
                  sendBy,
                  userId,
                  userEmail,
                  productId,
                  productImg,
                  sentAt,
                  requestRead,
                  requestAccept,
                  quantity,
                  productPrice,
                  totalPrice,
                  reject,
                  phoneNumber
                )
                .then(() => {
                  this.setState({ loading: false, success: true });

                  setTimeout(() => {
                    this.setState({ loading: false, success: false });
                  }, 4000);
                })
                .catch(e => {
                  this.setState({ loading: false, error: e });
                });
            })
            .catch(e => {
              this.setState({ loading: false, error: e });
            });
        })
        .catch(e => {
          console.log(e);
          this.setState({ loading: false, error: e });
        });
    }
  };

  onChangeQuantity = e => {
    if (e.target.value != 0 && e.target.value.match(/^\d{1,}(\d{0,2})?$/)) {
      this.setState({ quantity: e.target.value });
    }
  };

  onChangePhoneNumber = e => {
    this.setState({ phoneNumber: e.target.value });
  };

  render() {
    const { quantity, phoneNumber } = this.state;
    return (
      <div className="view-post-buyNow">
        <input
          className="send-requesy-phone-number"
          value={phoneNumber}
          required
          onChange={this.onChangePhoneNumber}
          type="text"
          placeholder="Phone Number"
        />

        <div className="send-request-qu-pr">
          <input
            className="send-requesy-quantity"
            value={quantity}
            required
            onChange={this.onChangeQuantity}
            type="number"
          />
          <p className="send-request-price">
            {" "}
            $ {numeral(quantity * this.props.productPrice).format("0,0.00")}
          </p>
        </div>
        <button
          className={
            this.state.loading
              ? `send-requesy-btn-buynow button fa fa-refresh ld ld-spin`
              : `send-requesy-btn-buynow button`
          }
          onClick={this.buyButtonHandler}
        >
          {" "}
          Buy Now{" "}
        </button>
        <br />
        {this.state.success && (
          <p className="send-success">Successfully Ordered</p>
        )}

        {this.state.error && <p className="send-error">{this.state.error}</p>}
        {this.state.authError && (
          <p className="send-error">
            {" "}
            Please <NavLink to="/login">Login</NavLink> To Continue <br /> Dont
            Have An Account? <NavLink to="/register">Create One</NavLink>{" "}
          </p>
        )}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  StartSendRequest: (
    ref,
    sendBy,
    userId,
    userEmail,
    productId,
    productImg,
    sentAt,
    requestRead,
    requestAccept,
    quantity,
    productPrice,
    totalPrice,
    reject,
    phoneNumber
  ) =>
    dispatch(
      StartSendRequest(
        ref,
        sendBy,
        userId,
        userEmail,
        productId,
        productImg,
        sentAt,
        requestRead,
        requestAccept,
        quantity,
        productPrice,
        totalPrice,
        reject,
        phoneNumber
      )
    ),
  StartFetchUser: refLocat => dispatch(StartFetchUser(refLocat)),
  StartSaveRequestAtDb: (
    refDb,
    sendBy,
    userId,
    userEmail,
    productId,
    productImg,
    sentAt,
    requestRead,
    requestAccept,
    quantity,
    productPrice,
    totalPrice,
    reject,
    phoneNumber
  ) =>
    dispatch(
      StartSaveRequestAtDb(
        refDb,
        sendBy,
        userId,
        userEmail,
        productId,
        productImg,
        sentAt,
        requestRead,
        requestAccept,
        quantity,
        productPrice,
        totalPrice,
        reject,
        phoneNumber
      )
    )
});

const mapStateToProp = state => ({
  authId: state.auth.uid,
  isAuth: !!state.auth.uid
});

const connectToRedux = connect(
  mapStateToProp,
  mapDispatchToProps
)(SendRequestModal);

export default connectToRedux;

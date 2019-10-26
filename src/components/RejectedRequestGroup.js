import React from "react";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  StartAcceptTheRequest,
  StartRejectTheRequest
} from "../actions/request";
import numeral from "numeral";
import moment from "moment";

class RejectedRequestGroup extends React.Component {
  state = {
    requestId: this.props.request[0][1],
    answerdAt: this.props.request[1][1],
    phoneNumber: this.props.request[2][1],
    productId: this.props.request[3][1],
    productImg: this.props.request[4][1],
    productPrice: this.props.request[5][1],
    quantity: this.props.request[6][1],
    reject: this.props.request[7][1],
    requestAccept: this.props.request[8][1],
    requestRead: this.props.request[9][1],
    sendBy: this.props.request[10][1],
    sentAt: this.props.request[11][1],
    totalPrice: this.props.request[12][1],
    userEmail: this.props.request[13][1],
    userId: this.props.request[14][1],
    rejectButtonDisabled: !!this.props.request[7][1]
  };

  AcceptRequestHandler = () => {
    const now = moment().valueOf();
    this.setState({ requestAccept: true });
    this.props.StartAcceptTheRequest(
      this.state.requestId,
      this.state.userId,
      now
    );
  };

  onRejectSubmitHandler = e => {
    e.preventDefault();
    const now = moment().valueOf();

    const msg = e.target.message.value;
    if (msg) {
      this.props
        .StartRejectTheRequest(
          this.state.requestId,
          this.state.userId,
          msg,
          now
        )
        .then(() => {
          this.setState({ rejectButtonDisabled: true });
          e.target.message.value = "";
        });
    }
  };

  onChangeRejectInputHandler = e => {
    this.setState({ reject: e.target.value });
  };

  render() {
      console.log(this.props)
    const {
      productId,
      productImg,
      requestAccept,
      sendBy,
      sentAt,
      quantity,
      totalPrice,
      userEmail,
      userId,
      rejectButtonDisabled
    } = this.state;
    return (
      <div className="col span-1-of-4 image-group">
        <div className="image-group-form">
          <NavLink to={`/post/${productId}`}>
            <img className="image-group-img" src={productImg} />
          </NavLink>

          <div className="request-group-txt">
            <NavLink className="request-group-sendby" to={`/user/${userId}`}>
              <p> Send By: {sendBy}</p>
            </NavLink>
            <p className="request-group-quantity"> quantity: {quantity} </p>
            <p className="request-group-sentat">
              Sent At: {moment(sentAt).fromNow(false)}
            </p>

            <p className="request-group-total">
              Total Price: {numeral(totalPrice / 100).format("$0,0.00")}{" "}
            </p>
            <p className="request-group-email">{userEmail}</p>
            <p className="request-group-phone">07707776655</p>

            <button
              className="image-group-approve-btn"
              disabled={requestAccept || rejectButtonDisabled}
              onClick={this.AcceptRequestHandler}
            >
              Approve
            </button>
          </div>

          <div className="request-group-reject-form">
            <form onSubmit={this.onRejectSubmitHandler} size="large">
              <input
                className="request-group-reject-form-inp"
                required
                disabled={rejectButtonDisabled}
                name="message"
                placeholder="Message"
                onChange={this.onChangeRejectInputHandler}
              />
              <br />

              <button
                className="request-group-reject-form-btn"
                disabled={rejectButtonDisabled}
              >
                Reject
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDipatchToProps = dispatch => ({
  StartAcceptTheRequest: (requestId, userId, answerdAt) =>
    dispatch(StartAcceptTheRequest(requestId, userId, answerdAt)),
  StartRejectTheRequest: (requestId, userId, msg, answerdAt) =>
    dispatch(StartRejectTheRequest(requestId, userId, msg, answerdAt))
});

const connectToRedux = connect(
  undefined,
  mapDipatchToProps
)(RejectedRequestGroup);

export default connectToRedux;

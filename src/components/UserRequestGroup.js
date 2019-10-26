import React from "react";
import moment from "moment";
import { NavLink} from "react-router-dom";
import numeral from "numeral";
import UserCancelRequest from "./UserCancelRequest";

class UserRequestGroup extends React.Component {
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
  };

  render() {
    const {
      requestId,
      productId,
      productImg,
      requestAccept,
      quantity,
      sentAt,
      totalPrice,
      answerdAt,
      reject,
      userId
    } = this.state;
    return (
      <div className="request-group-form ">
        <NavLink to={`/post/${productId}`}>
          <img className="request-img-form" src={productImg} /><br/>
        </NavLink>
        <NavLink className="title-request-form" to={`/post/${productId}`}>
          <span className="title-request-form-txt">{numeral(totalPrice / 100).format("$0,0.00")}</span>
        </NavLink>

        <p className="request-form-price"> Quantity = {quantity} </p>

        <div>
          <h1 className="request-time-details">
            Sent At: {moment(sentAt).format("M-D-YYYY")}
          </h1>
          <h1 className="request-time-details">
            Answerd At : {moment(answerdAt).fromNow(false)}
          </h1>
        </div>

        <div>
          {!reject ? (
            <button
              className={
                requestAccept
                  ? "accept-request-form frm"
                  : "waiting-request-form frm"
              }
            >
              {requestAccept
                ? "قبوڵكراوه، چاوه‌ڕوانی گه‌شتنی به‌‌"
                : "تكایه‌ چاوه‌ڕوانی په‌یوه‌ندی به‌"}
            </button>
          ) : (
            <button className="reject-request-form frm"> {reject} </button>
          )}
        </div>
        <UserCancelRequest userId={userId} requestId={requestId} />
      </div>

      // <div>
      //   <Card>
      //     <Card.Content>
      //       <NavLink to={`/post/${productId}`}>
      //         <Image floated="right" size="mini" src={productImg} />
      //       </NavLink>
      //       <NavLink to={`/user/${userId}`}>
      //         {" "}
      //         <Card.Header>{sendBy}</Card.Header>{" "}
      //       </NavLink>
      //       <Card.Meta>Sent At: {moment(sentAt).format("M-D-YYYY")}</Card.Meta>

      //       <Card.Description>
      //         {userEmail} <strong> </strong>
      //       </Card.Description>
      //     </Card.Content>
      //     <Card.Content extra>
      //       <div className="ui two buttons">
      //         <Message>Approve</Message>
      //         {!reject ? (
      //           <Button basic color={requestAccept ? "green" : "red"}>
      //             {requestAccept
      //               ? "قبوڵكراوه، چاوه‌ڕوانی گه‌شتنی به‌‌"
      //               : "تكایه‌ چاوه‌ڕوانی په‌یوه‌ندی به‌"}
      //           </Button>
      //         ) : (
      //           <Button basic color="red">
      //             {" "}
      //             {reject}{" "}
      //           </Button>
      //         )}
      //       </div>
      //       <UserCancelRequest userId={userId} requestId={requestId} />
      //     </Card.Content>
      //   </Card>
      // </div>
    );
  }
}

export default UserRequestGroup;

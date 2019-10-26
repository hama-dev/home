import React from "react";
import { Message } from "semantic-ui-react";

import SendRequestModal from "../components/SendRequestModal";

class SendRequest extends React.Component {
  state = {
    loading: false,
    error: "",
    tryToBuy: false
  };

  render() {
    return (
      <div>
        <SendRequestModal
          productImg={this.props.productImg}
          productId={this.props.productId}
          productPrice={this.props.productPrice}
        />
      </div>
    );
  }
}

export default SendRequest;

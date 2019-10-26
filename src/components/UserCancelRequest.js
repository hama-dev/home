import React from "react";
import { connect } from "react-redux";
import { StartRemoveRequest } from "../actions/request";

class UserCancelRequest extends React.Component {
  state = {
    requestId: this.props.requestId,
    userId: this.props.userId,
    loading: false
  };
  onCancelHandler = () => {
    this.setState({ loading: true });
    this.props
      .StartRemoveRequest(this.state.requestId, this.state.userId)
      .then(() => {
        this.setState({ loading: false });
        location.reload();
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <button
        onClick={this.onCancelHandler}
        className="cancel-send-request"
      >
        Cancel Request
      </button>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  StartRemoveRequest: (requestId, userId) =>
    dispatch(StartRemoveRequest(requestId, userId))
});

const connectToRedux = connect(
  undefined,
  mapDispatchToProps
)(UserCancelRequest);
export default connectToRedux;

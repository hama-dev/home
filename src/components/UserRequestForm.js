import React from "react";
import { connect } from "react-redux";
import UserRequestGroup from "./UserRequestGroup";
import { StartSetRequest } from "../actions/request";

class UserRequestForm extends React.Component {
  state = {
    requests: [],
    ref: `users/${this.props.id}/request`
  };

  UNSAFE_componentWillMount = async () => {
    await this.props.StartSetRequest(this.state.ref);
    this.setState({ requests: this.props.request.requset });
  };

  render() {
    const { requests } = this.state;
    return (


      <div className="request-form  col">
        {requests.map((request, i) => (
          <UserRequestGroup key={i} request={Object.entries(request)} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    request: state
  };
};

const mapDispatchToProps = dispatch => ({
  StartSetRequest: ref => dispatch(StartSetRequest(ref))
});

const connectToRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRequestForm);
export default connectToRedux;

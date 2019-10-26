import React from "react";
import { connect } from "react-redux";
import RequestGroup from "./RequestGroup";
import { StartSetRequest } from "../actions/request";
import { request } from "http";

class ViewRequest extends React.Component {
  state = {
    requests: [],
    ref: "request"
  }

  UNSAFE_componentWillMount = async () => {
   await this.props.StartSetRequest(this.state.ref)
    await this.setState({ requests: this.props.request.requset });
    console.log(this.state.requests)
  };

  render() {
    const { requests } = this.state;

    return (
      <div>
        {requests.map((request, i) => (
          <RequestGroup key={i} request={Object.entries(request)} />
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
  StartSetRequest: (ref) => dispatch(StartSetRequest(ref))
});

const connectToRedux = connect(mapStateToProps , mapDispatchToProps)(ViewRequest);
export default connectToRedux;

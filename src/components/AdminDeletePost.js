import React from "react";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom'
import { StartDeletePost } from "../actions/post";

class AdminDeletePost extends React.Component {
  state = {
    isAdmin: this.props.isAdmin,
    loading: false
  };

  deletePostHandler = () => {
    this.props
      .StartDeletePost(this.props.postId)
      .then(() => {
        this.setState({ loading: true });
        location.reload();
        
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div>
        {this.state.isAdmin && (
          <div>
            <button onClick={this.deletePostHandler}>Delete</button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAdmin: state.auth.adminProperty
});

const mapDispatchToProps = dispatch => ({
  StartDeletePost: postId => dispatch(StartDeletePost(postId))
});

const connectToRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDeletePost);

export default connectToRedux;

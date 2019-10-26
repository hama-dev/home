import React from "react";
import { connect } from "react-redux";
import ImageGroup from "./ImageGroup";

class PostForm extends React.Component {
  state = {
    images: [],
    postDt: this.props.post
  };

  componentDidMount = () => {
    this.setState({ images: this.GetImages() });
  };

  GetImages = () => {
    let images = [];
    const postDT = this.props.post;
    if (this.props.post) {
      this.props.post.forEach(post => {
        images.push(post);
      });
    }
    return images;
  };

  render() {
    const { images } = this.state;
    return (
      <div>
            {images &&
              images.map((post, i) => <ImageGroup key={i} post={post} />)}{" "}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.post
  };
};

const connectToRedux = connect(mapStateToProps)(PostForm);
export default connectToRedux;

import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import SendRequest from "./SendRequest";
import numeral from "numeral";

class ViewPost extends React.Component {
  state = {
    post: null,
    coverUrl: "",
    productId: "",
    imagesUrl: [],
    productPrice: 0,
    detailsVisibility: false
  };

  UNSAFE_componentWillMount = () => {
    const posts = Object.entries(this.props.post);
    const currentPost = posts.find(post => {
      return post[1].id === this.props.match.params.id;
    });

    const coverUrl = Object.entries(currentPost[1].images)[0][1].imageUrl;
    this.setState({
      post: currentPost[1],
      coverUrl,
      productPrice: currentPost[1].price
    });

    const images = Object.entries(currentPost[1].images);

    const url = images.map(image => {
      return image[1].imageUrl;
    });
    this.setState({ imagesUrl: url });
  };

  OrderBtnHanlder = () => {
    const DV = !this.state.detailsVisibility;
    this.setState({ detailsVisibility :  DV })
  }

  render() {
    const { post, coverUrl, imagesUrl, productPrice , detailsVisibility } = this.state;

    return (
      <div className="container">
        <div className="images">
          <img className="view-post-img" src={coverUrl} />
        </div>
        <div className="slideshow-buttons">
          <div className="one"></div>
        </div>
        <div className="sizes">
          <div className="view-post-all-images">
            {imagesUrl.map((url, i) => {
              return (
                <a
                  key={i}
                  onClick={() =>
                    this.setState(() => ({
                      coverUrl: url
                    }))
                  }
                >
                  <img className="view-post-images size" src={url} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="view-product">
          <p className="view-post-title">{post.title}</p>
          <h2 className="view-post-price">
            {" "}
            {numeral(post.price).format("$0,0.00")}{" "}
          </h2>
          <p className="desc">{post.description} </p>
          <div >
           { detailsVisibility &&
             <SendRequest productPrice={productPrice} productId={this.props.match.params.id} productImg={coverUrl} />
           }
          </div>
          <div className="buttons" onClick={this.OrderBtnHanlder}>
            <button className="add button">Order {detailsVisibility ?  "-"  : "+" }</button>
          </div>
        </div>
      </div>
    );
  }
}

// {<SendRequest
//     productId={this.props.match.params.id}
//     productImg={coverUrl}
//     productPrice={productPrice}
//   />}

const mapStateToProps = state => ({
  post: state.post
});

const connectToRedux = connect(mapStateToProps)(ViewPost);

export default connectToRedux;

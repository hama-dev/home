import React from "react";

import uuid from "uuid/v1";
import {
  StartUploadFile,
  StartSaveUploadedFileToDatabase,
  StartgetImageUrl
} from "../actions/post";
import { connect } from "react-redux";
import moment from "moment";
import Footer from "../components/Footer";

class AddItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      title: "",
      description: "",
      price: "",
      createdAt: "",
      createdBy: "",
      loading: false,
      ref: "",
      imagesUrl: [],
      childRef: [],
      loadingDb: false,
      error: "",
      submitBtn: false
    };
  }

  //* SetUp onChange Hanlder
  onChangleHandler = e => {
    if (e.target.name === "price") {
      if (e.target.value != 0 && e.target.value.match(/^\d{1,}(\.\d{0,2})?$/)) {
        this.setState({ [e.target.name]: e.target.value });
      }
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }

    // if we input file
    if (e.target.files) {
      this.setState({ image: null });
      //get the image
      const image = [...e.target.files];

      // update image on state
      this.setState({ image });
    }
  };

  //* SetUp onSubmit Handler
  onSubmitHandler = e => {
    e.preventDefault();
    this.setState({ submitBtn: true, error: "" });
    const { image } = this.state;
    //! = ref => images => id => id2

    const id = uuid();
    this.setState({ ref: id });
    // time of created
    const createdAt = moment().valueOf();
    const createdBy = this.props.authId;

    this.setState({ createdAt, createdBy });

    image.map(img => {
      const id2 = uuid();
      this.setState(prevState => {
        childRef: prevState.childRef.push(id2);
      });

      //try to Upload File to Storage
      this.props
        .StartUploadFile(id, id2, img)
        .then(() => {
          console.log("file Uploaded");
        })
        // if uploading file go wrong
        .catch(e => {
          this.setState({ submitBtn: false, error: e });
          console.log(e);
        });
    });
  };

  getImagesUrl = () => {
    this.setState({ loadingDb: true });

    this.state.childRef.forEach(url => {
      this.props.StartgetImageUrl(`images/${this.state.ref}`, url).then(url => {
        this.setState(prevState => {
          imagesUrl: prevState.imagesUrl.push(url);
        });
      });
    });

    this.saveToDb(this.state);
  };

  saveToDb = state => {
    this.state.imagesUrl.forEach((url, i) => {
      this.props
        .StartSaveUploadedFileToDatabase(
          url,
          this.state.ref,
          this.state.childRef[i],
          state
        )
        .then(() => {
          console.log("post saved");
          location.reload();
        })
        .catch(e => {
          this.setState({ error: e });
          console.log(e);
        });
    });
  };
  render() {
    return (
      <div>
        <form id="contact" onSubmit={this.onSubmitHandler}>
          <div id="progress-triangle"></div>
          <p> Upload Data </p>
          <input
            name="file"
            type="file"
            className="holder"
            onChange={this.onChangleHandler}
            multiple
            required
          />

          <input
            name="title"
            type="text"
            className="holder"
            placeholder="Title"
            value={this.state.title}
            onChange={this.onChangleHandler}
            multiple
            required
          />
          <input
            name="description"
            type="text"
            className="holder"
            placeholder="Description"
            value={this.state.description}
            onChange={this.onChangleHandler}
            multiple
            required
          />
          <input
            name="price"
            type="text"
            className="holder"
            placeholder="Price"
            value={this.state.price}
            onChange={this.onChangleHandler}
            multiple
            required
          />

          <button
            id="contact-submit"
            id="submit"
            type="submit"
            disabled={this.state.submitBtn}
          >
            Submit{" "}
          </button>
          <button
            id="submit"
            className="SendToDb"
            id="contact-submit"
            onClick={this.getImagesUrl}
          >
            (Press Double Click) Save To Database{" "}
          </button>
          {this.state.error && (
            <p className="add-item-error"> Succussfully Add To Storage </p>
          )}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  StartUploadFile: (uuid, uuid2, image) =>
    dispatch(StartUploadFile(uuid, uuid2, image)),
  StartgetImageUrl: (ref, childRef) =>
    dispatch(StartgetImageUrl(ref, childRef)),
  StartSaveUploadedFileToDatabase: (imageUrl, fileUuid, imageUuid, state) =>
    dispatch(
      StartSaveUploadedFileToDatabase(imageUrl, fileUuid, imageUuid, state)
    )
});

const mapStatetoProps = state => ({
  authId: state.auth.uid
});

const connectToRedux = connect(
  mapStatetoProps,
  mapDispatchToProps
)(AddItem);
export default connectToRedux;

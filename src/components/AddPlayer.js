import React from "react";
import { connect } from "react-redux";
import {
  StartUploadPlayer,
  StartgetImageUrl,
  StartSaveToDatabase
} from "../actions/player";
import uuid from "uuid";

class AddPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      imageId: "",
      name: "",
      location: "",
      nickName: "",
      fb: "",
      PlayerId: "",
      insta: "",
      error: "",
      submitBtn: false
    };
  }

  startUploadPlayer = e => {
    e.preventDefault();

    this.setState({ submitBtn: true, error: "" });

    const PlayerId = uuid();
    let imageId = uuid();
    this.setState({ PlayerId, imageId });
    const image = this.state.image;
    this.props
      .StartUploadPlayer(PlayerId, image, imageId)
      .then(() => {
        this.setState({ submitBtn: true });
        console.log("start upload file ");
      })
      .catch(e => {
        this.setState({ submitBtn: false, error: e });
        console.log("e", e);
      });
  };

  StartSaveToDB = e => {
    e.preventDefault();
    this.props
      .StartgetImageUrl(`player/${this.state.PlayerId}`, this.state.imageId)
      .then(Imageurl => {
        this.props.StartSaveToDatabase(
          this.state.PlayerId,
          this.state.name,
          this.state.nickName,
          this.state.location,
          this.state.fb,
          this.state.insta,
          Imageurl
        );
      })
      .then(async () => {
        await location.reload();
      })
      .catch(e => {
        this.setState({ error: e });
        console.log(e);
      })
      .catch(e => {
        this.setState({ error: e });
        console.log("get image url error", e);
      });
  };

  onChnageImageHandler = e => {
    if (e.target.files) {
      this.setState({ image: null });
      //get the image
      const image = e.target.files[0];

      // update image on state
      this.setState({ image });
    }
  };

  onChangleHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <form id="contact">
          <div id="progress-triangle">
            <input
              type="file"
              name="file"
              required
              onChange={this.onChnageImageHandler}
            />

            <input
              name="name"
              type="text"
              placeholder="Name"
              value={this.state.name}
              onChange={this.onChangleHandler}
              multiple
              required
            />

            <input
              type="text"
              name="location"
              value={this.state.location}
              onChange={this.onChangleHandler}
              required
              placeholder="Location"
            />

            <input
              type="text"
              name="nickName"
              value={this.state.nickName}
              onChange={this.onChangleHandler}
              required
              placeholder="NickName"
            />

            <input
              type="text"
              name="fb"
              value={this.state.fb}
              onChange={this.onChangleHandler}
              required
              placeholder="Fb"
            />

            <input
              type="text"
              name="insta"
              value={this.state.insta}
              onChange={this.onChangleHandler}
              required
              placeholder="Insta"
            />
            <button
              id="contact-submit"
              id="submit"
              className="add-player-saveToStorage"
              onClick={this.startUploadPlayer}
              disabled={this.state.submitBtn}
            >
              Upload Player
            </button>
          </div>
        </form>
        <button
          id="contact-submit"
          id="submit"
          className="SendToDb"
          onClick={this.StartSaveToDB}
        >
          Save To DB
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  StartUploadPlayer: (playerId, image, imageId) =>
    dispatch(StartUploadPlayer(playerId, image, imageId)),
  StartgetImageUrl: (ref, childRef) =>
    dispatch(StartgetImageUrl(ref, childRef)),
  StartSaveToDatabase: (
    playerId,
    name,
    nickName,
    location,
    fb,
    inst,
    Imageurl
  ) =>
    dispatch(
      StartSaveToDatabase(
        playerId,
        name,
        nickName,
        location,
        fb,
        inst,
        Imageurl
      )
    )
});

const connectToRedux = connect(
  undefined,
  mapDispatchToProps
)(AddPlayer);

export default connectToRedux;

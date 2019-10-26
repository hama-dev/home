import React, { useState, useEffect } from "react";
import { StartDeletePlayer } from "../actions/player";
import { connect } from "react-redux";

class PlayerGroup extends React.Component {
  state = {
    playerId: this.props.player[0][1],
    imageUrl: this.props.player[1][1],
    fb: this.props.player[2][1],
    insta: this.props.player[3][1],
    location: this.props.player[4][1],
    name: this.props.player[5][1],
    nickName: this.props.player[6][1]
  };

  onClickDeletePlayerHandler = async () => {
   await this.props
      .StartDeletePlayer(this.state.playerId)
      .then(() => {
        location.reload();
      })
      .catch(e => {
        console.log(e);
      });
  };
  render() {
    const { imageUrl, insta, fb, name, nickName } = this.state;
    return (
      <div>
        <div className="PlayerGroup-card col span-1-of-4">
          <div className="PlayerGroup-form">
            <div className="Player-group-img">
              <img className="playerGroup-img" src={imageUrl}></img>
            </div>
            <div className="player-group-title">
              <p className="playerGroup-name">{name}</p>
              <p className="playerGroup-nickname">{nickName}</p>

              <ul className="player-group-ul">
                <li className="player-group-insta-li">
                  {insta && (
                    <a href={`${fb}`}>
                      {" "}
                      <img
                        src="https://www.balchspringslibrary.org/instagram.png/@@images/image.png"
                        className="playerGroup-insta"
                      />
                    </a>
                  )}
                </li>
                <li className="player-group-fb-li">
                  {fb && (
                    <a href={`${insta}`}>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                        className="playerGroup-fb"
                      />
                    </a>
                  )}
                </li>
              </ul>
              {this.props.isAdmin && (
                <button onClick={this.onClickDeletePlayerHandler}>
                  {" "}
                  Delete{" "}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  StartDeletePlayer: playerId => dispatch(StartDeletePlayer(playerId))
});
const mapStatetoProps = state => ({
  isAdmin: state.auth.adminProperty
});

const connectToRedux = connect(
  mapStatetoProps,
  mapDispatchToProps
)(PlayerGroup);
export default connectToRedux;

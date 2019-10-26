import React from "react";
import PlayerGroup from "./playergroup";
import { connect } from "react-redux";

class PlayerForm extends React.Component {
  state = {
    players: []
  };

  UNSAFE_componentWillMount = () => {
    this.setState({ players: [...this.props.player] });
  };

  render() {
    const { players } = this.state;
    return (
      <div>
      <div>
        {players && (
          <div>
            {players.map((player, i) => (
              <PlayerGroup player={Object.entries(player)} key={i} />
            ))}
          </div>
        )}
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  player: state.player
});
const connectToRedux = connect(mapStateToProps)(PlayerForm);

export default connectToRedux;

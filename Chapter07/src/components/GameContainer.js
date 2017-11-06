import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TouchableOpacity, Image, StyleSheet } from "react-native";

import * as Actions from "../actions";
import { W, H } from "../constants";
import Parrot from "./Parrot";
import Ground from "./Ground";
import RockUp from "./RockUp";
import RockDown from "./RockDown";
import Score from "./Score";
import Start from "./Start";
import StartAgain from "./StartAgain";
import GameOver from "./GameOver";

class Game extends Component {
  constructor() {
    super();
    this.animationFrameId = null;
    this.time = new Date();
  }

  nextFrame() {
    if (this.props.gameOver) return;
    var elapsedTime = new Date() - this.time;
    this.time = new Date();
    this.props.tick(elapsedTime);
    this.animationFrameId = requestAnimationFrame(this.nextFrame.bind(this));
  }

  start() {
    cancelAnimationFrame(this.animationFrameId);
    this.props.start();
    this.props.bounce();
    this.time = new Date();
    this.setState({ gameOver: false });
    this.animationFrameId = requestAnimationFrame(this.nextFrame.bind(this));
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.gameOver) {
      this.setState({ gameOver: true });
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextState.gameOver;
  }

  render() {
    const {
      rockUp,
      rockDown,
      ground,
      ground2,
      parrot,
      isStarted,
      gameOver,
      bounce,
      score
    } = this.props;

    return (
      <TouchableOpacity
        onPress={
          !isStarted || gameOver ? this.start.bind(this) : bounce.bind(this)
        }
        style={styles.screen}
        activeOpacity={1}
      >
        <Image
          source={require("../../images/bg.png")}
          style={[styles.screen, styles.image]}
        />
        <RockUp
          x={rockUp.position.x * W}
          y={rockUp.position.y}
          height={rockUp.size.height}
          width={rockUp.size.width}
        />
        <Ground
          x={ground.position.x * W}
          y={ground.position.y}
          height={ground.size.height}
          width={ground.size.width}
        />
        <Ground
          x={ground2.position.x * W}
          y={ground2.position.y}
          height={ground2.size.height}
          width={ground2.size.width}
        />
        <RockDown
          x={rockDown.position.x * W}
          y={rockDown.position.y * H}
          height={rockDown.size.height}
          width={rockDown.size.width}
        />
        <Parrot
          x={parrot.position.x * W}
          y={parrot.position.y * H}
          height={parrot.size.height}
          width={parrot.size.width}
        />
        <Score score={score} />
        {!isStarted && <Start />}
        {gameOver && <GameOver />}
        {gameOver && isStarted && <StartAgain />}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignSelf: "stretch",
    width: null
  },
  image: {
    resizeMode: "cover"
  }
});

function mapStateToProps(state) {
  const sprites = state.gameReducer.sprites;
  return {
    parrot: sprites[0],
    rockUp: sprites[1],
    rockDown: sprites[2],
    gap: sprites[3],
    ground: sprites[4],
    ground2: sprites[5],
    score: state.gameReducer.score,
    gameOver: state.gameReducer.gameOver,
    isStarted: state.gameReducer.isStarted
  };
}
function mapStateActionsToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapStateActionsToProps)(Game);

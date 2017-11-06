import React, { Component } from "react";
import { Image } from "react-native";

import { W, H } from "../constants";

export default class GameOver extends Component {
  render() {
    return (
      <Image
        style={{
          position: "absolute",
          left: 15 * W,
          top: 30 * H
        }}
        resizeMode="stretch"
        source={require("../../images/game-over.png")}
      />
    );
  }
}

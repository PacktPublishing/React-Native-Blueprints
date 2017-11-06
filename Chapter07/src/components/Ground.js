import React, { Component } from "react";
import { Image } from "react-native";

import { W, H } from "../constants";

export default class Ground extends Component {
  render() {
    return (
      <Image
        resizeMode="stretch"
        source={require("../../images/ground.png")}
        style={{
          position: "absolute",
          left: this.props.x,
          top: this.props.y * H,
          width: this.props.width * W,
          height: this.props.height * H
        }}
      />
    );
  }
}

import React from "react";
import { Image } from "react-native";
import { W, H } from "../constants";

export default class Parrot extends React.Component {
  constructor() {
    super();
    this.state = { wings: "down" };
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.y < nextProps.y) {
      this.setState({ wings: "up" });
    } else if (this.props.y > nextProps.y) {
      this.setState({ wings: "down" });
    }
  }

  render() {
    let parrotImage;
    if (this.state.wings === "up") {
      parrotImage = require("../../images/parrot1.png");
    } else {
      parrotImage = require("../../images/parrot2.png");
    } 
    return (
      <Image
        source={parrotImage}
        style={{
          position: "absolute",
          resizeMode: "contain",
          left: this.props.x,
          top: this.props.y,
          width: 12 * W,
          height: 12 * W
        }}
      />
    );
  }
}

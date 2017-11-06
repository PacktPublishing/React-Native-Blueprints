import React, { Component } from "react";
import { View, Image } from "react-native";

import { W, H } from "../constants";

export default class Score extends Component {
  getSource(num) {
    switch (num) {
      case "0":
        return require("../../images/0.png");
      case "1":
        return require("../../images/1.png");
      case "2":
        return require("../../images/2.png");
      case "3":
        return require("../../images/3.png");
      case "4":
        return require("../../images/4.png");
      case "5":
        return require("../../images/5.png");
      case "6":
        return require("../../images/6.png");
      case "7":
        return require("../../images/7.png");
      case "8":
        return require("../../images/8.png");
      case "9":
        return require("../../images/9.png");
      default:
        return require("../../images/0.png");
    }
  }

  render() {
    var scoreString = this.props.score.toString();
    var scoreArray = [];
    for (var index = 0; index < scoreString.length; index++) {
      scoreArray.push(scoreString[index]);
    }

    return (
      <View
        style={{
          position: "absolute",
          left: 47 * W,
          top: 10 * H,
          flexDirection: "row"
        }}
      >
        {scoreArray.map(
          function(item, i) {
            return (
              <Image
                style={{ width: 10 * W }}
                key={i}
                resizeMode="contain"
                source={this.getSource(item)}
              />
            );
          }.bind(this)
        )}
      </View>
    );
  }
}

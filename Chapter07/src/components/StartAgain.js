import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

import { W, H } from "../constants";

export default class StartAgain extends Component {
  render() {
    return (
      <Image
        style={{ position: "absolute", left: 35 * W, top: 40 * H }}
        resizeMode="contain"
        source={require("../../images/reset.png")}
      />
    );
  }
}

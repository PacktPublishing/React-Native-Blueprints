import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

import { W, H } from "../constants";

export default class Start extends Component {
  render() {
    return (
      <View style={{ position: "absolute", left: 20 * W, top: 3 * H }}>
        <Image
          resizeMode="contain"
          source={require("../../images/logo.png")}
          style={{ width: 60 * W }}
        />
        <Image
          resizeMode="contain"
          style={{ marginTop: 15, width: 60 * W }}
          source={require("../../images/tap.png")}
        />
      </View>
    );
  }
}

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  NativeModules,
  Animated,
  Easing,
  StatusBar,
  Text
} from 'react-native';
import Tuner from './src/components/Tuner';
import Strings from './src/components/Strings';
import { getClosestString, colors } from './src/utils/';

var FrequencyDetector = NativeModules.FrequencyDetector;

export default class guitarTuner extends Component {
  state = {
    delta: null,
    activeString: null
  }

  componentWillMount() {
    FrequencyDetector.initialise();
    setInterval(() => {
      FrequencyDetector.getFrequency((res, freq) => {
        let stringData = getClosestString(parseInt(freq));
        if(!stringData) {
          this.setState({
            delta: null,
            activeString: null
          });
        } else {
          this.setState({
            delta: stringData.delta,
            activeString: stringData.number
          });
        }
      });
    }, 500);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <Tuner delta={this.state.delta} />
        <Strings activeString={this.state.activeString}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1
  }
});

AppRegistry.registerComponent('guitarTuner', () => guitarTuner);

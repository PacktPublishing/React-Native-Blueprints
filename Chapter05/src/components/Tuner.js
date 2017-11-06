import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Animated,
  Easing,
  Dimensions
} from 'react-native';

var {height, width} = Dimensions.get('window');

export default class Tuner extends Component {
  state = {
    xIndicator:  new Animated.Value(width/2)
  }

  static propTypes = {
    delta: React.PropTypes.number
  }

  componentWillReceiveProps(newProps) {
    if(this.props.delta !== newProps.delta) {
      Animated.timing(
        this.state.xIndicator,
        {
          toValue: (width/2) + (newProps.delta*width/2)/100,
          duration: 500,
          easing: Easing.elastic(2)
        }
      ).start();
    }
  }

  render() {
    let { xIndicator } = this.state;

    return (
      <View style={styles.tunerContainer}>
        <Image source={require('../../img/tuner.jpg')} style={styles.tuner}/>
        <Animated.Image source={require('../../img/indicator.jpg')} style={[styles.indicator, {left: xIndicator}]}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tunerContainer: {
    flex: 1,
    backgroundColor: '#1f2025',
    marginTop: height * 0.05
  },
  tuner: {
    width,
    resizeMode: 'contain'
  },
  indicator: {
    position: 'absolute',
    top: 10
  }
});

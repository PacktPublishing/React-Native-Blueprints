import React from 'react';
import { View, Image, Dimensions, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';

const {height, width} = Dimensions.get('window');

export default class ClassSelection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      classButtonPosition: new Animated.Value(15+width*0.1)
    }
  }

  _onClassChange(className) {
    if(className === 'superior') {
      Animated.timing(
        this.state.classButtonPosition,
        {
          toValue: width*0.77,
          duration: 500,
        }                              
      ).start();
    }

    if(className === 'special') {
      Animated.timing(
        this.state.classButtonPosition,
        {
          toValue: width*0.5-20,
          duration: 500,
        }                              
      ).start();
    }

    if(className === 'economy') {
      Animated.timing(
        this.state.classButtonPosition,
        {
          toValue: 15+width*0.1,
          duration: 500,
        }                              
      ).start();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.classBar} source={require('../../img/classBar.png')}/>
        <Animated.View style={[ styles.classButton, {left: this.state.classButtonPosition} ]}>
          <Image style={styles.classButtonImage}  source={require('../../img/class.png')}/>
        </Animated.View>
        <TouchableOpacity 
          style={[styles.classButtonContainer, {width: width/3 - 10, left: width*0.11}]}
          onPress={this._onClassChange.bind(this, 'economy')} 
        >
          <Text style={styles.classLabel}>economy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.classButtonContainer, {width: width/3, left: width/3}]}
          onPress={this._onClassChange.bind(this, 'special')}
        >
          <Text style={[styles.classLabel, {textAlign: 'center'}]}>Special</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.classButtonContainer, {width: width/3, right: width*0.11}]}
          onPress={this._onClassChange.bind(this, 'superior')}
        >
          <Text style={[styles.classLabel, {textAlign: 'right'}]}>Superior</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
     height: 80,
     backgroundColor: 'white',
     position: 'absolute',
     bottom: 0,
     left: 0,
     right: 0,
     paddingBottom: 10
  },
  classBar: {
    width: width*0.7,
    left: width*0.15,
    resizeMode: 'contain',
    height: 30,
    top: 35
  },
  classButton: {
    top: 30,
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    position: 'absolute',
    backgroundColor: 'white',
    height: 40,
    width: 40
  },
  classButtonImage: {
    alignSelf:'center',
    resizeMode: 'contain',
    width: 30
  },
  classButtonContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    height: 70,
    top: 10
  },
  classLabel: {
    fontFamily: 'Blair ITC',
    paddingTop: 5,
    fontSize: 12
  }
});
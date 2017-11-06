import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';

import { colors } from '../utils/';

const stringNotes = ['E','A','D','G','B','E'];

export default class Strings extends Component {
  static propTypes = {
    activeString: React.PropTypes.number
  }

  render() {
    return (
      <View style={styles.stringsContainer}>
        {
          stringNotes.map((note, i) => {
            return (
              <View key={i} style={styles.stringContainer}>
                <Image source={require('../../img/string.jpg')} style={styles.string}/>
                <View style={[styles.noteContainer, {borderColor: (this.props.activeString === (i+1)) ? '#3bd78b' : '#f3c556'}]}>
                  <Text style={styles.note}>
                    {note}
                  </Text>
                </View>
              </View>
            )
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stringsContainer: {
    borderTopColor: colors.green,
    borderTopWidth: 5,
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  stringContainer: {
    alignItems: 'center'
  },
  note: {
    color: 'white',
    fontSize: 19,
    textAlign: 'center'
  },
  noteContainer: {
    top: 50,
    height: 50,
    width: 50,
    position: 'absolute',
    padding: 10,
    borderColor: colors.yellow,
    borderWidth: 3,
    borderRadius: 25,
    backgroundColor: colors.black
  }
});

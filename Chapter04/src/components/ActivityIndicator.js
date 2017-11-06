import React from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';

export default class CustomActivityIndicator extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={{marginRight: 10}}/>
        <Text>{this.props.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0'
  }
});
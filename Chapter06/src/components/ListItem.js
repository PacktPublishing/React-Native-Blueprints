import React, { PropTypes } from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const ListItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{height: 60, borderColor: '#ccc', borderBottomWidth: 1, marginLeft: 10, flexDirection: 'row'}}>
        <View style={{padding: 15, paddingTop: 10}}>
          <Image source={{uri: props.image}} style={{width: 40, height: 40, borderRadius: 20, resizeMode: 'cover'}}/>
        </View>
        <View style={{padding: 15, paddingTop: 20}}>
          <Text style={{fontSize: 15}}>{ props.text }</Text>
        </View>
        <Icon name="angle-right" size={20} color="#aaa" style={{position: 'absolute', right: 20, top: 20}}/>
      </View>
    </TouchableOpacity>
  )
}

export default ListItem

import React, { PropTypes } from 'react'
import { View, Image, Button, Text } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import Icon from 'react-native-vector-icons/FontAwesome'

import notifications from '../notifications'

@inject('users') @observer
class Profile extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="user" size={30} color={tintColor}/>
    ),
  };

  imgPlaceholder = 'https://cdn.pixabay.com/photo/2017/03/21/02/00/user-2160923_960_720.png'

  onPressLogout() {
    this.props.users.logout();
  }

  render () {
    return (
        <View style={{ padding: 20 }}>
          {
              this.props.users.name &&
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={{uri: this.props.users.avatar || this.imgPlaceholder}}
                  style={{width: 100, height: 100, borderRadius: 50, margin: 20, resizeMode: 'cover'}}
                />
                <Text style={{fontSize: 25}}>{this.props.users.name}</Text>
              </View>
          }
          <Button
            onPress={this.onPressLogout.bind(this)}
            title="Logout"
          />
        </View>
    )
  }
}

export default Profile;

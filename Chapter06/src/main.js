import React from 'react'
import { DrawerNavigator,TabNavigator } from 'react-navigation'
import { Platform, View } from 'react-native'
import { observer, inject } from 'mobx-react/native'

import Login from './screens/Login'
import Chats from './screens/Chats'
import Profile from './screens/Profile'
import Search from './screens/Search'
import { users, chats } from './stores'

let Navigator;
if(Platform.OS === 'ios'){
  Navigator = TabNavigator({
    Chats: { screen: Chats },
    Search: { screen: Search },
    Profile: { screen: Profile }
  }, {
    tabBarOptions: {
      inactiveTintColor: '#aaa',
      activeTintColor: '#000',
      showLabel: true
    }
  });
} else {
  Navigator = DrawerNavigator({
    Chats: { screen: Chats },
    Search: { screen: Search },
    Profile: { screen: Profile }
  });
}

@inject('users') @observer
export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    if(this.props.users.isLoggedIn){
      return <Navigator/>
    } else {
      return <Login/>
    }
  }
}

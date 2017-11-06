import React, { PropTypes } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import { observer, inject } from 'mobx-react/native'
import { StackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import notifications from '../notifications'

import ListItem from '../components/ListItem'
import Chat from './Chat'

@inject('chats') @observer
class ChatList extends React.Component {
  imgPlaceholder = 'https://cdn.pixabay.com/photo/2017/03/21/02/00/user-2160923_960_720.png'

  componentWillMount() {
    notifications.onNotification((notif)=>{
      this.props.navigation.goBack();
      this.props.navigation.navigate('Chat', {
        id: notif.chatId,
        name: notif.name || '',
        image: notif.image || this.imgPlaceholder
      })
    });
  }

  render () {
    return (
      <View>
        {
          this.props.chats.list &&
          <FlatList
            data={this.props.chats.list.toJS()}
            keyExtractor={(item, index) => item.id}
            renderItem={({item}) => {
              return (
                <ListItem
                  text={item.name}
                  image={item.image || this.imgPlaceholder}
                  onPress={() => this.props.navigation.navigate('Chat', {
                    id: item.id,
                    name: item.name,
                    image: item.image || this.imgPlaceholder,
                    contactId: item.contactId
                  })}
                />
              )
            }}
          />
        }
        {
          this.props.chats.downloadingChats &&
          <ActivityIndicator style={{marginTop: 20}}/>
        }
      </View>
    )
  }
}

const Navigator = StackNavigator({
  Chats: {
    screen: ChatList,
    navigationOptions: ({navigation}) => ({
      title: 'Chats',
    }),
  },
  Chat: {
    screen: Chat
  }
});

export default class Chats extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Chats',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="comment-o" size={30} color={tintColor}/>
    )
  };

  render() {
      return <Navigator />
  }
}

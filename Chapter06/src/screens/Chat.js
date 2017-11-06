import React, { PropTypes } from 'react'
import { View, Image, ActivityIndicator } from 'react-native';
import { observer, inject } from 'mobx-react/native'
import { GiftedChat } from 'react-native-gifted-chat'

@inject('chats', 'users') @observer
class Chat extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.name,
    headerRight: <Image source={{uri: navigation.state.params.image}} style={{
      width: 30,
      height: 30,
      borderRadius: 15,
      marginRight: 10,
      resizeMode: 'cover'
    }}/>
  })

  onSend(messages) {
    this.props.chats.addMessages(this.chatId, this.contactId, messages)
  }

  componentWillMount() {
    this.contactId = this.props.navigation.state.params.contactId;
    this.chatId = this.props.navigation.state.params.id;
    this.props.chats.selectChat(this.chatId);
  }

  render () {
    var messages = this.props.chats.selectedChatMessages;
    if(this.props.chats.downloadingChat) {
      return <View><ActivityIndicator style={{marginTop: 20}}/></View>
    }

    return (
      <GiftedChat
        onSend={(messages) => this.onSend(messages)}
        messages={messages ? messages.toJS().reverse() : []}
        user={{
          _id: this.props.users.id,
          name: this.props.users.name,
          avatar: this.props.users.avatar
        }}
      />
    )
  }
}

export default Chat;

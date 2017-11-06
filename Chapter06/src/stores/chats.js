import { observable, computed, map, toJS, action } from 'mobx';
import { AsyncStorage } from 'react-native'

import { firebaseApp } from '../firebase'
import notifications from '../notifications'

class Chats {
  @observable list;
  @observable selectedChatMessages;
  @observable downloadingChats = false;
  @observable downloadingChat = false;

  @action addMessages = function(chatId, contactId, messages) {
    if(!messages || messages.length < 1) return;

    messages.forEach((message) => {
      let formattedMessage = {
        _id: message._id,
        user: {
          _id: message.user._id,
        }
      };
      if(message.text) formattedMessage.text = message.text;
      if(message.createdAt) formattedMessage.createdAt = message.createdAt/1;
      if(message.user.name) formattedMessage.user.name = message.user.name;
      if(message.user.avatar) formattedMessage.user.avatar = message.user.avatar;
      if(message.image) formattedMessage.image = message.image;

      //add the message to the chat
      firebaseApp.database().ref('/messages/' + chatId).push().set(formattedMessage);

      //notify person on the chat room
      firebaseApp.database().ref('/users/' + contactId).once('value').then(function(snapshot) {
        var notificationsToken = snapshot.val().notificationsToken;
        notifications.sendNotification(notificationsToken, {
          sender: message.user.name,
          text: message.text,
          image: message.user.image,
          chatId
        });
      });
    });

  }

  @action selectChat = function(id) {
    this.downloadingChat = true;
    if(this.chatBind && typeof this.chatBind.off === 'function') this.chatBind.off();
    this.chatBind = firebaseApp.database().ref('/messages/' + id).on('value', (snapshot) => {
      this.selectedChatMessages = [];
      this.downloadingChat = false;
      const messagesObj = snapshot.val();
      for(var id in messagesObj) {
        this.selectedChatMessages.push({
          _id: id,
          text: messagesObj[id].text,
          createdAt: messagesObj[id].createdAt,
          user: {
            _id: messagesObj[id].user._id,
            name: messagesObj[id].user.name,
            avatar: messagesObj[id].user.avatar
          },
          image: messagesObj[id].image
        });
      }
		});
  }

  @action add(user1, user2) {
    return new Promise(function(resolve, reject) {
      firebaseApp.database().ref('/chats/' + user1.id + '/' + user1.id + user2.id).set({
				name: user2.name,
        image: user2.avatar,
        contactId: user2.id
			}).then(() => {
        firebaseApp.database().ref('/chats/' + user2.id + '/' + user1.id + user2.id).set({
  				name: user1.name,
          image: user1.avatar,
          contactId: user1.id
  			}).then(() => {
          resolve();
        })
      })
    });
  }

	bindToFirebase(userId) {
    this.downloadingChats = true;
		return firebaseApp.database().ref('/chats/' + userId).on('value', (snapshot) => {
      this.downloadingChats = false;
			const chatsObj = snapshot.val();
      this.list = [];
      for(var id in chatsObj) {
        this.list.push({
          id,
          name: chatsObj[id].name,
          image: chatsObj[id].image,
          contactId: chatsObj[id].contactId
        });
      }
		});
	}
}


const chats = new Chats()
export default chats;

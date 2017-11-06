import React from 'react'
import { AppRegistry } from 'react-native';
import App from './src/main';

import { Provider } from 'mobx-react/native';
import { chats, users } from './src/stores';

class MessagingApp extends React.Component {
  render() {
    return (
      <Provider users={users} chats={chats}>
        <App/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('messagingApp', () => MessagingApp);

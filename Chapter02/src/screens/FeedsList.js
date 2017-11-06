import React from 'react';
import { Container, Content, List, ListItem, Text, Icon, Button } from 'native-base';
import { observer } from 'mobx-react/native';
import { selectFeed, removeFeed } from '../actions';

@observer
export default class FeedsList extends React.Component {
  static navigationOptions = (props) => ({
    title: 'My Feeds',
    headerRight: <Button 
      transparent
      onPress={ () => props.navigation.navigate('AddFeed') }>
        <Icon name='add'/>
      </Button>
  })

  _handleFeedPress(feed) {
    selectFeed(feed);
    this.props.navigation.navigate('FeedDetail', { feedUrl: feed.url });
  }

  render() {
    const { feeds } = this.props.screenProps.store;
    return (
      <Container>
          <Content>
              <List>
                  {
                    feeds && feeds.map((f, i) => {
                      return (
                        <ListItem key={i} onPress={this._handleFeedPress.bind(this, f)}>
                          <Text>{f.title}</Text>
                        </ListItem>
                      );
                    })
                  }
              </List>
          </Content>
      </Container>
    )
  }
}
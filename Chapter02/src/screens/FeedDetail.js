import React from 'react';
import { Container, Content, List, ListItem, Text, Button, Icon, Spinner } from 'native-base';
import { observer } from 'mobx-react/native';
import { selectEntry, fetchFeed , removeFeed } from '../actions';
import { ActivityIndicator } from 'react-native';

@observer
export default class FeedDetail extends React.Component {
  static navigationOptions = (props) => ({
    title: props.screenProps.store.selectedFeed.title,
    headerRight: <Button 
      transparent
      onPress={()=> {
          removeFeed(props.navigation.state.params.feedUrl);
          props.navigation.goBack();
        }
      }><Icon name='trash'/></Button>
  });

  constructor (props) {
    super(props);
    this.state = {
      loading: false,
      entry: null
    }
  }

  componentWillMount() {
    this.setState({ loading: true });
    fetchFeed(this.props.screenProps.store.selectedFeed.url)
      .then((feed) => {
        this.setState({ loading: false });
        this.setState({ entry: feed.entry});
      });
  }

  _handleEntryPress(entry){
    selectEntry(entry);
    this.props.navigation.navigate('EntryDetail');
  }

  render() {
    const { entry } = this.state;

    return (
      <Container>
          <Content>
              { this.state.loading && <ActivityIndicator style={{margin: 20}}/> }
              <List>
                  {
                    entry && entry.map((e, i) => {
                      return (
                        <ListItem key={i} onPress={this._handleEntryPress.bind(this, e)}>
                          <Text>{e.title}</Text>
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
import React from 'react';
import { Container, Content, Form, Item, Input, Button, Text } from 'native-base';
import { addFeed, fetchFeed } from '../actions'
import { Alert, ActivityIndicator } from 'react-native';

export default class AddFeed extends React.Component {
  static navigationOptions = {
    title: 'Add feed'
  }

  constructor(props) {
    super(props);
    this.state = {
      url: '',
      loading: false
    };
  }

  _handleAddPress() {
    if(this.state.url.length > 0) {
      this.setState({ loading: true });
      fetchFeed(this.state.url)
        .then((feed)=>{
          addFeed(this.state.url, feed);
          this.setState({ loading: false });
          this.props.navigation.goBack();
        })
        .catch(()=>{
          Alert.alert('Coundn\'t find any rss feed on that url');
          this.setState({ loading: false });
        });
    }
  }

  render() {
    return (
      <Container style={{padding: 10}}>
          <Content>
              <Form>
                  <Item>
                      <Input 
                        autoCapitalize='none'
                        autoCorrect={false} 
                        placeholder="feed's url" 
                        onChangeText={(url) => this.setState({url})} />
                  </Item>
                  <Button block style={{marginTop: 20}} onPress={this._handleAddPress.bind(this)}>
                      { this.state.loading && <ActivityIndicator color='white'  style={{margin: 10}}/>}
                      <Text>Add</Text>
                  </Button>
              </Form>
          </Content>
      </Container>
    )
  }
}
import React, { PropTypes } from 'react'
import {
  TextInput,
  Button,
  Text,
  View,
  Image,
  ActivityIndicator
} from 'react-native';

class LoginForm extends React.Component {
  state= {
    loginEmail: '',
    loginPassword: ''
  }

  onPressLogin() {
    this.props.onPress(this.state.loginEmail, this.state.loginPassword);
  }

  render() {
    return (
        <View style={{backgroundColor: 'white', padding: 15, borderRadius: 10}}>
          {
            this.props.loggingError &&
            <View style={{backgroundColor: '#fcc', borderRadius: 5, alignItems: 'center', marginBottom: 10}}>
              <Text>{this.props.loggingError}</Text>
            </View>
          }
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='email-address'
            returnKeyType='next'
            style={{height: 40}}
            onChangeText={(loginEmail) => this.setState({loginEmail})}
            value={this.state.loginEmail}
            placeholder='email'
            onSubmitEditing={(event) => {
              this.refs.loginPassword.focus();
            }}
          />
          <TextInput
            ref='loginPassword'
            style={{height: 40}}
            onChangeText={(loginPassword) => this.setState({loginPassword})}
            value={this.state.loginPassword}
            secureTextEntry={true}
            placeholder='password'
          />
          {
            this.props.busy ?
            <ActivityIndicator/>
            :
            <Button
              onPress={this.onPressLogin.bind(this)}
              title='Login'
            />
          }
        </View>
      )
  }
}

export default LoginForm;

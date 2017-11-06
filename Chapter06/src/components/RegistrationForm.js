import React, { PropTypes } from 'react'
import {
  ScrollView,
  TextInput,
  Button,
  Text,
  View,
  Image,
  ActivityIndicator
} from 'react-native';

class RegisterForm extends React.Component {
  state= {
    registerEmail: '',
    registerPassword: '',
    registerName: ''
  }

  onPressRegister() {
    this.props.onPress(this.state.registerEmail, this.state.registerPassword, this.state.registerName);
  }

  render() {
    return (
      <View style={{backgroundColor: 'white', padding: 15, borderRadius: 10}}>
        {
          this.props.registeringError &&
          <View style={{backgroundColor: '#fcc', borderRadius: 5, alignItems: 'center', marginBottom: 10}}>
            <Text>{this.props.registeringError}</Text>
          </View>
        }
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          keyboardType='email-address'
          returnKeyType='next'
          style={{height: 40}}
          onChangeText={(registerEmail) => this.setState({registerEmail})}
          value={this.state.registerEmail}
          placeholder='email'
          onSubmitEditing={(event) => {
            this.refs.registerName.focus();
          }}
        />
        <TextInput
          ref='registerName'
          style={{height: 40}}
          onChangeText={(registerName) => this.setState({registerName})}
          returnKeyType='next'
          value={this.state.registerName}
          placeholder='name'
          onSubmitEditing={(event) => {
            this.refs.registerPassword.focus();
          }}
        />
        <TextInput
          ref='registerPassword'
          style={{height: 40}}
          onChangeText={(registerPassword) => this.setState({registerPassword})}
          value={this.state.registerPassword}
          secureTextEntry={true}
          placeholder='password'
        />
        {
          this.props.busy ?
          <ActivityIndicator/>
          :
          <Button
            onPress={this.onPressRegister.bind(this)}
            title='Register'
          />
        }
      </View>
    )
  }
}

export default RegisterForm;

import React from 'react';
import { View, Button as LinkButton } from 'react-native';
import { Form, Item, Input, Content, Button, Text, Spinner } from 'native-base';
import PropTypes from 'prop-types';

class Login extends React.Component {
  state = { email: null, password: null };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Content>
          <Form>
            <Item>
              <Input
                placeholder="e-mail"
                keyboardType={'email-address'}
                autoCapitalize={'none'}
                onChangeText={email => this.setState({ email })}
              />
            </Item>
            <Item last>
              <Input
                placeholder="password"
                secureTextEntry
                onChangeText={password => this.setState({ password })}
              />
            </Item>
            <Button
              block
              disabled={this.props.loading}
              style={{ margin: 20 }}
              onPress={() =>
                this.props.login({
                  email: this.state.email,
                  password: this.state.password,
                })}
            >
              <Text>Login</Text>
            </Button>
          </Form>

          <LinkButton
            title={'or Register'}
            onPress={() => this.props.changeToRegister()}
          />
          {this.props.loading && <Spinner />}
        </Content>
        {this.props.error && (
          <Text
            style={{
              alignSelf: 'center',
              color: 'red',
              position: 'absolute',
              bottom: 10,
            }}
          >
            {this.props.error}
          </Text>
        )}
      </View>
    );
  }
}

Login.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  login: PropTypes.func.isRequired,
  changeToRegister: PropTypes.func.isRequired,
};

export default Login;

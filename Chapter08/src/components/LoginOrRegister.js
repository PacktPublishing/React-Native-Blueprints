import React from 'react';
import { View } from 'react-native';

import PropTypes from 'prop-types';

import Login from './Login';
import Register from './Register';

export default class LoginOrRegister extends React.Component {
  state = {
    display: 'login',
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignSelf: 'stretch',
        }}
      >
        {this.state.display === 'login' && (
          <Login
            login={this.props.login}
            changeToRegister={() => this.setState({ display: 'register' })}
            loading={this.props.loading}
            error={this.props.error}
          />
        )}
        {this.state.display === 'register' && (
          <Register
            register={this.props.register}
            changeToLogin={() => this.setState({ display: 'login' })}
            loading={this.props.loading}
            error={this.props.error}
          />
        )}
      </View>
    );
  }
}

LoginOrRegister.propTypes = {
  error: PropTypes.string,
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

import React from 'react';
import { View, Button as LinkButton } from 'react-native';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Icon,
  Header,
  Title,
  Label,
  Input,
  Item,
  Form,
  Content,
} from 'native-base';

import * as UserActions from '../reducers/user';
import LoginOrRegister from '../components/LoginOrRegister';

class MyProfile extends React.Component {
  static navigationOptions = {
    drawerLabel: 'My Profile',
    tabBarIcon: () => <Icon name="person" />,
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
        }}
      >
        <Header>
          <Title style={{ paddingTop: 10 }}>My Profile</Title>
        </Header>
        {!this.props.user && (
          <LoginOrRegister
            login={this.props.login}
            register={this.props.register}
            logout={this.props.logout}
            loading={this.props.loading}
            error={this.props.error}
          />
        )}
        {this.props.user && (
          <Content>
            <Form>
              <Item>
                <Item fixedLabel>
                  <Label>Name</Label>
                  <Input disabled placeholder={this.props.user.name} />
                </Item>
              </Item>
              <Item disabled>
                <Item fixedLabel>
                  <Label>Email</Label>
                  <Input disabled placeholder={this.props.user.email} />
                </Item>
              </Item>
              <Item disabled>
                <Item fixedLabel>
                  <Label>Address</Label>
                  <Input disabled placeholder={this.props.user.address} />
                </Item>
              </Item>
              <Item disabled>
                <Item fixedLabel>
                  <Label>Postcode</Label>
                  <Input disabled placeholder={this.props.user.postcode} />
                </Item>
              </Item>
              <Item disabled>
                <Item fixedLabel>
                  <Label>City</Label>
                  <Input disabled placeholder={this.props.user.city} />
                </Item>
              </Item>
            </Form>
            <LinkButton title={'Logout'} onPress={() => this.props.logout()} />
          </Content>
        )}
      </View>
    );
  }
}

MyProfile.propTypes = {
  user: PropTypes.any,
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    user: state.userReducer.user || null,
    loading: state.userReducer.loading,
    error: state.userReducer.error,
  };
}
function mapStateActionsToProps(dispatch) {
  return bindActionCreators(UserActions, dispatch);
}

export default connect(mapStateToProps, mapStateActionsToProps)(MyProfile);

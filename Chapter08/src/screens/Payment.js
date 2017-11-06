import React from 'react';
import { View } from 'react-native';

import { CreditCardInput } from 'react-native-credit-card-input';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Icon, Button, Text, Spinner, Title } from 'native-base';
import PropTypes from 'prop-types';
import * as PaymentsActions from '../reducers/payments';
import * as UserActions from '../reducers/user';
import LoginOrRegister from '../components/LoginOrRegister';

class Payment extends React.Component {
  static navigationOptions = {
    drawerLabel: 'MyCart',
    tabBarIcon: () => <Icon name="cart" />,
  };
  state = {
    validCardDetails: false,
    cardDetails: null,
  };
  onCardInputChange(creditCardForm) {
    this.setState({
      validCardDetails: creditCardForm.valid,
      cardDetails: creditCardForm.values,
    });
  }

  componentWillReceiveProps(newProps) {
    if (this.props.paying && newProps.paymentConfirmed) {
      this.props.navigation.navigate('PaymentConfirmation');
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          paddingTop: 10,
        }}
      >
        {this.props.cart.length > 0 &&
        !this.props.user && (
          <LoginOrRegister
            login={this.props.login}
            register={this.props.register}
            logout={this.props.logout}
            loading={this.props.loading}
            error={this.props.error}
          />
        )}
        {this.props.cart.length > 0 &&
        this.props.user && (
          <View>
            <Title style={{ margin: 10 }}>
              Paying: $
              {this.props.cart.reduce(
                (sum, p) => sum + p.price * p.quantity,
                0,
              )}
            </Title>
            <CreditCardInput onChange={this.onCardInputChange.bind(this)} />
            <Button
              block
              style={{ margin: 20 }}
              onPress={() =>
                this.props.pay(
                  this.props.user,
                  this.props.cart,
                  this.state.cardDetails,
                )}
              disabled={!this.state.validCardDetails}
            >
              <Text>Pay now</Text>
            </Button>
            {this.props.paying && <Spinner />}
          </View>
        )}
        {this.props.cart.length > 0 &&
        this.props.error && (
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
        {this.props.cart.length === 0 && (
          <Text style={{ alignSelf: 'center', margin: 30 }}>
            There are no products in the cart
          </Text>
        )}
      </View>
    );
  }
}

Payment.propTypes = {
  user: PropTypes.object,
  cart: PropTypes.array,
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  pay: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  paying: PropTypes.bool,
  error: PropTypes.string,
  paymentConfirmed: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.userReducer.user,
    cart: state.productsReducer.cart,
    loading: state.userReducer.loading,
    paying: state.paymentsReducer.loading,
    paymentConfirmed: state.paymentsReducer.paymentConfirmed,
    error: state.paymentsReducer.error || state.userReducer.error,
  };
}
function mapStateActionsToProps(dispatch) {
  return bindActionCreators(
    Object.assign({}, PaymentsActions, UserActions),
    dispatch,
  );
}

export default connect(mapStateToProps, mapStateActionsToProps)(Payment);

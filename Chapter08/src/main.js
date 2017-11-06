import React from 'react';
import {
  DrawerNavigator,
  TabNavigator,
  StackNavigator,
} from 'react-navigation';
import { Platform } from 'react-native';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import paymentsReducer from './reducers/payments';
import productsReducer from './reducers/products';
import userReducer from './reducers/user';

import ProductList from './screens/ProductList';
import ProductDetail from './screens/ProductDetail';
import MyCart from './screens/MyCart';
import MyProfile from './screens/MyProfile';
import Payment from './screens/Payment';
import PaymentConfirmation from './screens/PaymentConfirmation';
import Sales from './screens/Sales';

const ProductsNavigator = StackNavigator({
  ProductList: { screen: ProductList },
  ProductDetail: { screen: ProductDetail },
});

const PurchaseNavigator = StackNavigator({
  MyCart: { screen: MyCart },
  Payment: { screen: Payment },
  PaymentConfirmation: { screen: PaymentConfirmation },
});

let Navigator;
if (Platform.OS === 'ios') {
  Navigator = TabNavigator(
    {
      Home: { screen: ProductsNavigator },
      MyCart: { screen: PurchaseNavigator },
      MyProfile: { screen: MyProfile },
      Sales: { screen: Sales },
    },
    {
      tabBarOptions: {
        inactiveTintColor: '#aaa',
        activeTintColor: '#000',
        showLabel: true,
      },
    },
  );
} else {
  Navigator = DrawerNavigator({
    Home: { screen: ProductsNavigator },
    MyCart: { screen: MyCart },
    MyProfile: { screen: MyProfile },
    Sales: { screen: Sales },
  });
}

const store = createStore(
  combineReducers({ paymentsReducer, productsReducer, userReducer }),
  applyMiddleware(thunk),
);

export default () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);

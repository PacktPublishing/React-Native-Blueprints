import React from 'react';
import { Image, TouchableOpacity, Text, View, ActivityIndicator, Dimensions } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { Icon } from 'native-base';

import Header from '../components/Header';
import ImagesGrid from '../components/ImagesGrid';

var {height, width} = Dimensions.get('window');

class MyImages extends React.Component {
  static navigationOptions = {
    drawerLabel: 'My Images',
    tabBarIcon: ({ tintColor }) => (
      <Icon name='person' style={{fontSize: 40, color: tintColor}}/>
    )
  };

  componentWillMount() {
    this.props.fetchImages(this.props.user.name);
  }

  render() {
    return (
      <View>
        <Header onMenuButtonPress={() => this.props.navigation.navigate('DrawerOpen')} onCameraButtonPress={() => this.props.navigation.navigate('Camera')}/>
        {
          this.props.fetchingImages &&
          <View style={{justifyContent: 'center', height: (height - 50)}}>
            <ActivityIndicator/>
          </View>
        }
        <ImagesGrid images={this.props.images}/>
      </View>
    );
  }
}

function mapStateToProps(state) { return { images: state.imagesReducer.userImages, user: state.imagesReducer.user, fetchingImages: state.imagesReducer.fetchingUserImages } }
function mapStateActionsToProps(dispatch) { return bindActionCreators(Actions, dispatch) }

export default connect(mapStateToProps, mapStateActionsToProps)(MyImages);
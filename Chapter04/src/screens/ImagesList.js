import React from 'react';
import { View, ScrollView } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import { Icon } from 'native-base';

import Header from '../components/Header';
import Gallery from '../components/Gallery';
import ActivityIndicator from '../components/ActivityIndicator';

class ImagesList extends React.Component {
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name='list' style={{fontSize: 40, color: tintColor}}/>
    ),
    drawerLabel: 'All Images'
  };

  componentWillMount() {
    this.props.fetchImages();
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.addingImage && nextProps.addingImage) {
      this.scrollable.scrollTo({y: 0});
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header onMenuButtonPress={() => this.props.navigation.navigate('DrawerOpen')} onCameraButtonPress={() => this.props.navigation.navigate('Camera')}/>
        <ScrollView ref={(scrollable) => {
            this.scrollable = scrollable;
          }}>
          { this.props.addingImage && <ActivityIndicator message='Adding image' /> }
          <Gallery imageList={this.props.images} loading={this.props.fetchingImages}/>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) { return { images: state.imagesReducer.images, addingImage: state.imagesReducer.addingImage, fetchingImages: state.imagesReducer.fetchingImages } }
function mapStateActionsToProps(dispatch) { return bindActionCreators(Actions, dispatch) }

export default connect(mapStateToProps, mapStateActionsToProps)(ImagesList);
import React from 'react';
import { 
  Image,
  TouchableOpacity, 
  ScrollView, 
  Dimensions, 
  View,
  StyleSheet
} from 'react-native';

var {height, width} = Dimensions.get('window');

export default class ImagesGrid extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.imageContainer}>
          {
            this.props.images && 
            this.props.images.map(img => {
              return (<Image style={styles.image} key={img.id} source={{uri: img.src}}/>);
            })
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  },
  image: {
    width: (width/3 - 2),
    margin: 1,
    height: (width/3 - 2),
    resizeMode: 'cover'
  }
});
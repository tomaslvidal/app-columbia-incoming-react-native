import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {Scene,Router, Actions} from 'react-native-router-flux';

export default class AssetExample extends Component {
  render() {
    return (
          <View style={{height: 45, marginTop: 'auto', backgroundColor: '#48BBEC'}}>
            <Image source={require('../img/footer.jpg')} style={ styles.footerImage }>
            </Image>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  footerImage:{
    flex: 1,
    alignSelf: 'center',
    justifyContent:'center',
    width:'100%',
    height: '100%',
    paddingTop: 10,
    marginTop: 'auto',
    marginBottom:'auto'
  }
});

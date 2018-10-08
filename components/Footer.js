import React, { Component } from 'react';

import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import {Scene,Router, Actions} from 'react-native-router-flux';

export default class Footer extends Component{
  render(){
    return(
      <View style={styles.body}>
        <Image source={require('../img/footer.jpg')} style={styles.footerImage} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body:{
    height: 85, 
    marginTop: 'auto', 
    backgroundColor: '#48BBEC',
    borderRadius: 1
  },
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

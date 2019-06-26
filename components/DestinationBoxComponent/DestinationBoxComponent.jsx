import React, { Component } from 'react';

import {View, Text, StyleSheet, ImageBackground} from 'react-native';

export default class DestinationBox extends Component{
  constructor(props){
    super(props);
  }

  render(){
    const url = this.props.destination.parseado!= undefined ? this.props.destination.image1 : "http://columbiaapp.eviajes.online/destinations_m/download/"+this.props.destination.image1;

    return(
      <View style={[styles.boxDefault]}>
        <ImageBackground style={[styles.imageBackground, {}]} source={ {uri: url} }>
          <View style={{flex: 1}}>
            <Text style={[styles.text]}>
              {this.props.destination.title}
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxDefault:{
    height: 175,
    paddingBottom: 5
  },
  imageBackground:{
    height: '100%',
    width: '100%',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da'
  },
  text:{
    fontSize: 33,
    paddingTop: 18,
    paddingLeft: 20,
    color: '#FFF', 
    paddingBottom: 18,
    textShadowColor: "#000", 
    textShadowRadius: 23, 
    textShadowOffset: {height: 2, width: 1}
  }
});
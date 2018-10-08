import React, { Component } from 'react';

import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class FileComponent extends Component{
  render(){
    return(
      <View style={(this.props.style!=undefined && this.props.style!="") ? [styles.body, this.props.style] : styles.body}>
        <View>
          <Text style={styles.name}>{this.props.name}</Text>
        </View>
        
        <TouchableOpacity onPress={() => Actions.pop()} style={styles.icon}>
          <FontAwesome5 name={'file-download'} size={20} color={'#FFFFFF'} solid />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#404447',
    padding: 10,
  },
  name: {
    color: 'white',
    fontSize: 16
  },
  icon: {

  }
});

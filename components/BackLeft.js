import React, {Component} from 'react';

import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {Scene,Router, Actions} from 'react-native-router-flux';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class BackLeft extends Component{
  render(){
    return(
      <View style={styles.body}>
        <TouchableOpacity style={styles.container} onPress={() => Actions.pop()}>
          <View>
            <FontAwesome5 name={"arrow-alt-circle-left"} size={30} color="white" solid />
          </View>

          <View>
            <Text style={styles.textVolver}>Volver</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body:{
    height: 55,
    paddingLeft: 10,
    backgroundColor: '#48BBEC',
    display: 'flex',
    justifyContent: 'center'
  },
  container:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textVolver:{
    fontSize: 18, 
    fontWeight: '700', 
    color: 'white',
    marginLeft: 5
  }
});

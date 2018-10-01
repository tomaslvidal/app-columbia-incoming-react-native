import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {Scene,Router, Actions} from 'react-native-router-flux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class BackLeft extends Component {
  
  render() {
    return (
      <View style={[styles.boxDefault ,{marginTop: 30, height: 45, paddingLeft: 4,flexDirection: 'row', backgroundColor: '#48BBEC', justifyContent: 'flex-start'}]}>
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Actions.pop() }>
          <View style={ styles.sonsStyle }>
            <FontAwesome5 name="chevron-left" size={25} color="white" />
          </View>
          <View style={[styles.sonsStyle, { paddingLeft: 0 }]}>
            <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}> Volver </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxDefault: {
    height: 55
  },
  sonsStyle: {
    alignSelf: 'center'
  }
});

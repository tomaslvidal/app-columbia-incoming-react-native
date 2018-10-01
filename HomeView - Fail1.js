import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class HomeView extends Component {
  
  render() {
    return (
      <View style={[styles.boxDefault, { flexDirection: 'row', backgroundColor: '#48BBEC', marginTop: 20, justifyContent: 'flex-start'}]}>
        <View style={{ marginTop: 'auto', marginBottom: 'auto', marginLeft: 6 }}>
          <View>
            <Text> Test </Text>
          </View>
            
          <View>
            <Text> Test </Text>
          </View>
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  boxDefault: {
    height: 55
  },
});

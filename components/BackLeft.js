import React, { Component } from 'react';

import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import {Scene,Router, Actions} from 'react-native-router-flux';
// import { library } from '@fortawesome/fontawesome-svg-core'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

// library.add(faStroopwafel)

export default class BackLeft extends Component {
  render() {
    return (
      <View style={[styles.boxDefault ,{height: 45, paddingLeft: 8,flexDirection: 'row', backgroundColor: '#48BBEC', justifyContent: 'flex-start'}]}>
        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Actions.pop() }>
          <View style={ styles.sonsStyle }>
            {/*<FontAwesomeIcon icon="chevron-left" size={25} color="white" />*/}
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

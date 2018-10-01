import React, { Component } from 'react';
import {Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, Linking } from 'react-native';
import {Scene,Router, Actions} from 'react-native-router-flux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BackLeft from '../../components/BackLeft.js';
import Footer from '../../components/Footer.js';

export default class PollsContainer extends Component {
  render() {
  
    return (
      <View style={[{ flex: 1, flexDirection: 'column' }, {}]}>
        <BackLeft name={this.props.name} icon={this.props.icon} />
        <View style={{ flex: 1 }}>
          {this.props.children}
        </View>
        <Footer/>
      </View>
    );
  }
}

/*const styles = StyleSheet.create({

});*/


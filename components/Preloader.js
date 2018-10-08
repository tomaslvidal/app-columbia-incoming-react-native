import React, {Component} from 'react';

import {Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, Linking, ScrollView} from 'react-native';

import {UIActivityIndicator} from 'react-native-indicators';

export default class Preloader extends Component{
  constructor(props){
    super(props);
    
    this.state = {
    };
  }

  render(){
    return(
		<View style={styles.body}>
			<UIActivityIndicator size={70} color={"#404447"}/>
		</View>
    )
  }
}

const styles = StyleSheet.create({
	body : {
		display: 'flex',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
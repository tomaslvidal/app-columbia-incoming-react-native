import React, { Component } from 'react';
import {Text, View, StyleSheet, Image, ScrollView, ImageBackground, TouchableOpacity, TouchableHighlight, Linking } from 'react-native';
import {Scene,Router, Actions} from 'react-native-router-flux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CollapsibleList from 'react-native-collapsible-list'
import Div from './ModelContainer/index.js';
import * as t from 'tcomb-form-native'
var Form = t.form.Form;
import * as tvalidation from 'tcomb-validation';
var validate = tvalidation.validate;


var Person = t.struct({
  '¿Lorem ipsum dolor sit amet?': t.String,              // a required string
  '¿Lorem ipsum dolor sit amet2?': t.String,  // an optional string
  '¿Lorem ipsum dolor sit amet3?': t.String ,               // a required number
  '¿Lorem ipsum dolor sit amet4?': t.String,
  '¿Lorem ipsum dolor sit amet5?': t.String,
  '¿Lorem ipsum dolor sit amet6?': t.String,
  //fechaDelReclamo: t.Date
});

let myFormatFunction = (format,date) =>{
    return moment(date).format(format);
}

let options = {
    fields: {
    }
};

export default class PollsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <Div name="Encuesta" icon="bar-chart">
      <View style={styles.container}>
        <ScrollView style={styles.container}>

        </ScrollView>
      </View>
      </Div>
    )
  }
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
})



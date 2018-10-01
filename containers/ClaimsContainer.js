import React, { Component } from 'react';
import {Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableHighlight, Linking } from 'react-native';
import {Scene,Router, Actions} from 'react-native-router-flux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Div from './ModelContainer/index.js';
import * as t from 'tcomb-form-native'
var Form = t.form.Form;
import * as tvalidation from 'tcomb-validation';
var validate = tvalidation.validate;

var motivos = t.enums({
  1:"Demoras en las respuestas de los vendedores",
  2:"Errores en el tarifario",
  3:"Precio de un servicio distinto al acordado con los vendedores",
  4:"Problemas con el hotel",
  5:"Problemas con el traslado",
  6:"Problemas con la línea aérea",
  7:"Problemas con las excursiones",
  8:"Servicio cancelado previamente y facturado",
  9:"Problemas con compañías de cruceros"
});

var vendedores = t.enums({
  1: "Gomez",
  2: "Perez",
  3: "Silva"
})

var Person = t.struct({
  x0: t.String,              // a required string
  x1: t.String,  // an optional string
  x2: t.String,               // a required number
  x3: t.String,
  x4: t.String,
  x5: t.String,
  //fechaDelReclamo: t.Date
});

let myFormatFunction = (format,date) =>{
    return moment(date).format(format);
}
/*var fechaDelReclamo = {
    label: 'Fecha del reclamo',
    mode:'date',
    config:{
        format:(date) => myFormatFunction("DD MMM YYYY",date)
    }
};*/
let options = {
    fields: {
       //"fechaDelReclamo":fechaDelReclamo
    }
};

export default class ClaimsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }
  
  handleValueChange(values) {
    this.setState({ form: values })
  }
  
  onPress(){
    var value = this.refs.form.getValue();
  
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
    }
    else{
      console.log("Fallo por las validaciones");
    }
  }

  render () {
    return (
      <Div name="Formulario de Reclamos" icon="wpforms">
        <View style={{ flexDirection: 'row', flex:1, justifyContent: 'flex-start', alignItems: 'center'}}>
          <ScrollView contentContainerStyle={{marginTop: 'auto', marginBottom: 'auto'}}>
            <View style={{flex: 1, justifyContent: 'space-around', padding: 8}}>
              <Form
                ref="form"
                type={Person}
                options={options}
              />
              <TouchableHighlight style={styles.button} onPress={ () => this.onPress() } underlayColor='#99d9f4'>
                <Text style={[styles.buttonText, {}]}>Enviar</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </View>
      </Div>
    )
  }
}

const styles = StyleSheet.create({
  texts: {
    color: 'white'
  },
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



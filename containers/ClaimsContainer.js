import React, {Component} from 'react';

import {Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, TouchableHighlight, Linking } from 'react-native';

import {Scene,Router, Actions} from 'react-native-router-flux';

import Div from './ModelContainer/index.js';

import moment from 'moment';

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

var types_ = t.struct({
  nombre_y_Apellido: t.String,
  motivo: motivos,
  descripcionDelReclamo: t.String,
  prestadorDelServicio: t.String,
  vendedor: vendedores,
  fechaDelReclamo: t.Date
});

let myFormatFunction = (format,date) => {
  return moment(date).format(format);
}

var fechaDelReclamo = {
    label: 'Fecha del reclamo',
    mode:'date',
    config:{
        format:(date) => myFormatFunction("DD MMM YYYY",date)
    }
};

let options = {
  fields: {
     "fechaDelReclamo":fechaDelReclamo
  }
};

export default class ClaimsContainer extends Component{
  constructor(props, context){
    super(props, context);
  }

  handleValueChange(values){
    this.setState({ form: values });
  }
  
  onPress(){
    let value = this.refs.form.getValue();
  
    if(value){
      console.log(value);
    }
  }

  render(){
    return(
      <Div name="Formulario de Reclamos" icon="wpforms">
        <Form ref="form" type={types_} options={options}/>

        <TouchableHighlight style={styles.button} onPress={ (e) => this.onPress(e) } underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableHighlight>
      </Div>
    );
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
});
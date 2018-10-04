import React, { Component } from 'react';

import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {Actions} from 'react-native-router-flux';

import axios from 'axios';

import { PulseIndicator } from 'react-native-indicators';

import t from 'tcomb-form-native';

import _ from 'lodash';

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.controlLabel.normal.color = '#D8D8D8';

stylesheet.textbox.normal.color = '#D8D8D8';

stylesheet.textbox.error.color = '#D8D8D8';

const colorError = '#E44545';

stylesheet.textbox.error.borderColor = colorError;

stylesheet.controlLabel.error.color = colorError;

stylesheet.helpBlock.error.color = colorError;

stylesheet.errorBlock.color = '#FFE6E6';

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  contraseña
  : t.String,
});

const options = {
  fields: {
    email: {
      stylesheet: stylesheet,
      error: 'Ingresar email'
    },
    contraseña: {
      stylesheet: stylesheet,
      error: 'Ingresar contraseña',
      secureTextEntry : true
    },
  },
};

export default class LoginForm extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      form: {},
      loading: false
    }
  }

  onButtonPress(){
    Actions.HomeView();
  }

  enterAccount() {
    const user = this.formRef.getValue();

    console.log(stylesheet)

    if(user!=undefined && user.email!=undefined && user.contraseña!=undefined){
      this.setState({
        loading: true
      });

      let data = {
        client_id: 2,
        client_secret: 'YdDDU3QNKu290Uf4qoat5FQcBiseLXrI4fJD33aw',
        grant_type: 'password',
        username: user.email,
        password: user.contraseña,
      };

      axios.post('http://columbiaapp.eviajes.online/oauth/token', data)
      .then(response => {
          let responseData = response.data;

          let now = Date.now();

          responseData.expires_in = responseData.expires_in + now;

          setTimeout(() => {
            this.setState({
              loading: false
            });

            this.onButtonPress();
          }, 4000);

          console.log(responseData);
      })
      .catch( () => {
        this.setState({
          loading: false
        });
      })
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={[styles.divPulseIndicator, {position: this.state.loading===true ? 'absolute' : null, display: this.state.loading==true ? 'flex' : 'none'}]}>
          <PulseIndicator size={85} color="#D8D8D8"/>
        </View>

        <View style={styles.form}>
          <Form ref={c => this.formRef = c} type={User} options={options}/>

          <TouchableOpacity style={styles.buttonContainer} onPress={ () => this.enterAccount() }>
            <Text style={styles.buttonText}>
              INGRESAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
      display: 'flex',
      flex: 2,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    divPulseIndicator:{
      flex: 1,
      justifyContent: 'center',
      alignItems : 'center',
      bottom: '45%',
      right: '38%'
    },
    form:{
      display: 'flex', 
      flex: 1, 
      flexDirection: 'column', 
      justifyContent: 'center'
    },
    buttonContainer:{
      backgroundColor: '#0F84CD',
      paddingVertical: 15,
      borderRadius: 5
    },
    buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700'
    }
});
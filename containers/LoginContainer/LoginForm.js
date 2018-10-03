import React, { Component } from 'react';

import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet ,StatusBar} from 'react-native';

import {Scene,Router, Actions} from 'react-native-router-flux';

import InputComponent from '../../components/InputComponent.js';

import axios from 'axios';

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

const onButtonPress = () => {
  Actions.HomeView();
};

export default class LoginForm extends Component {
    constructor(props){
      super(props);
      
      this.state = {
        url: 'www.gbgviajes.com/v2/apitest/variedQuery.php',
        form: {}
      }
      
      //this.peticionURL = this.peticionURL.bind(this);
      this.testeandoCallBack = this.testeandoCallBack.bind(this);
    }
    
    peticionURL(){
      console.log("Solicitando peticion... en breves momentos");

      if(this.state.form.email.value!=undefined && this.state.form.password.value!=undefined)
      {
        let email, password, additionURL;
        email = this.state.form.email.value;
        password = this.state.form.password.value;
        additionURL = "?email="+email+"&password="+password;
  
        if(email!="" && password!="")
        {
          let completURL = "http://www.gbgviajes.com/v2/apitest/variedQuery.php"+additionURL;
          console.log(completURL);
          
          this.setState({
            loading: true
          });
          
          let min, max
          min = 15000;
          max = 20000;
          
          let timeSetTimeout = Math.floor(Math.random() * (max - min)) + min;
          
          fetch(completURL).then(response => response.json())
          .then(json => {
            
            json = json.data;
            
            if(json.login!=undefined)
            {
              if(json.login=="init"){
                console.log("INIT");
                
                setTimeout( () => {
                    Actions.HomeView();
                  }, timeSetTimeout);
                  
              }
              else if(json.login=="fail"){
                
                setTimeout( () => {
                  this.setState({
                    loading: false
                  });
                }, timeSetTimeout);
                console.log("THEN - ERROR");
              }
            }
            else{
              console.log(json);
            }
          })
          .catch( (data) => {
            
            setTimeout(() => {
              this.setState({
                loading: false
              });
            }, timeSetTimeout);
            
            if(json.login!=undefined)
            {
              if(json.login=="fail"){
                console.log("Catch - NOTINIT");
              }
              else{
                console.log("ERROR")
              }
            }
          })
        }
      }
    }

    handleChange(event) {
      let target = event;

      console.log(this.refs.email);
/*      let data = {
          client_id: 2,
          client_secret: 'YdDDU3QNKu290Uf4qoat5FQcBiseLXrI4fJD33aw',
          grant_type: 'password',
          username: user.email,
          password: user.password,
      };

      axios.post('/oauth/token', data)
      .then(response => {
          let responseData = response.data;
          let now = Date.now();

          responseData.expires_in = responseData.expires_in + now;

          context.commit('updateTokens', responseData);
      });*/
    }
    
    testeandoCallBack(testeo){
      if(Object.keys(testeo).length>=2)
      {
        if(testeo.name=="email" || testeo.name=="password"){
          let form = this.state.form
          form[testeo.name] = testeo;
          this.setState(form, () => {
            console.log(this.state.form);
          })
        }
      }
    }
    
    render() {
        return (
            <View style={styles.container}>
              <View style={{display: this.state.loading===true ? 'flex' : 'none', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <PulseIndicator color="white"/>
              </View>

              <Form ref="form" onSubmit={(event) => this.handleChange(event, "submit")} style={{marginBottom: 20}} onChange={(event) => this.handleChange(event)}>
                <Item style={{marginLeft: 0, marginRight: 15, marginLeft: 15}}>
                  <Input ref="email" keyboardType="email-address" style={{'color': '#dfdfdf', 'fontSize' : 16}} placeholderTextColor="#dfdfdf" placeholder="Email" />
                </Item>

                <Item style={{marginLeft: 0, marginRight: 15, marginLeft: 15}}>
                  <Input ref="password" style={{'color': '#dfdfdf', 'fontSize' : 16}} keyboardType="ascii-capable" secureTextEntry={true} placeholderTextColor="#dfdfdf" placeholder="Contraseña" />
                </Item>
              </Form>

              <TouchableOpacity style={styles.buttonContainer} onPress={ () => this.peticionURL() }>
                <Text style={styles.buttonText}>INGRESAR
                </Text>
              </TouchableOpacity> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
     padding: 20
    },
    input:{
        height: 40,
        backgroundColor: '#22313F',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }, 
    loginButton:{
      backgroundColor:  '#2980b6',
      color: '#fff'
    }
});
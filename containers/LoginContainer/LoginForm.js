import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet ,StatusBar} from 'react-native';
import {Scene,Router, Actions} from 'react-native-router-flux';
import InputComponent from '../../components/InputComponent.js';
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
      const {name, type, value} = event.nativeEvent;
      
      let processedData = value;
      
      if(type === 'text'){
        processedData = value.toUpperCase();
      }
      else if (type==='number'){
        processedData = value * 2;
      }
      
      this.setState({
        [name] : processedData
      });
    }
    
      
    componentDidMount(){
      this.peticionURL;
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
    
/*      BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,*/
  
    render() {
        return (
            <View style={styles.container}>
              <View style={{display: this.state.loading===true ? 'flex' : 'none', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <PulseIndicator color="white"/>
              </View>
              <InputComponent keyboardType={"email-address"} onChange={this.testeandoCallBack} name="email" placeholder="Email"  secureTextEntry={false}/>
              <InputComponent onChange={this.testeandoCallBack} name="password" placeholder="Contraseña" secureTextEntry={true}/>
              <TouchableOpacity style={styles.buttonContainer} onPress={ () => this.peticionURL() }>
                <Text style={styles.buttonText}>LOGIN
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
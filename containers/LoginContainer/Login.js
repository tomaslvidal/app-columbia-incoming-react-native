import React, { Component } from 'react';
import { View, Text, Image, StyleSheet,KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm.js';
	
    export default class Login extends Component {
    
    constructor(props){
      super(props);
      this.state = {
      };
    }

    render() {
        return (
          <View style={{flex:1, flexDirection: 'column'}}>
            <KeyboardAvoidingView behavior="padding" style={[styles.container, { marginTop: 30 }]}>
              <View style={styles.loginContainer}>
              <Image resizeMode="contain" style={styles.logo} source={require('./logo_columbia.png')} />
              </View>

              <View style={styles.formContainer}>
              <LoginForm />
              </View>
            </KeyboardAvoidingView>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2d3436',
        marginTop: 20
    },
    loginContainer:{
        marginTop: 10,
        marginLeft: 41,
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    title:{
        color: "#FFF",
        marginTop: 120,
        width: 180,
        textAlign: 'center',
        opacity: 0.9
    }
});
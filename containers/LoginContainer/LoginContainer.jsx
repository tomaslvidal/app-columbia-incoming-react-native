import React, { Component } from 'react';

import { View, Text, Image, StyleSheet,KeyboardAvoidingView } from 'react-native';

import LoginForm from './LoginForm';
	
export default class Login extends Component {
    constructor(props){
      super(props);
      
      this.state = {
        open : false
      };
    }

    render() {
        return (
          <KeyboardAvoidingView style={[styles.container]}>
            <View style={styles.loginContainer}>
                <Image resizeMode="contain" style={styles.logo} source={require('./logo_columbia.png')} />
            </View>

            <LoginForm />
          </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2d3436',
        padding: 30
    },
    loginContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flex: 1,
        marginLeft: 48
    },
    logo: {
    }
});
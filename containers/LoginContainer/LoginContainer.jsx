import React, { Component } from 'react';

import { View, Text, Image, StyleSheet,KeyboardAvoidingView, Platform } from 'react-native';

import LoginForm from './LoginForm';
    
export default class Login extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={styles.container1}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={[styles.container]}>
                    <View style={styles.loginContainer}>
                        <Image resizeMode="contain" style={styles.logo} source={require('./logo_columbia.png')} />
                    </View>

                    <LoginForm />
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: '#2d3436',
        padding: 30,
    },
    container: {
        flex: 1,
        width: '75%',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    loginContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flex: 1,
        marginLeft: 48
    }
});
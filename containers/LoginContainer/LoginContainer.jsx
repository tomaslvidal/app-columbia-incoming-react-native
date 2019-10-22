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
                        <Image resizeMode="stretch" style={styles.logo} source={require('./logo_columbia.png')} />
                    </View>

                    <View style={{
                        justifyContent: 'center',
                        display: 'flex',
                        flex: 3,
                        margin: 45
                    }}>
                        <LoginForm />
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        backgroundColor: '#2d3436',
        padding: 10,
    },
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    logo: {
        width: '100%',
        marginLeft: 47
    }, 
    loginContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flex: 3,
    }
});
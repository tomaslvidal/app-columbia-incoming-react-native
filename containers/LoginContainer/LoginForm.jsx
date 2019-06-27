import React, { Component } from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import axios from 'axios';

import { PulseIndicator } from 'react-native-indicators';

import t from 'tcomb-form-native';

import { merge } from 'lodash';

import { withNavigation } from 'react-navigation';

import { onSignIn } from "ColumbiaIncoming/auth";

const Form = t.form.Form;

class LoginForm extends Component {
    constructor(props){
        super(props);

        this.stylesheet = merge(t.form.Form.stylesheet, {
            controlLabel: {
                normal: {
                    color: '#D8D8D8'
                },
                error: {
                    color: '#E44545'
                }
            },
            textbox: {
                normal: {
                    color: '#D8D8D8'
                },
                error: {
                    color: '#D8D8D8'
                }
            },
            helpBlock: {
                error: {
                    color: '#E44545'
                }
            },
            errorBlock: {
                color: '#FFE6E6'
            }
        })

        this.state = {
            form: {
                struct: t.struct({
                    email: t.String,
                    password: t.String
                }),
                options: {
                    fields: {
                        email: {
                            stylesheet: this.stylesheet,
                            error: 'Ingresar email'
                        },
                        password: {
                            stylesheet: this.stylesheet,
                            error: 'Ingresar contraseña',
                            secureTextEntry : true
                        }
                    }
                }
            },
            loading: false
        }
    }

    enterAccount(){
        let user = this.formRef.getValue();

        if(user !== null){
            if(typeof user.email !== "undefined" && typeof user.password !== "undefined"){
                this.setState({
                    loading: true
                });

                axios(`http://www.columbiaviajes.com/admin/for_app/login.php?email=${user.email}&password=${user.password}`)
                .then(response => {
                    setTimeout(() => {
                        if(response.data.status === 'success'){
                            this.setState({
                                loading: false
                            });

                            onSignIn()
                            .then(() => {
                                this.props.navigation.navigate("SignedIn");
                            })
                            .catch(e => {
                                console.log(e);
                            });
                        }
                        else{
                            this.setState({
                                loading: false
                            });
                        }
                    }, 1000);
                })
                .catch(e => {
                    console.log(e);
                });
            }
        }
    }

  render(){
    return (
        <View style={styles.container}>
            <View style={[styles.divPulseIndicator, { position: this.state.loading===true ? 'absolute' : null, display: this.state.loading === true ? 'flex' : 'none'}]}>
                <PulseIndicator size={85} color="#D8D8D8"/>
            </View>

            <View style={styles.form}>
                <Form ref={c => this.formRef = c} type={this.state.form.struct} options={this.state.form.options}/>

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
        justifyContent: 'center'
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

export default withNavigation(LoginForm);
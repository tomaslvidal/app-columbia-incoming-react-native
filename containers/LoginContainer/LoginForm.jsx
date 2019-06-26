import React, { Component } from 'react';

import { connect } from 'react-redux';

import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import axios from 'axios';

import { PulseIndicator } from 'react-native-indicators';

import t from 'tcomb-form-native';

import _ from 'lodash';

import { withNavigation } from 'react-navigation';

import { setLoguedAccount } from "ColumbiaIncoming/actions";

import { onSignIn } from "ColumbiaIncoming/auth";

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

class LoginForm extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      form: {},
      loading: false
    }
  }

  enterAccount() {
    const user = this.formRef.getValue();

    this.setState({
        loading: true
    });

    if(typeof user.email !== "undefined" && typeof user.contraseña !== "undefined"){
        if(user.email !== null && user.contraseña !== null){
            axios(`http://www.columbiaviajes.com/admin/for_app/login.php?email=${user.email}&password=${user.contraseña}`)
            .then(response => {
                console.log("res: ", response)
                setTimeout(() => {
                    if(response.data.status=='success'){
                        this.setState({
                            loading: false
                        }, () => {
                            onSignIn()
                            .then(() => {
                                this.props.navigation.navigate("SignedIn");
                            })
                            .catch(e => {
                                console.log(e);
                            });
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
        <View style={[styles.divPulseIndicator, {position: this.state.loading===true ? 'absolute' : null, display: this.state.loading === true ? 'flex' : 'none'}]}>
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

const mapDispathToProps = dispath => {
  return {
    onSetLoguedAccount: item => {
      dispath(setLoguedAccount(item));
    }
  };
};

export default connect(null, mapDispathToProps)(withNavigation(LoginForm));
import {StyleSheet,Text,View,Image,TouchableHighlight,Animated, TextInput} from 'react-native';
import React, { Component } from 'react';
import {Scene,Router, Actions} from 'react-native-router-flux';

export default class InputComponent extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
        
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount(){

    }
    
    handleChange(event){
      let event_ = event.nativeEvent;
      let text  = event_.text;
      let parseo;
      
      this.setState({
        [this.props.name] : text
      }, () => {
        parseo = {
          name: this.props.name,
          value: this.state[this.props.name]
        }
        
        if(Object.keys(parseo).length>=2){
          if(!Number.isInteger(parseo)){
            this.props.onChange(parseo);
          }
        }
        })
      
    }

    render(){
        return ( 
            <TextInput style = {styles.input}   
                           returnKeyType="go" ref={(input)=> this.passwordInput = input} 
                           placeholder={this.props.placeholder ? this.props.placeholder : ''}
                           onChange={ (event) => this.handleChange(event) }
                           placeholderTextColor='rgba(225,225,225,0.7)' 
                           secureTextEntry={this.props.secureTextEntry == true ? true : false}
                           keyboardType={this.props.keyboardType ? this.props.keyboardType : 'default'}/>
            
        );
    }
}

var styles = StyleSheet.create({
   input:{
        height: 40,
        backgroundColor: '#22313F',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
   }
});
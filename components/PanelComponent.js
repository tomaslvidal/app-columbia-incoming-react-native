import {StyleSheet,Text,View,Image,TouchableHighlight,Animated} from 'react-native';

import React, { Component } from 'react';

import {Scene,Router, Actions} from 'react-native-router-flux';

export default class PanelComponent extends Component{
    constructor(props){
      super(props);

      this.icons = {
        'up'    : require('./images/arrow-up-01-24.png'),
        'down'  : require('./images/arrow-down-01-24.png')
      };

      this.state = {
        title : props.title,
        expanded : false,
        animation : new Animated.Value(),
        init: true
      };
    }

    toggle(){
      let initialValue    = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
          finalValue      = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
  
      this.setState({
        expanded : !this.state.expanded
      });
  
      this.state.animation.setValue(initialValue);

      Animated.spring(
        this.state.animation,
        {
          toValue: finalValue
        }
      ).start();
    }
    
    _setMaxHeight(event){
      this.setState({
        maxHeight   : event.nativeEvent.layout.height
      });
    }

    _setMinHeight(event){
      this.setState({
        minHeight   : event.nativeEvent.layout.height
      }, ()=>{
        this.state.animation.setValue(this.state.minHeight);
      });

    }

    render(){
      let icon = this.icons['down'];

      if(this.state.expanded){
        icon = this.icons['up'];
      }

      return(
        <Animated.View style={[styles.container,{height: this.state.animation}]}>
          <View ref="viewMinHeight" style={styles.titleContainer} onLayout={(e) => this._setMinHeight(e)}>
            <Text style={styles.title}>{this.state.title}</Text>

            <TouchableHighlight style={styles.button} onPress={(e) => this.toggle(e)} underlayColor="#f1f1f1">
              <Image style={[styles.buttonImage, {paddingRight: 10}]} source={icon} />
            </TouchableHighlight>
          </View>

          <View style={styles.body} onLayout={(e) => this._setMaxHeight(e)}>
            <View style={styles.content}>
              {this.props.children}
            </View>
          </View>
        </Animated.View>
      );
    }
}

var styles = StyleSheet.create({
    container:{
      backgroundColor: '#fff',
      margin: 10,
      overflow: 'hidden'
    },
    titleContainer:{
      flexDirection: 'row'
    },
    title:{
      flex: 1,
      padding: 10,
      color: '#2a2f43',
      fontWeight: 'bold',
    },
    button:{
      marginTop: 8,
      marginRight: 15
    },
    buttonImage:{
      width: 30,
      height: 25
    },
    body: {
      padding: 10,
      paddingTop: 0
    },
    content:{
      padding: 8
    }
});
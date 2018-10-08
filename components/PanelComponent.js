import {StyleSheet, Text, View, Image, TouchableHighlight, Animated} from 'react-native';

import React, {Component} from 'react';

import {Scene, Router, Actions} from 'react-native-router-flux';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class PanelComponent extends Component{
    constructor(props){
      super(props);

      this.icons = {
        'up'    : 'caret-up',
        'down'  : 'caret-down'
      };

      this.state = {
        title : props.title,
        expanded : false,
        animation : new Animated.Value(),
        init: true
      };
    }

    componentDidMount(){
      this.state.animation.setValue(40);
    }

    toggle(){
      let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight;

      let finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

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
        maxHeight: event.nativeEvent.layout.height
      });
    }

    _setMinHeight(event){
      this.setState({
        minHeight: event.nativeEvent.layout.height
      });
    }

    render(){
      let icon = this.icons.down;

      if(this.state.expanded){
        icon = this.icons.up;
      }

      return(
        <Animated.View style={[styles.container, {height: this.state.animation}]}>
          <View ref="viewMinHeight" style={styles.titleContainer} onLayout={(e) => this._setMinHeight(e)}>
            <Text style={styles.title}>{this.state.title}</Text>

            <TouchableHighlight style={styles.button} onPress={(e) => this.toggle(e)} underlayColor="#f1f1f1">
              <FontAwesome5 name={icon} size={27} color={'#009EE0'} solid />
            </TouchableHighlight>
          </View>

          <View style={styles.body} onLayout={(e) => this._setMaxHeight(e)}>
            <View>
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
    marginTop: 5,
    marginBottom: 5,
    overflow: 'hidden'
  },
  titleContainer:{
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    minHeight: 40
  },
  title:{
    flex: 1,
    color: '#2a2f43',
    fontWeight: 'bold',
  },
  body: {
    padding: 18,
    paddingTop: 0
  }
});
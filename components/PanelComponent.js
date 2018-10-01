import {StyleSheet,Text,View,Image,TouchableHighlight,Animated} from 'react-native';
import React, { Component } from 'react';
import {Scene,Router, Actions} from 'react-native-router-flux';

export default class PanelComponent extends Component{
    constructor(props){
        super(props);

        this.icons = {     //Step 2
            'up'    : require('./images/arrow-up-01-24.png'),
            'down'  : require('./images/arrow-down-01-24.png')
        };

        this.state = {
          title       : props.title,
          expanded    : false,
          animation   : new Animated.Value()
        };
    }
    
    componentDidMount(){
      this.toggle();

      setTimeout( () => {
        this.toggle();
      }, 200);
    }

    toggle(){
      //Step 1
      let initialValue    = this.state.expanded? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
          finalValue      = this.state.expanded? this.state.minHeight : this.state.maxHeight + this.state.minHeight;
  
      this.setState({
          expanded : !this.state.expanded  //Step 2
      });
  
      this.state.animation.setValue(initialValue);  //Step 3
      Animated.spring(     //Step 4
          this.state.animation,
          {
              toValue: finalValue
          }
      ).start();  //Step 5
    }
    
    _setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : event.nativeEvent.layout.height
        });
    }

    render(){
        let icon = this.icons['down'];

        if(this.state.expanded){
            icon = this.icons['up'];   //Step 4
        }

        //Step 5
        return ( 
            <Animated.View 
                style={[styles.container,{height: this.state.animation}]}>
                
              <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}> //Step 1
                <Text style={styles.title}>{this.state.title}</Text>
                <TouchableHighlight 
                    style={styles.button} 
                    onPress={this.toggle.bind(this)}
                    underlayColor="#f1f1f1">
                    <Image
                        style={[styles.buttonImage, { paddingRight: 10 }]}
                        source={icon}
                    ></Image>
                </TouchableHighlight>
              </View>
                
              <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}> //Step 2
                  {this.props.children}
              </View>

             </Animated.View>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        margin:10,
        overflow:'hidden'
    },
    titleContainer:{
        flexDirection: 'row'
    },
    title:{
        flex    : 1,
        padding : 10,
        color   :'#2a2f43',
        fontWeight:'bold'
    },
    button:{

    },
    buttonImage:{
        width   : 30,
        height  : 25
    },
    body: {
        padding     : 10,
        paddingTop  : 0
    }
});
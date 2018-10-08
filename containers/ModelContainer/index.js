import React, {Component} from 'react';

import {Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, Linking, ScrollView} from 'react-native';

import {Scene, Router, Actions} from 'react-native-router-flux';

import BackLeft from '../../components/BackLeft.js';

import Footer from '../../components/Footer.js';

export default class PollsContainer extends Component{
  constructor(props){
    super(props);

    this.state={
      heightParent: ""
    };
  }

  render(){
    return(
      <View style={[{ flex: 1, flexDirection: 'column' }, {}]}>
        {
        (this.props.backleft != undefined && this.props.backleft == false)  ? null
        : (<BackLeft name={this.props.name} icon={this.props.icon} />)
        }
        <View style={{display: 'flex', flex: 1}} onLayout={(event) => this.setState({heightParent: event.nativeEvent.layout.height})}>
          <ScrollView style={{display: 'flex'}}>
            <View style={{display: 'flex', minHeight: this.state.heightParent!="" ? this.state.heightParent : null}}>
              <View style={styles.container}>
                <View>
                  <Text>
                  {this.props.title}
                  </Text>
                </View>

                <View style={{ display: 'flex', flex: 1 }}>
                  {this.props.children}
                </View>
              </View>

              {
              (this.props.footer != undefined && this.props.footer == false) ? null
              : (<Footer/>)
              }
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    padding: 10,
  }
});
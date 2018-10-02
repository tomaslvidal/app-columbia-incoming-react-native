import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {Actions} from 'react-native-router-flux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Div from './ModelContainer/index.js';

export default class VoucherContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render () {
    return (
      <Div name="Voucher e Initerarios" icon='bar-chart'>
        <View style={{ flexDirection: 'column', flex:1, justifyContent: 'flex-start', alignItems: 'center'}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 28, width: '90%', marginBottom: 7, marginTop: 7, backgroundColor: '#1B9CFC'}}>
            <View style={{paddingLeft: 5}}><Text style={[styles.texts, {} ]}> Itinerario 1 </Text></View>
            <TouchableOpacity onPress={ () => Actions.pop() }>
              <View style={{paddingRight: 10}}><Text><FontAwesome5 name="cloud-download" size={25} color="white" /></Text></View>
            </TouchableOpacity>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 28, width: '90%', marginBottom: 7, marginTop: 7, backgroundColor: '#1B9CFC'}}>
            <View style={{paddingLeft: 5}}><Text style={[styles.texts, {} ]}> Itinerario 2 </Text></View>
            <TouchableOpacity onPress={ () => Actions.pop() }>
              <View style={{paddingRight: 10}}><Text><FontAwesome5 name="cloud-download" size={25} color="white" /></Text></View>
            </TouchableOpacity>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 28, width: '90%', marginBottom: 7, marginTop: 7, backgroundColor: '#1B9CFC'}}>
            <View style={{paddingLeft: 5}}><Text style={[styles.texts, {} ]}> Voucher 1 </Text></View>
            
            <TouchableOpacity onPress={ () => Actions.pop() }>
              <View style={{paddingRight: 10}}><Text><FontAwesome5 name="cloud-download" size={25} color="white" /></Text></View>
            </TouchableOpacity>
          </View>
          
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 28, width: '90%', marginBottom: 7, marginTop: 7, backgroundColor: '#1B9CFC'}}>
            <View style={{paddingLeft: 5}}><Text style={[styles.texts, {} ]}> Voucher 1 </Text></View>
            <TouchableOpacity onPress={ () => Actions.pop() }>
            <View style={{paddingRight: 10}}><Text><FontAwesome5 name="cloud-download" size={25} color="white" /></Text></View>
            </TouchableOpacity>
          </View>
        </View>
      </Div>
    )
  }
}

const styles = StyleSheet.create({
  texts: {
    color: 'white'
  },
})



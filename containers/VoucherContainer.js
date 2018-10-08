import React, {Component} from 'react';

import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {Actions} from 'react-native-router-flux';

import Div from './ModelContainer/index.js';

import FileComponent from '../components/FileComponent.js';

export default class VoucherContainer extends Component{
  constructor(props){
    super(props);
    
    this.state = {
    };
  }

  render(){
    return(
      <Div name="Voucher e Initerarios" icon='bar-chart'>
      {
        function(){
          let contentFiles = [];

          for(i = 0; i < 5; i++){
            contentFiles.push(<FileComponent name="Test" style={styles.fileComponent}/>);
          }

          return contentFiles;
        }()
      }
      </Div>
    )
  }
}

const styles = StyleSheet.create({
  texts: {
    color: 'white'
  },
  fileComponent: {
    marginTop: 6,
    marginBottom: 6
  }
});
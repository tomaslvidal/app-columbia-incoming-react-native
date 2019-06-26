import React, { Component } from 'react';

import {Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import FooterComponent from 'ColumbiaIncoming/components/FooterComponent';

export default class HomeView extends Component {
    constructor(props){
        super(props);

        this.state = {
            config: {
                icon: {
                    size: 50,
                    color: '#1B76BC'
                }
            }
        }
    }
  render() {
    return (
      <View style={{flex:1, flexDirection: 'row'}}>
        <ImageBackground source={require('ColumbiaIncoming/img/earth.jpg')} style={{flex: 1, opacity: 1}}>
          <View style={[styles.container, {} ]}>
            <View style={[styles.row, { flex: 1, backgroundColor: 'transparent'}]}>
              <View style={{flex: 2, justifyContent: 'flex-end', padding: 12 }}>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Surveys') } style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View style={styles.viewIcon}>
                    <FontAwesome5 name={'sticky-note'} size={this.state.config.icon.size} color={this.state.config.icon.color} solid />
                  </View>

                  <View style={{paddingTop: 6}}>
                    <Text style={styles.text}>
                      {`Encuesta`}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              
              <View style={{justifyContent: 'flex-end', alignItems: 'center'}}>
                <View style={[styles.lineVertical, {marginBottom: 12}]}>
                </View>
              </View>
              
              <View style={{flex: 2, justifyContent: 'flex-end', padding: 12 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Tours') } style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View style={styles.viewIcon}>
                    <FontAwesome5 name={'smile-wink'} size={this.state.config.icon.size} color={this.state.config.icon.color} solid />
                  </View>

                  <View style={{paddingTop: 6}}>
                    <Text style={styles.text}>
                      {`Tours Opciones`}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={[styles.row, { justifyContent: 'center'}]}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <View style={[styles.lineHorizontal, styles.leftRight]}>

                </View>

                <View style={[styles.circulo, styles.leftRight, styles.topBottom]}>

                </View>

                <View style={[styles.lineHorizontal, styles.leftRight]}>

                </View>
              </View>
            </View>
            
            <View style={[styles.row, { flex:1, backgroundColor: 'transparent'}]}>
              <View style={{ flex: 2, padding: 12 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Vouchers')} style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View style={styles.viewIcon}>
                    <FontAwesome5 name={'list-alt'} size={this.state.config.icon.size} color={this.state.config.icon.color} solid />
                  </View>

                  <View style={{paddingTop: 6}}>
                    <Text style={styles.text}>
                      {`Vouchers\n e Itinerario`}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              
              <View style={{backgroundColor: 'transparent', justifyContent: 'flex-start', alignItems: 'center'}}>
                <View style={[styles.lineVertical, {marginTop: 12}]}>

                </View>
              </View>
              
              <View style={{flex: 2, padding: 12 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DestinationList')} style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View style={styles.viewIcon}>
                    <FontAwesome5 name={'wpforms'} size={this.state.config.icon.size} color={this.state.config.icon.color} solid />
                  </View>

                  <View style={{paddingTop: 6}}>
                    <Text style={styles.text}>
                        {`Destinos\n y Mapas`}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <FooterComponent />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
  },
  row: {
    flexDirection: 'row'
  },
  viewFooter:{
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#E6F3FC',
    height: 85,
    borderRadius: 1
  },
  imageFooter:{
    resizeMode: 'contain', 
    height: '100%', 
    marginLeft: 50, 
    width: '60%'
  },
  lineHorizontal:{
    flex: 1,
    width: '33%', 
    height: 2, 
    alignSelf: 'center', 
    backgroundColor:'#bdc3c7'
  },
  leftRight:{
    marginLeft: 12,
    marginRight: 12
  },
  topBottom:{
    marginTop: 12,
    marginBottom: 12
  },
  viewIcon:{
    display: 'flex', 
    backgroundColor: '#EAEAEA', 
    borderRadius: 15,
    padding: 15,
  },
  lineVertical:{
    height: '50%', 
    width: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'column', 
    backgroundColor: '#bdc3c7'
  },
  circulo:{
     width: 7,
     height: 7,
     borderRadius: 10,
     backgroundColor: 'white'
  },
  text:{
    color: '#FCFCFC', 
    fontSize: 19, 
    fontWeight: '400', 
    textAlign: 'center'
  }
});
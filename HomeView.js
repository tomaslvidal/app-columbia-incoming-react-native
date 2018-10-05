import React, { Component } from 'react';

import {Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, Linking } from 'react-native';

import {Scene,Router, Actions} from 'react-native-router-flux';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

// const icon = ();

const iconSize = 50;

const iconColor = "#1B76BC";

export default class HomeView extends Component {
  render() {
    return (
      <View style={{flex:1, flexDirection: 'row'}}>
        <ImageBackground source={{uri: 'https://k42.kn3.net/taringa/3/E/4/0/8/E/gonzaa9614/1B5.jpg'}} style={{flex: 1, opacity: 1}}>
          <View style={[styles.container, {} ]}>
            <View style={[styles.row, { flex: 1, backgroundColor: 'transparent'}]}>
              <View style={{ flex: 2, justifyContent: 'flex-end', padding: 12 }}>
                <TouchableOpacity onPress={ () => Actions.PollsContainer() } style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View style={styles.viewIcon}>
                    <FontAwesome5 name={'sticky-note'} size={iconSize} color={iconColor} solid />
                  </View>

                  <View style={{paddingTop: 6}}>
                    <Text style={styles.text}>
                      Encuesta
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              
              <View style={{justifyContent: 'flex-end', alignItems: 'center'}}>
                <View style={[styles.lineVertical, {marginBottom: 12}]}>
                </View>
              </View>
              
              <View style={{flex: 2, justifyContent: 'flex-end', padding: 12 }}>
                <TouchableOpacity onPress={ () => Linking.openURL('http://www.columbiaviajes.com.ar/contacto.php' )}style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View style={styles.viewIcon}>
                    <FontAwesome5 name={'smile-wink'} size={iconSize} color={iconColor} solid />
                  </View>

                  <View style={{paddingTop: 6}}>
                    <Text style={styles.text}>
                      Contacto
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
                <TouchableOpacity onPress={() => Actions.VoucherContainer()} style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View style={styles.viewIcon}>
                    <FontAwesome5 name={'list-alt'} size={iconSize} color={iconColor} solid />
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
                <TouchableOpacity onPress={ () => Actions.ClaimsContainer() } style={{justifyContent: 'center', alignItems: 'center'}}>
                  <View style={styles.viewIcon}>
                    <FontAwesome5 name={'wpforms'} size={iconSize} color={iconColor} solid/>
                  </View>

                  <View style={{paddingTop: 6}}>
                    <Text style={styles.text}>
                      {`Formulario\n de Reclamos`}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <View style={[styles.row, {flex: 1, paddingTop: 5, paddingBottom: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E6F3FC' }]}>
            <Image source={{ uri: 'http://www.columbiaviajes.com.ar/img/columbia-logo.png' }} style={{ resizeMode: 'contain', height: '90%', marginLeft: 50, width: '60%'}}/>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'transparent'
  },
  row: {
    flexDirection: 'row'
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
  circulo: {
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
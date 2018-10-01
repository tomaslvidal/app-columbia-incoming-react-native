import React, { Component } from 'react';
import {Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, Linking } from 'react-native';
import {Scene,Router, Actions} from 'react-native-router-flux';
import BackLeft from './components/BackLeft'
import Footer from './components/Footer'


export default class App extends Component {

  render() {
    
    return (
      <View style={styles.container}>
      
        <View style={[styles.row1, styles.generalStyle]}>
          <TouchableOpacity onPress={() => Actions.VoucherView()}>
            <ImageBackground style={ styles.imageBackground } source={{uri: 'https://www.flyfamilyfly.com/wp-content/uploads/2016/05/prudential-boston-view-1.jpg'}}>
              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <Text style={[ styles.text ,{ paddingRight: 28 } ]}>
                  Vouchers
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View style={[styles.row2, styles.generalStyle]}>
          <View style={{ flexDirection: 'column', flex: 1, marginRight: 2 }}>
            <View style={[styles.onlyColumn4, {flex: 1, backgroundColor: '#00b8d4', marginBottom: 2}]}>
              <TouchableOpacity onPress={ () => Actions.DestinationList() }>
                <ImageBackground style={ styles.imageBackground } source={{ uri: 'https://cdn1.eldia.com/062017/1497780059403.jpg' }}>
                  <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <Text style={[ styles.text , { } ]}>
                      Destinos
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={(styles.onlyColumn4, [{ flexDirection: 'column', justifyContent: 'center', flex: 1, marginLeft: 2, backgroundColor: '#038ec7' }])}>
            <TouchableOpacity onPress={ () => Linking.openURL('http://www.columbiaviajes.com.ar/landing/index.php?id_landing=3') } >
              <ImageBackground style={ styles.imageBackground } source={{ uri: 'http://www.ideal.es/noticias/201704/20/media/cortadas/avion-kqcG-U213600642781lbE-575x323@Ideal.jpg' }}>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                  <Text style={[ styles.text , { } ]}>
                    Check In
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={[styles.row3, styles.generalStyle]}>
        
          <View style={{ flexDirection: 'column', flex: 1, marginRight: 2 }}>
            <View style={(styles.onlyColumn4, [{ flexDirection: 'column', justifyContent: 'center', flex: 1, marginLeft: 2, backgroundColor: '#038ec7' }])}>
              <TouchableOpacity onPress={ () => Actions.PollsView()  }>
                <ImageBackground style={ styles.imageBackground } source={{ uri: 'https://www.openmet.com/wp-content/uploads/2016/07/encuesta-de-satisfaccio%CC%81n.jpg' }}>
                  <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <Text style={[ styles.text , { } ]}>
                      Encuesta
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={(styles.onlyColumn4, [{ flexDirection: 'column', justifyContent: 'center', flex: 1, marginLeft: 2, backgroundColor: '#038ec7' }])}>
            <TouchableOpacity onPress={ () => Linking.openURL('https://www.columbiaviajes.com.ar') }>
              <ImageBackground style={ styles.imageBackground } source={{ uri: 'http://blogrp.todomundorp.com.br/wp-content/uploads/2016/10/blog_rp-1200x480.jpg' }}>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                  <Text style={[ styles.text , { } ]}>
                    Web
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          
        </View>
        
        // Columna 4
        <View style={[styles.row4, styles.generalStyle]}>
          <View style={{ flexDirection: 'column', flex: 1, marginRight: 2 }}>
            <View style={(styles.onlyColumn4, [{ flexDirection: 'column', justifyContent: 'center', flex: 1, marginLeft: 2, backgroundColor: '#038ec7' }])}>
              <TouchableOpacity onPress={ () => Actions.ClaimsView() }>
                <ImageBackground style={ styles.imageBackground } source={{ uri: 'https://k50.kn3.net/084F07007.jpg' }}>
                  <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <Text style={[ styles.text , { } ]}>
                      Reclamo
                    </Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={(styles.onlyColumn4, [{ flexDirection: 'column', justifyContent: 'center', flex: 1, marginLeft: 2, backgroundColor: '#038ec7' }])}>
            <TouchableOpacity onPress={ () => Linking.openURL('http://www.columbiaviajes.com.ar/contacto.php')}>
              <ImageBackground style={ styles.imageBackground } source={{ uri: 'https://1.bp.blogspot.com/-pFa5MPcmoYY/WAYJdrx_fnI/AAAAAAABPvM/OhBgERLVYswL_o0HZFXsBW4929vPYXZXACLcB/s1600/contacto.jpg' }}>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                  <Text style={[ styles.text , { } ]}>
                    Contacto
                  </Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={[styles.row5, styles.generalStyle]}>
          <Image source={{ uri: 'https://codifiedlondon.blob.core.windows.net/storage/2016/02/reactive-nativingitup.png.800x600_q96.png' }} style={ styles.imagenColumn5 }>
          </Image>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    paddingTop: 30,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageBackground:{
    height: '100%',
    width: '100%'
  },
  imagenColumn5:{
    flex: 1,
    alignSelf: 'center',
    justifySelf:'center',
    width:'100%',
    marginTop: 'auto',
    marginBottom:'auto'
  },
  text: {
    color: '#FFF', 
    paddingBottom: 6,
    paddingRight: 4,
    fontSize: 32,
    textAlign: 'right',
    fontWeight: '600',
    textShadowColor: "#000", 
    textShadowRadius: 7, 
    textShadowOffset: { height: 2, width: -0 }
  },
  generalStyle:{
    alignSelf: 'stretch',
    borderRadius: '5px', 
    borderWidth: '2.5px', 
    borderColor: 'white',
    margin: 1
  },
  row1 : {
    flex: 5
  },
  row2:{
    flex: 4, 
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row3:{
    flex: 4, 
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row4:{
    flex: 4, 
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  row5:{
    flex: 2, 
    padding: 0
  },
  onlyColumn4:{
    flex: 1, 
    alignSelf: 'stretch',
    backgroundColor: '#038ec7', 
    flexWrap: 'wrap', 
    justifyContent:'center'
  }
});


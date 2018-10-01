import React, { Component } from 'react';
import {Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, Linking } from 'react-native';
import {Scene,Router, Actions} from 'react-native-router-flux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const iconSize = 70;

export default class HomeView extends Component {


  render() {
  
    return (
      <View style={{flex:1, flexDirection: 'row', backgroundColor: '#eae9ef'}}>
      <ImageBackground source={{ uri: 'https://static.vix.com/es/sites/default/files/styles/large/public/imj/nuestrorumbo/l/las-5-montanas-mas-altas-del-mundo-4.jpg?itok=gmnd5X7f' }} style={{marginTop: 30, flex: 1, opacity: 1}}>
      
        <View style={[styles.container, {} ]}>
          <View style={[styles.row, { flex:18, backgroundColor: 'transparent'}]}>
            
            <View style={{ flex: 16, justifyContent: 'flex-end', padding: 12 }}>
              <TouchableOpacity onPress={ () => Actions.PollsContainer() } style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 15}}>
                  <FontAwesome5 name="bar-chart" size={iconSize} color="white" />
                  <View style={{paddingTop: 6}}><Text style={{color: '#bdc3c7', fontSize: 20, fontWeight: '500', textAlign: 'center'}}>  Encuesta </Text></View>
              </TouchableOpacity>
            </View>
            
            <View style={{ flex: 1, backgroundColor: 'trasnparent', justifyContent: 'flex-end', alignItems: 'center'}}>
              <View style={{ height: '50%', width: 2, marginBottom: 27, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#bdc3c7' }}>
              </View>
            </View>
            
            <View style={{ flex: 16, justifyContent: 'flex-end', padding: 12 }}>
              <TouchableOpacity onPress={ () => Linking.openURL('http://www.columbiaviajes.com.ar/contacto.php' )}style={{justifyContent: 'center', alignItems: 'center', paddingRight: 15}}>
                <FontAwesome5 name="user-circle" size={iconSize} color="white" />
                <View style={{paddingTop: 6}}><Text style={{color: '#bdc3c7', fontSize: 20, fontWeight: '500', textAlign: 'center'}}> Contacto </Text></View>
              </TouchableOpacity>
            </View>
            
          </View>
          
          <View style={[styles.row, { flex:1, backgroundColor: 'trasnparent', justifyContent: 'center'}]}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
              <View style={{flexDirection: 'column', width: '33%', marginRight: 27, height: 2, alignSelf: 'center', backgroundColor:'#bdc3c7'}}>
              </View>
              <View style={[styles.circulo, {}]}>
              </View>
              <View style={{flexDirection: 'column', width: '33%', marginLeft: 27, height: 2, alignSelf: 'center', backgroundColor:'#bdc3c7'}}>
              </View>
            </View>
          </View>
          
          <View style={[styles.row, { flex:18, backgroundColor: 'trasnparent'}]}>
          
            <View style={{ flex: 16, padding: 12 }}>
              <TouchableOpacity onPress={ () => Actions.VoucherContainer() }style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 15}}>
                <FontAwesome5 name="globe" size={iconSize} color="white" />
                <View style={{paddingTop: 6}}><Text style={{color: '#bdc3c7', fontSize: 20, fontWeight: '500', textAlign: 'center'}}>{`Vouchers\n e Itinerario`}</Text></View>
              </TouchableOpacity>
            </View>
            
            <View style={{ flex: 1, backgroundColor: 'trasnparent', justifyContent: 'flex-start', alignItems: 'center'}}>
              <View style={{ height: '50%', width: 2, marginTop: 27, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#bdc3c7' }}>
              </View>
            </View>
            
            <View style={{ flex: 16, padding: 12 }}>
              <TouchableOpacity onPress={ () => Actions.ClaimsContainer() } style={{justifyContent: 'center', alignItems: 'center', paddingRight: 15}}>
                <FontAwesome5 name="wpforms" size={iconSize} color="white" />
                <View style={{paddingTop: 6}}><Text style={{color: '#bdc3c7', fontSize: 20, fontWeight: '500', textAlign: 'center'}}>{`Formulario\n de Reclamos`}</Text></View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.row, { flex:3, backgroundColor: 'trasnparent', justifyContent:'center'}]}>
        </View>
        
        <View style={[styles.row, { paddingBottom: 25, flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'trasnparent' }]}>
        <Image
          source={{ uri: 'http://www.columbiaviajes.com.ar/img/columbia-logo.png' }}
          style={{ resizeMode: 'contain', height: '90%',padding: 30, marginLeft: 30, width: '60%'}}
        />
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
  circulo: {
     width: 7,
     height: 7,
     borderRadius: 10,
     backgroundColor: 'white'
  }
});


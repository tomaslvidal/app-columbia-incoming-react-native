import React, { Component } from 'react';

import { Text, View, StyleSheet, Image, ImageBackground, TouchableOpacity, Linking } from 'react-native';

import FooterComponent from 'ColumbiaIncoming/components/FooterComponent';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core';

import { faStickyNote, faListAlt } from '@fortawesome/free-solid-svg-icons';

import { faWpforms, faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';

library.add(faStickyNote, faWpforms, faListAlt, faWhatsappSquare);

export default class HomeView extends Component {
    constructor(props){
        super(props);

        this.state = {
            config: {
                icon: {
                    size: 50,
                    color: '#1B76BC'
                }
            },
            number_wpp: '54 9 11 5482 8853'
        }
    }

    render() {
        return (
            <View style={{flex:1, flexDirection: 'row'}}>
                <ImageBackground source={require('ColumbiaIncoming/img/earth.jpg')} style={{flex: 1, opacity: 1}}>
                    <View style={[styles.container, {}]}>
                        <View style={[styles.row, {flex: 1, backgroundColor: 'transparent'}]}>
                            <View style={{flex: 2, justifyContent: 'flex-end', padding: 12}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Surveys') } style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <View style={styles.viewIcon}>
                                        <FontAwesomeIcon size={this.state.config.icon.size} color={this.state.config.icon.color} icon={['fas', 'sticky-note']} />

                                        <View style={{paddingTop: 6}}>
                                            <Text style={styles.text}>
                                                {`Quality Survey`}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={{justifyContent: 'flex-end', alignItems: 'center'}}>
                                <View style={[styles.lineVertical, {marginBottom: 12}]}>
                                </View>
                            </View>
                            
                            <View style={{flex: 2, justifyContent: 'flex-end', padding: 12}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Tours') } style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={styles.viewIcon}>
                                        <FontAwesomeIcon size={this.state.config.icon.size} color={this.state.config.icon.color} icon={['fas', 'list-alt']} />

                                        <View style={{paddingTop: 6}}>
                                            <Text style={styles.text}>
                                                {`Optional tours`}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                        <View style={[styles.row, {justifyContent: 'center'}]}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <View style={[styles.lineHorizontal, styles.leftRight]}>

                                </View>

                                <View style={[styles.circulo, styles.leftRight, styles.topBottom]}>

                                </View>

                                <View style={[styles.lineHorizontal, styles.leftRight]}>

                                </View>
                            </View>
                        </View>
                        
                        <View style={[styles.row, { flex:1, backgroundColor: 'transparent' }]}>
                            <View style={{ flex: 2, padding: 12 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Vouchers')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={styles.viewIcon}>
                                        <FontAwesomeIcon size={this.state.config.icon.size} color={this.state.config.icon.color} icon={['fas', 'list-alt']} />

                                        <View style={{paddingTop: 6}}>
                                            <Text style={styles.text}>
                                                {`Vouchers\n and itinerary`}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={{ backgroundColor: 'transparent', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={[styles.lineVertical, {marginTop: 12}]}>

                                </View>
                            </View>
                            
                            <View style={{flex: 2, padding: 12 }}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('DestinationList')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <View style={styles.viewIcon}>
                                        <FontAwesomeIcon size={this.state.config.icon.size} color={this.state.config.icon.color} icon={['fab', 'wpforms']} />

                                        <View style={{paddingTop: 6}}>
                                            <Text style={styles.text}>
                                                {`Destination\n and Maps`}
                                            </Text>
                                        </View>
                                    </View>

                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{ paddingTop: 5, paddingBottom: 5, minWidth: '100%', justifyContent: 'center', borderRadius: 8, borderBottomLeftRadius: 0, borderBottomRightRadius: 0, flexDirection: 'row', alignSelf: 'center', alignItems: 'center', backgroundColor: '#2D2D2DE0' }}>
                            <FontAwesomeIcon 
                                size={this.state.config.icon.size-10} 
                                color="#25D366" 
                                icon={['fab', 'whatsapp-square']}
                                onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${this.state.number_wpp.replace(/ /g, '')}`)}
                            />

                            <Text 
                                style={{ marginLeft: 10, color: '#F7F7F7', fontSize: 16, textAlignVertical: 'center', fontWeight: '500' }}
                                onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${this.state.number_wpp.replace(/ /g, '')}`)}
                            >
                                +{this.state.number_wpp}
                            </Text>
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
        height: 3, 
        alignSelf: 'center', 
        backgroundColor:'#EAEAEA',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    leftRight:{
        marginLeft: 12,
        marginRight: 12
    },
    topBottom:{
        marginTop: 0,
        marginBottom: 0
    },
    viewIcon:{
        display: 'flex', 
        backgroundColor: '#2D2D2DE0',
        textAlign: 'center',
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        width: '90%',
        height: '90%'
    },
    lineVertical:{
        height: '89%',
        width: 3, 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'column', 
        backgroundColor: '#EAEAEA',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    circulo:{
        width: 7,
        height: 7,
        borderRadius: 10,
        backgroundColor: '#EAEAEA',
        shadowColor: "#000",
        shadowOffset: {
            width: 44,
            height: 55,
        },
        shadowOpacity: 2,
        shadowRadius: 44.84,
        elevation: 30,
    },
    text:{
        color: '#F7F7F7', 
        fontSize: 20, 
        fontWeight: '400', 
        textAlign: 'center'
    }
});
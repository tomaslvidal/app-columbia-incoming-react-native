import React, { Component } from 'react';

import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core';

import { faArrowCircleLeft} from '@fortawesome/free-solid-svg-icons';

library.add(faArrowCircleLeft);

import { withNavigation } from 'react-navigation';

class BackLeft extends Component{
    render(){
        return(
            <View style={styles.body}>
                <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.goBack()}>
                    <View>
                        <FontAwesomeIcon size={27} color={"#fff"} icon={['fas', 'arrow-circle-left']} />
                    </View>

                    <View>
                        <Text style={styles.textVolver}>Volver</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body:{
        height: 55,
        paddingLeft: 10,
        backgroundColor: '#48BBEC',
        display: 'flex',
        justifyContent: 'center'
    },
    container:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textVolver:{
        fontSize: 18, 
        fontWeight: '700', 
        color: 'white',
        marginLeft: 5
    }
});

export default withNavigation(BackLeft);
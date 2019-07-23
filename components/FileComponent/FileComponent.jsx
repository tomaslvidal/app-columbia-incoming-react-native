import React, { Component } from 'react';

import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core';

import { faDownload} from '@fortawesome/free-solid-svg-icons';
 
library.add(faDownload);

export default class FileComponent extends Component{
    constructor(props){
        super(props);
    }

    handlePress(item){
        Linking.openURL(item);
    }

    render(){
        return(
            <TouchableOpacity onPress={() => this.handlePress(this.props.url)} style={styles.icon}>
                <View style={(this.props.style!=undefined && this.props.style!="") ? [styles.body, this.props.style] : styles.body}>
                    <View>
                        <Text style={styles.name}>{this.props.name}</Text>
                    </View>
                
                    <FontAwesomeIcon size={20} color={"#fff"} icon={['fas', 'download']} />
                </View>
            </TouchableOpacity>
        );
    }
}

const attributes = {
    color : '#FFFFFF'
};

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: '#404447',
        padding: 10,
    },
    name: {
        color: 'white',
        fontSize: 16
    },
    icon: {

    }
});
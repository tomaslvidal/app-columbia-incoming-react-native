import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native';

import Image from 'react-native-image-progress';

import Progress from 'react-native-progress/Bar';

export default class DestinationBox extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={[styles.boxDefault]}>
                <Image
                    indicatorProps={{
                        size: 100,
                        color: 'rgba(150, 150, 150, 1)',
                        unfilledColor: 'rgba(200, 200, 200, 0.2)'
                    }}
                    indicator={Progress}
                    source={{uri: this.props.item.image}}
                    style={{
                        width: '100%', 
                        height: '100%', 
                    }}
                >
                    <View style={{flex: 1}}>
                        <Text style={[styles.text]}>
                            {this.props.item.title}
                        </Text>
                    </View>
                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    boxDefault:{
        height: 175,
        paddingBottom: 5
    },
    imageBackground:{
        height: '100%',
        width: '100%',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    text:{
        fontSize: 33,
        paddingTop: 18,
        paddingLeft: 20,
        color: '#FFF', 
        paddingBottom: 18,
        textShadowColor: "#000", 
        textShadowRadius: 23, 
        textShadowOffset: {height: 2, width: 1}
    }
});
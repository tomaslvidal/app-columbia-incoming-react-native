import { StyleSheet, Text, View, Image, TouchableHighlight, Animated } from 'react-native';

import React, { Component, Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core';

import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

library.add(faCaretDown, faCaretUp);

export default class PanelComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            title : props.title,
            expanded : false,
            animation : new Animated.Value(46.85714340209961)
        };
    }

    toggle(){
        let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight;

        let finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded : !this.state.expanded
        }, () => {
            this.state.animation.setValue(initialValue);

            Animated.spring(
                this.state.animation,
                {
                    toValue: finalValue + (this.state.expanded ? 42 : 0)
                }
            ).start();
        });

    }

    _setMaxHeight(event){
        this.setState({
            maxHeight: event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight: event.nativeEvent.layout.height
        });
    }

    render(){
        return(
            <Fragment>
                <Animated.View style={[styles.container, { height: this.state.animation }]}>
                    <TouchableHighlight onPress={(e) => this.toggle(e)} underlayColor="#f1f1f1">
                        <View ref="viewMinHeight" style={styles.titleContainer} onLayout={(e) => this._setMinHeight(e)}>
                            <Text style={styles.title}>{this.state.title}</Text>

                                <FontAwesomeIcon size={27} color="#009EE0" icon={['fas', this.state.expanded ? 'caret-up' : 'caret-down']} />
                        </View>
                    </TouchableHighlight>

                    <View style={styles.body} >
                        <View style={styles.parent} >
                            <View onLayout={e => this._setMaxHeight(e)}>
                                {this.props.children}
                            </View>
                        </View>
                    </View>
                </Animated.View>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#f8f8f8',
        marginTop: 5,
        marginBottom: 15,
        overflow: 'hidden',
        borderColor: '#e9e9e9e1',
        borderWidth: 1
    },
    titleContainer:{
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        minHeight: 40
    },
    title:{
        flex: 1,
        color: '#2a2f43',
        fontSize: 16,
        fontWeight: 'bold',
    },
    body: {
        padding: 8,
        paddingTop: 0,
    },
    parent: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 3,
        borderColor: '#e9e9e9e1',
        borderWidth: 1,
    }
});
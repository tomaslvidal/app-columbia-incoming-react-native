import React, { Component } from 'react';

import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Linking } from 'react-native';

import HTML from 'react-native-render-html';

import Image from 'react-native-image-progress';

import Progress from 'react-native-progress/Bar';

import BackLeft from 'ColumbiaIncoming/components/BackLeftComponent';

import Footer from 'ColumbiaIncoming/components/FooterComponent';

import Div from 'ColumbiaIncoming/layouts/default';

const COORDINATES = {};

export default class ItemContainer extends Component{
    constructor(props){
        super(props);

        this.state = {};

        this.scrollView = this.scrollView.bind(this);

        this.onLinkPress = this.onLinkPress.bind(this);
    }

    scrollView(e){
        this.div.scroll_view.scrollTo({ x: 0, y: COORDINATES[e]-80 });
    }

    onLinkPress(href){
        Linking.openURL(href);
    }

    componentWillMount(){
        console.log("items: ", this.props.item.image);
    }

    render() {
        return (
            <View>
                <View style={{ marginLeft: -20, marginRight: -20 }}>
                    <Image indicatorProps={{
                        size: 80,
                        key: this.props.item.image,
                        borderWidth: 0,
                        color: 'rgba(150, 150, 150, 1)',
                        unfilledColor: 'rgba(200, 200, 200, 0.2)'
                    }} indicator={Progress} source={{uri: this.props.item.image}} style={[styles.footerImage]} />
                </View>

                <View style={styles.box}>
                    <Text style={styles.textTitle}>{this.props.item.title}</Text>

                    <HTML 
                        html={typeof this.props.item.description.es !== "undefined" ? this.props.item.description.es : ''} 
                        alterChildren = { node => {
                            if(node.name === 'p'){
                                if(typeof node.attribs['style'] !== "undefined"){
                                    let arrayProperties = node.attribs['style'].split(';').map(item => item.trim());

                                    if(arrayProperties.length>0){
                                        ['start', 'end'].forEach(value => {
                                            let find_index = arrayProperties.findIndex(item => typeof item !== 'undefined' ? (item.indexOf(value) != -1 && item.indexOf('text-align') != -1) : false);

                                            if(find_index != -1){
                                                delete arrayProperties[find_index];
                                            }
                                        });

                                        node.attribs['style'] = arrayProperties.join(';');
                                    }
                                }
                            }

                            return node.children;
                        }}
                        renderers = {{
                            img: (parameters) => {
                                let key = Math.random().toString(36).substr(2, 8);
                                
                                return(
                                    <Image 
                                        source={{ uri: parameters.src }}
                                        key={key+'-'+parameters.src}
                                        style={{
                                            width: ((parameters) => {
                                                if(typeof parameters.width !== "undefined"){
                                                    return !isNaN(Number(parameters.width)) ? Number(parameters.width) : '100%';
                                                }

                                                if(typeof parameters.style !== "undefined"){
                                                    let array = parameters.style.split(';');

                                                    array = array.map(item => item.trim());

                                                    array = array.filter(item => item.indexOf('width')!=-1);

                                                    if(array.length>0){
                                                        array = array[0].split('width:');

                                                        array = array.map(item => item.trim());

                                                        return !isNaN(Number(array[1].slice(0, -2))) ? Number(array[1].slice(0, -2)) : '100%';
                                                    }
                                                }

                                                return '100%';
                                            })(parameters),
                                            height: ((parameters) => {
                                                if(typeof parameters.height !== "undefined"){
                                                    return !isNaN(Number(parameters.height)) ? Number(parameters.height) : 180;
                                                }

                                                if(typeof parameters.style !== "undefined"){
                                                    let array = parameters.style.split(';');

                                                    array = array.map(item => item.trim());

                                                    array = array.filter(item => item.indexOf('height')!=-1);

                                                    if(array.length>0){
                                                        array = array[0].split('height:');

                                                        array = array.map(item => item.trim());

                                                        return !isNaN(Number(array[1].slice(0, -2))) ? Number(array[1].slice(0, -2)) : 180;
                                                    }
                                                }

                                                return 180
                                            })(parameters),
                                        }
                                    }/>
                                );
                            },
                            a: (parameters, two, three, four) => {
                                let key = Math.random().toString(36).substr(2, 5);

                                if(typeof parameters.href !== "undefined"){
                                    if(parameters.href == "#"){
                                        if(typeof parameters.id !== "undefined"){
                                            if(parameters.id.length != 0){
                                                    return(
                                                        <View key={key} ref={ (ref) => this[parameters.id] = ref } onLayout={ ({nativeEvent}) => {
                                                            if(this[parameters.id]) {
                                                                this[parameters.id].measure((x, y, width, height, pageX, pageY) => {
                                                                    COORDINATES[parameters.id] = pageY;
                                                                });
                                                            }
                                                        }}>
                                                            <Text >
                                                                {two[0]}
                                                            </Text>
                                                        </View>
                                                    );
                                            }
                                        }
                                    }
                                    else if(parameters.href.indexOf('#') === 0){
                                        return(
                                            <TouchableOpacity key={key} onPress={() => { this.scrollView(parameters.href.slice(1)) } }>
                                                <Text>{two[0]}</Text>
                                            </TouchableOpacity>
                                        );
                                    }
                                    else{
                                        return(
                                            <TouchableOpacity key={key} onPress={() => { this.onLinkPress(parameters.href) } }>
                                                {two}
                                            </TouchableOpacity>
                                        );
                                    }
                                }

                                return(two);
                            }
                        }}
                        />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textTitle: {
        fontSize: 30,
        fontWeight: '500',
        marginBottom: 8
    },
    footerImage: {
        paddingTop: 10,
        marginTop: 'auto',
        marginBottom:'auto',
        height: 130,
        width: '100%',
        marginTop: -27
    },
    box: {
        backgroundColor: '#f5fcff',
        marginLeft: -15,
        marginRight: -15,
        padding: 8,
        marginBottom: 10
    }
});
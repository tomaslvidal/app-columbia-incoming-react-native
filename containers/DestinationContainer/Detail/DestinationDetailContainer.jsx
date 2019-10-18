import React, { Component } from 'react';

import { connect } from 'react-redux';

import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Linking } from 'react-native';

import HTML from 'react-native-render-html';

import Image from 'react-native-image-progress';

import Progress from 'react-native-progress/Bar';

import Div from '../../../layouts/default';

import { withNavigation } from 'react-navigation';

import { updateDestination } from "ColumbiaIncoming/actions";

import axios from 'axios';

const COORDINATES = {};

class DestinationDetail extends Component {
    constructor(props){
        super(props);

        this.state = { 
            item: this.props.destinations[this.props.navigation.state.params.key],
            maxWidth: 0,
            config: {
                map_static: {
                    size: '195',
                    zoom: 15,
                    language: 'es-419',
                    marker: {
                        label: '',
                        size: 'mid',
                        color: '0xff0000'
                    }
                },
                google: {
                    key: 'AIzaSyCnQU5LBRcxeVdmmOdGGZ7a_paVz7wGy1E'
                }
            }
        };

        this._setMaxHeight = this._setMaxHeight.bind(this);

        this.scrollView = this.scrollView.bind(this);

        this.onLinkPress = this.onLinkPress.bind(this);

        this.generateLink = this.generateLink.bind(this);

        this.onRefresh = this.onRefresh.bind(this);
    }

    onRefresh(){
        this.setState({
            is_refreshing: true
        }, () => {
            axios.get(`http://www.columbiaviajes.com/admin/services/api_destinosMapas.php?id=${this.state.item.id}`)
            .then(res => {
                this.props.updateDestination({
                    key: this.props.navigation.state.params.key,
                    data: res.data
                })
                .then(() => {
                    this.setState({
                        is_refreshing: false,
                        item: this.props.destinations[this.props.navigation.state.params.key]
                    });
                });
            });
        });
    }

    _setMaxHeight(e){
        this.setState({
            maxWidth: e.nativeEvent.layout.width
        });
    }

    scrollView(e){
        this.div.scroll_view.scrollTo({ x: 0, y: COORDINATES[e]-80});
    }

    onLinkPress(href){
        Linking.openURL(href);
    }

    generateLink(){
        return `https://maps.googleapis.com/maps/api/staticmap?center=${this.state.item.position.lat}+${this.state.item.position.lng}&zoom=${this.state.config.map_static.zoom}&language=${this.state.config.map_static.language}&size=${parseInt(this.state.maxWidth-25)}x${this.state.config.map_static.size-10}&maptype=roadmap&key=${this.state.config.google.key}&markers=size:${this.state.config.map_static.marker.size}%7Ccolor:${this.state.config.map_static.marker.color}%7Clabel:${this.state.config.map_static.marker.label}%7C${this.state.item.position.lat}+${this.state.item.position.lng}`;
    }

    render() {
        return (
        <Div 
        onRefresh={this.onRefresh} 
        is_refreshing={this.state.is_refreshing} 
        ref={(ref) => this.div = ref} 
        name="Formulario de Reclamos" 
        icon="wpforms">
            <View onLayout={(e) => this._setMaxHeight(e)}>
                <View style={{ marginLeft: -20, marginRight: -20 }}>
                    <Image 
                        indicatorProps={{
                            size: 80,
                            key: this.state.item.image,
                            borderWidth: 0,
                            color: 'rgba(150, 150, 150, 1)',
                            unfilledColor: 'rgba(200, 200, 200, 0.2)'
                        }}
                        indicator={Progress}
                        resizeMethod="resize"
                        source={{ uri: this.state.item.image }}
                        style={[styles.footerImage]}
                    />
                </View>

                <View style={styles.box}>
                    {
                        this.maxWidth !== 0 ?
                        <Image
                            source={{ uri: this.generateLink() }}
                            style={{
                                height: 195,
                                width: '100%',
                                marginBottom: 10
                            }}
                            indicatorProps={{
                                size: 80,
                                key: 'asd',
                                borderWidth: 0,
                                color: 'rgba(150, 150, 150, 1)',
                                unfilledColor: 'rgba(200, 200, 200, 0.2)'
                            }}
                            indicator={Progress}
                        />
                        : null
                    }

                    <Text style={styles.textTitle}>{this.state.item.title}</Text>

                    <HTML 
                        imagesMaxWidth={ this.state.maxWidth ? this.state.maxWidth : null } 
                        staticContentMaxWidth={ this.state.maxWidth ? this.state.maxWidth : null }
                        html={ typeof this.state.item.description !== 'undefined' ? this.state.item.description.es : '<div></div>' }
                        tagsStyles={ tagsStyles }
                        alterChildren = { node => {
                                if(node.name === 'p'){
                                    if(typeof node.attribs['style'] != "undefined"){
                                        let arrayProperties = node.attribs['style'].split(';').map(item => item.trim());

                                        if(arrayProperties.length>0){
                                            ['start', 'end'].forEach(value => {
                                                let find_index = arrayProperties.findIndex(item => typeof item !== 'undefined' ? (item.indexOf(value) !== -1 && item.indexOf('text-align') != -1) : false);

                                                if(find_index != -1){
                                                    delete arrayProperties[find_index];
                                                }
                                            });

                                            node.attribs['style'] = arrayProperties.join(';');
                                        }
                                    }
                                }

                                return node.children;
                            }
                        }
                        renderers = {{
                            img: parameters => {
                                let key = Math.random().toString(36).substr(2, 8);

                                return(
                                    <Image 
                                        source={{ uri: parameters.src.replace('https', 'http') }}
                                        indicator={ Progress }
                                        resizeMethod="resize"
                                        indicatorProps={{
                                            size: 80,
                                            borderWidth: 0,
                                            color: 'rgba(150, 150, 150, 1)',
                                            unfilledColor: 'rgba(200, 200, 200, 0.2)'
                                        }}
                                        key={key+'-'+parameters.src}
                                        style={{
                                            width: (parameters => {
                                                if(typeof parameters.width != "undefined"){
                                                    return !isNaN(Number(parameters.width)) ? Number(parameters.width) : '100%';
                                                }

                                                if(typeof parameters.style != "undefined"){
                                                    let array = parameters.style.split(';');

                                                    array = array.map(item => item.trim());

                                                    array = array.filter(item => item.indexOf('width') !== -1);

                                                    if(array.length>0){
                                                        array = array[0].split('width:');

                                                        array = array.map(item => item.trim());

                                                        return !isNaN(Number(array[1].slice(0, -2))) ? Number(array[1].slice(0, -2)) : '100%';
                                                    }
                                                }

                                                return '100%';
                                            })(parameters),
                                            height: (parameters => {
                                                if(typeof parameters.height != "undefined"){
                                                    return !isNaN(Number(parameters.height)) ? Number(parameters.height) : 180;
                                                }

                                                if(typeof parameters.style != "undefined"){
                                                    let array = parameters.style.split(';');

                                                    array = array.map(item => item.trim());

                                                    array = array.filter(item => item.indexOf('height') !== -1);

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

                                if(typeof parameters.href != "undefined"){
                                    if(parameters.href == "#"){
                                        if(typeof parameters.id != "undefined"){
                                            if(parameters.id.length != 0){
                                                    return(
                                                        <View key={key} ref={ ref => this[parameters.id] = ref } onLayout={ ({nativeEvent}) => {
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
                                                <Text>{two}</Text>
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
        </Div>
        );
    }
}

const tagsStyles = {
    img: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'space-between'
    }
};

const styles = StyleSheet.create({
    textTitle: {
        fontSize: 30,
        fontWeight: '500',
        marginBottom: 8
    },
    footerImage: {
        flex: 1,
        alignSelf: 'center',
        justifyContent:'center',
        paddingTop: 10,
        marginTop: 'auto',
        marginBottom:'auto',
        height: 200,
        width: '100%',
        marginTop: -27
    },
    box: {
        backgroundColor: 'white',
        marginTop: 6,
        padding: 5
    }
});

const mapStateToProps = state => ({
    destinations: state.destinations.items
});

export default connect(mapStateToProps, { updateDestination })(withNavigation(DestinationDetail));
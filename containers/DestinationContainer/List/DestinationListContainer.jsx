import React, { Component } from 'react';

import { View, FlatList, TouchableOpacity, StyleSheet, Linking } from 'react-native';

import DestinationBox from '../../../components/DestinationBoxComponent'

import Div from '../../../layouts/default';

import axios from 'axios';

class DestinationList extends Component {
    constructor(props){
        super(props);

        this.state = {
            items: [],
            loading: true
        };
    }

    componentDidMount(){
        axios.get('http://www.columbiaviajes.com/admin/services/api_destinosMapas.php')
        .then(res => {
            this.setState({
                items: res.data,
                loading: false
            });
        });
    }

    handlePress(item){
        if(typeof item.url=== 'undefined'){
            this.props.navigation.navigate('DestinationDetail', { item: item });
        }
        else{
            Linking.openURL(item.url)
        }
    }

    render() {
        return (
            <Div name="Destinos" icon="wpforms" loading={this.state.loading}>
                <FlatList
                    data={this.state.items}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={ ({item}) => (
                        <TouchableOpacity onPress={ () => this.handlePress(item) }>
                            <DestinationBox item={item}/>
                        </TouchableOpacity>
                    )}
                />
            </Div>
        );
    }
}

const styles = StyleSheet.create({

});

export default DestinationList;
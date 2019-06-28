import React, { Component } from 'react';

import { View, ListView, TouchableOpacity, StyleSheet, Linking } from 'react-native';

import DestinationBox from '../../../components/DestinationBoxComponent'

import Div from '../../../layouts/default';

import axios from 'axios';

class DestinationList extends Component {
    constructor(props){
        super(props);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds,
            items: [],
            loading: true
        };
    }

    updateDataSource(data){
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data)
        })
    }

    componentDidMount(){
        axios.get('http://www.columbiaviajes.com/admin/services/api_destinosMapas.php')
        .then(res => {
            this.setState({
                items: res.data,
                loading: false
            }, () => {
                this.updateDataSource(this.state.items);
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
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={ item => {
                        return(
                            <TouchableOpacity onPress={ () => this.handlePress(item) }>
                                <DestinationBox item={item}/>
                            </TouchableOpacity>
                        );
                    }}
                />
            </Div>
        );
    }
}

const styles = StyleSheet.create({

});

export default DestinationList;
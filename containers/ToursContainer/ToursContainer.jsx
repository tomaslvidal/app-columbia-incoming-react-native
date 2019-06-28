import React, { Component } from 'react';

import { View, Text, StyleSheet, ListView } from 'react-native';

import Div from 'ColumbiaIncoming/layouts/default';

import Panel from 'ColumbiaIncoming/components/PanelComponent';

import ItemContainer from './ItemContainer';

import axios from 'axios';

export default class ToursContainer extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSource: ds,
            items: [],
            loading: true
        }
    }

    updateDataSource(data){
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(data)
        });
    }

    componentWillMount(){
        axios({
            url: 'http://www.columbiaviajes.com/admin/services/api_tour.php',
            method: 'POST',
            data: {
                id: null
            }
        })
        .then(res => {
            console.log("x: ", res);
            this.setState({
                items: res.data,
                loading: false
            });
        })
        .catch(e => {
            throw e;

            console.log(e);
        })
    }

    render(){
        return (
            <Div name="Tours" container={false} loading={this.state.loading}>
                {
                this.state.items.map((item, index) => {
                    return(
                        <Panel key={index} title={item.title}>
                            <ItemContainer key={index} item={item} />
                        </Panel>
                    );
                })
                }
            </Div>
        );
    }
}

const styles = StyleSheet.create({
    
})
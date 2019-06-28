import React, {Component} from 'react';

import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Div from 'ColumbiaIncoming/layouts/default';

import axios from 'axios';

import FileComponent from 'ColumbiaIncoming/components/FileComponent';

export default class VoucherContainer extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            items: [],
            loading: true
        };
    }

    componentWillMount(){
        axios({
            url: 'http://www.columbiaviajes.com/admin/services/api_voucherItinerario.php',
            method: 'POST',
            data: {
                id: null
            }
        })
        .then(res => {
            this.setState({
                items: res.data,
                loading: false
            })
        })
        .catch(e => {
            throw e;

            console.log(e);
        });
    }

    render(){
        return(
            <Div name="Voucher e Initerarios" icon='bar-chart' loading={this.state.loading}>
                {
                    this.state.items.map((item, key) => {
                        return <FileComponent key={key} name={item.title} url={item.image} style={styles.fileComponent} />
                    })
                }
            </Div>
        )
    }
}

const styles = StyleSheet.create({
    texts: {
        color: 'white'
    },
    fileComponent: {
        marginTop: 6,
        marginBottom: 6
    }
});
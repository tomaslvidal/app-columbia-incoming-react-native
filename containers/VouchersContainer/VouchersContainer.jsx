import { connect } from 'react-redux';

import React, {Component} from 'react';

import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Div from 'ColumbiaIncoming/layouts/default';

import axios from 'axios';

import FileComponent from 'ColumbiaIncoming/components/FileComponent';

class VoucherContainer extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            items: [],
            loading: true
        };
    }

    componentDidMount(){
        axios({
            url: 'http://www.columbiaviajes.com/admin/services/api_voucherItinerario.php',
            method: 'GET',
            params: {
                id: this.props.account.id
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
                        return <FileComponent key={key} name={item.title} url={item.url} style={styles.fileComponent} />
                    })
                }
            </Div>
        )
    }
}

const mapStateToProps = state => {
    return {
        account: state.account.info.data
    };
};

const styles = StyleSheet.create({
    texts: {
        color: 'white'
    },
    fileComponent: {
        marginTop: 6,
        marginBottom: 6
    }
});

export default connect(mapStateToProps)(VoucherContainer);

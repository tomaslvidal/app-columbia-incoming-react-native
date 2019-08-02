import { connect } from 'react-redux';

import React, { Component } from 'react';

import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Div from 'ColumbiaIncoming/layouts/default';

import axios from 'axios';

import FileComponent from 'ColumbiaIncoming/components/FileComponent';

import { setVouchers } from 'ColumbiaIncoming/actions';

class VoucherContainer extends Component {
    constructor(props){
        super(props);

        this.state = {
            is_refreshing: false
        };

        this.onRefresh = this.onRefresh.bind(this);
    }

    onRefresh(){
        this.setState({
            is_refreshing: true
        }, () => {
            axios.get('http://www.columbiaviajes.com/admin/services/api_voucherItinerario.php', {
                params: {
                    id: this.props.account.id
                }
            })
            .then(res => {
                this.props.setVouchers({
                    items: res.data
                })
                .then(() => {
                    this.setState({
                        is_refreshing: false,
                    });
                });
            });
        });
    }

    componentDidMount(){
        if(this.props.vouchers.items.length === 0){
            axios({
                url: 'http://www.columbiaviajes.com/admin/services/api_voucherItinerario.php',
                method: 'GET',
                params: {
                    id: this.props.account.id
                }
            })
            .then(res => {
                this.props.setVouchers({
                    items: res.data,
                    loading: false
                });
            })
            .catch(e => {
                console.log(e);
            });
        }
    }

    render(){
        return(
            <Div is_refreshing={this.state.is_refreshing} onRefresh={this.onRefresh} name="Voucher e Initerarios" icon='bar-chart' loading={this.props.vouchers.loading}>
                {
                    this.props.vouchers.items.map((item, key) => {
                        return <FileComponent key={key} name={item.title} url={item.url} style={styles.fileComponent} />
                    })
                }
            </Div>
        );
    }
}

const mapStateToProps = state => {
    return {
        account: state.account.info.data,
        vouchers: state.vouchers
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

export default connect(mapStateToProps, { setVouchers })(VoucherContainer);

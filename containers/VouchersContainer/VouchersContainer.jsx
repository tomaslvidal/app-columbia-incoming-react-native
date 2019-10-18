import { connect } from 'react-redux';

import React, { Component } from 'react';

import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Div from 'ColumbiaIncoming/layouts/default';

import axios from 'axios';

import FileComponent from 'ColumbiaIncoming/components/FileComponent';

import { setVouchers } from 'ColumbiaIncoming/actions';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core';

import { faPlaneDeparture, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faPlaneDeparture, faTimes);

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
                    items: [],
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
                    this.props.vouchers.items.length > 0 ?
                        this.props.vouchers.items.map((item, key) => {
                            return(
                                <FileComponent 
                                    key={key} 
                                    name={item.title} 
                                    url={item.url} 
                                    style={styles.fileComponent} 
                                />
                            )
                        })
                    :
                        (
                            <View style={{ alignItems: 'center' }}>
                                <FontAwesomeIcon 
                                    size={37} 
                                    color={"#10db7a"} 
                                    icon={['fas', 'plane-departure']}
                                />

                                <FontAwesomeIcon 
                                    size={25}
                                    style={{ top: -30 }}
                                    color={"#575958"} 
                                    icon={['fas', 'times']}
                                />

                                <Text style={{ fontSize: 16, textAlign: 'center', marginTop: -17 }}>
                                    You don't have vouchers, please contact with administration.
                                </Text>
                            </View>
                        )
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

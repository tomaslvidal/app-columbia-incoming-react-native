import React, {Component} from 'react';

import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import Div from 'ColumbiaIncoming/layouts/default';

import axios from 'axios';

import FileComponent from 'ColumbiaIncoming/components/FileComponent';

export default class VoucherContainer extends Component {
    constructor(props){
        super(props);
        
        this.state = {
        };
    }

    componentWillMount(){
        axios({
            url: '',
            method: 'POST',
            data: {
                id: null
            }
        })
        .then(res => {

        })
        .catch(res => {

        });
    }

    render(){
        return(
            <Div name="Voucher e Initerarios" icon='bar-chart'>
                {
                    function(){
                        let contentFiles = [];

                        for(i = 0; i < 5; i++){
                            contentFiles.push(<FileComponent name="Test" style={styles.fileComponent} />);
                        }

                        return contentFiles;
                    }()
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
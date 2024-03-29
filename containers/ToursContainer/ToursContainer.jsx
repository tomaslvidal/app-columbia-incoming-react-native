import React, { Component } from 'react';

import { connect } from 'react-redux';

import { View, Text, StyleSheet } from 'react-native';

import Div from 'ColumbiaIncoming/layouts/default';

import Panel from 'ColumbiaIncoming/components/PanelComponent';

import ItemContainer from './ItemContainer';

import { withNavigation } from 'react-navigation';

import { setTours } from "ColumbiaIncoming/actions";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core';

import { faPlaneDeparture, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faPlaneDeparture, faTimes);

import axios from 'axios';

class ToursContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_refreshing: false
        };

        this.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount(){
        if(this.props.tours.items.length === 0){
            axios({
                url: 'http://www.columbiaviajes.com/admin/services/api_tour.php',
                method: 'POST',
                data: {
                    id: null
                }
            })
            .then(res => {
                this.props.setTours({
                    items: res.data,
                    loading: false
                });
            })
            .catch(e => {
                console.log(e);
            });
        }
    }

    onRefresh(){
        this.setState({
            is_refreshing: true
        }, () => {
            axios.get('http://www.columbiaviajes.com/admin/services/api_tour.php')
            .then(res => {
                this.props.setTours({
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

    render(){
        return (
            <Div name="Tours" container={false} loading={this.props.tours.loading} onRefresh={this.onRefresh} is_refreshing={this.state.is_refreshing}>
            {
                this.props.tours.items.length > 0 ?
                    this.props.tours.items.map((item, index) => {
                        return(
                            <Panel key={index} title={item.title}>
                                <ItemContainer key={index} item={item} />
                            </Panel>
                        );
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
                                No tours found.
                            </Text>
                        </View>
                    )
            }
            </Div>
        );
    }
}

const styles = StyleSheet.create({
    
})

const mapStateToProps = state => ({
    tours: state.tours
});

export default connect(mapStateToProps, { setTours })(withNavigation(ToursContainer));
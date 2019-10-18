import React, { Component } from 'react';

import { connect } from 'react-redux';

import { View, FlatList, TouchableOpacity, StyleSheet, Linking, RefreshControl, ActivityIndicator, Text } from 'react-native';

import DestinationBox from 'ColumbiaIncoming/components/DestinationBoxComponent'

import Div from 'ColumbiaIncoming/layouts/default';

import { setDestinations } from "ColumbiaIncoming/actions";

import { withNavigation } from 'react-navigation';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core';

import { faPlaneDeparture, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add(faPlaneDeparture, faTimes);

import axios from 'axios';

class DestinationList extends Component {
    constructor(props){
        super(props);

        this.handlePress = this.handlePress.bind(this);

        this.fetchDestinations = this.fetchDestinations.bind(this);

        // this.renderFooter = this.renderFooter.bind(this);

        // this.handleLoadMore = this.handleLoadMore.bind(this);

        this.onRefresh = this.onRefresh.bind(this);
    }

    fetchDestinations(){
        axios.get('http://www.columbiaviajes.com/admin/services/api_destinosMapas.php')
        .then(res => {
            this.props.setDestinations({
                items: res.data,
                pending: false,
                loading: false,
                is_refreshing: false,
                empty: res.data.length === 0 ? true : false
            });
        });
    }

    componentDidMount(){
        if(this.props.destinations.items.length === 0){
            this.fetchDestinations();
        }
    }

    handlePress(item){
        if(typeof item.url === 'undefined'){
            this.props.navigation.navigate('DestinationDetail', item);
        }
        else{
            Linking.openURL(item.url)
        }
    }

    // renderFooter(){
    //     return(
    //         !this.props.destinations.empty ?
    //             <View style={{ marginTop: 5, width: '100%', justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>
    //                 <ActivityIndicator size="large" color="#2b8fd6"/>
    //             </View>
    //         : null
    //     );
    // }

    // handleLoadMore(){
    //     if(!this.props.destinations.empty && !this.props.destinations.pending){
    //         this.props.setDestinations({
    //             pending: true
    //         })
    //         .then(() => {
    //             this.fetchDestinations();
    //         });
    //     }
    // }

    onRefresh(){
        this.props.setDestinations({
            is_refreshing: true,
            pending: true,
            empty: false
        })
        .then(() => {
            this.fetchDestinations();
        })
    }

    render() {
        const renderItem = ({item, index}) => (
            <TouchableOpacity onPress={() => this.handlePress({ key: index })}>
                <DestinationBox item={item}/>
            </TouchableOpacity>
        );

        return (
            <Div name="Destinos" icon="wpforms" loading={this.props.destinations.loading} state_scroll_view={false}>
                {
                    this.props.destinations.items.length > 0 ?
                        <FlatList
                            data={this.props.destinations.items}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.props.destinations.is_refreshing}
                                    onRefresh={this.onRefresh}
                                />
                            }
                            // ListFooterComponent={this.renderFooter}
                            // onEndReached={this.handleLoadMore}
                        />
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
                                    No destinations found
                                </Text>
                            </View>
                        )
                }
            </Div>
        );
    }
}

const styles = StyleSheet.create({

});

const mapStateToProps = state => ({
    destinations: state.destinations
});

export default connect(mapStateToProps, { setDestinations })(withNavigation(DestinationList));
import React, { Component } from 'react';

import { Text, StatusBar, View, StyleSheet, Image, ImageBackground, TouchableOpacity, Linking, ScrollView, RefreshControl } from 'react-native';

import BackLeft from 'ColumbiaIncoming/components/BackLeftComponent';

import Footer from 'ColumbiaIncoming/components/FooterComponent';

import Preloader from 'ColumbiaIncoming/components/PreloaderComponent';

import PropTypes from 'prop-types';

class LayoutDefault extends Component {
    static propTypes = {
        state_scroll_view: PropTypes.bool,
    }

    static defaultProps = {
        state_scroll_view: true,
    }

    constructor(props){
        super(props);

        this.state={
            heightParent: "",
            loading: true
        };
    }

    componentDidMount(){
        this.setState({
            loading: false
        });
    }

    render(){
        const Fragment_ = this.props.state_scroll_view ? ScrollView : View;

        return(
            <View style={[{ flex: 1, flexDirection: 'column' }, {}]}>
                <StatusBar backgroundColor='#2CAEE6' barStyle='light-content' />
                {
                    typeof this.props.backleft !== 'undefined' && !this.props.backleft ? null :
                    <BackLeft name={this.props.name} icon={this.props.icon} />
                }
                <View 
                    style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
                    onLayout={ event => this.setState({ heightParent: event.nativeEvent.layout.height })}>
                {
                    (typeof this.props.loading !== 'undefined' ? this.props.loading : this.state.loading) ? (
                        <View style={{ display: 'flex', flex: 1 }}>
                            <Preloader />

                            <Footer />
                        </View>
                    ) :
                    (
                        <Fragment_ 
                            style={{ flex: 1}}
                            ref={ (scroll_view) => { this.scroll_view = scroll_view } }
                        >
                            <View style={[styles.childrenScrollView, { minHeight: this.state.heightParent > 0 ? this.state.heightParent : null }]}>
                                <View style={styles.container}>
                                    <View style={typeof this.props.container !== 'undefined' && !this.props.container ? styles.parentContainer : [styles.propParentContainer, styles.parentContainer]}>
                                    {
                                        this.props.children
                                    }
                                    </View>
                                </View>

                                {
                                    this.props.footer || typeof this.props.footer === 'undefined' ? <Footer/>
                                    : null
                                }
                            </View>
                        </Fragment_>
                    )
                }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    childrenScrollView:{
        display: 'flex',
    },
    container:{
        padding: 10,
        flex: 1
    },
    loading: {
        flex: 1
    },
    parentContainer: {
        display: 'flex',
        flex: 1,
    },
    propParentContainer:{
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 2,
        padding: 10
    }
});

export default LayoutDefault;
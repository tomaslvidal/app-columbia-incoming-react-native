import React from "react";

import { SafeAreaView } from 'react-native';

import { createRootNavigator } from "./router";

import { isSignedIn } from "./auth";

import { Provider } from 'react-redux';

import store from './store';

import { createAppContainer } from 'react-navigation';

console.disableYellowBox = true;

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
        };
    }

    componentDidMount(){
        isSignedIn()
        .then(res => {
            this.setState({ signedIn: res, checkedSignIn: true });
        })
    }

    render(){
        const { checkedSignIn, signedIn } = this.state;
        
        const AppNavigator = createRootNavigator(true);

        const AppContainer = createAppContainer(AppNavigator);

        if(!checkedSignIn) {
            return null;
        }

        return(
            <Provider store={store}>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#2CAEE6' }} forceInset={{ top: 'always', bottom:'always' }}>
                    <AppContainer />
                </SafeAreaView>
            </Provider>
        );
    }
}
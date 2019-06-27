import React from "react";

import { createRootNavigator } from "./router";

import { isSignedIn } from "./auth";

import { Provider } from 'react-redux';

import store from './store';

import { AsyncStorage } from "react-native";

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
        const { checkedSignIn, signedIn } = this.state, Layout = createRootNavigator(true);

        if(!checkedSignIn) {
            return null;
        }

        return(
            <Provider store={store}>
                <Layout />
            </Provider>
        );
    }
}
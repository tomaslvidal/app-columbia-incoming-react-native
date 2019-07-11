import React from "react";

import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";

import HomeContainer from './containers/HomeContainer';

import LoginContainer from "./containers/LoginContainer";

import SurveysContainer from './containers/SurveysContainer';

import ToursContainer from './containers/ToursContainer';

import DestinationListContainer from './containers/DestinationContainer/List';

import DestinationDetailContainer from './containers/DestinationContainer/Detail';

import VouchersContainer from './containers/VouchersContainer';

export const SignedOut = createStackNavigator(
    {
        SignIn: {
            screen: LoginContainer
        }
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export const SignedIn = createStackNavigator(
    {
        Home: {
            screen: HomeContainer
        },
        Surveys: {
            screen: SurveysContainer
        },
        Tours: {
            screen: ToursContainer
        },
        Vouchers: {
            screen: VouchersContainer
        },
        DestinationList: {
            screen: DestinationListContainer
        },
        DestinationDetail: {
            screen: DestinationDetailContainer
        },
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

export const createRootNavigator = (signedIn = false) => {
    return createSwitchNavigator(
        {
            SignedIn: {
                screen: SignedIn
            },
            SignedOut: {
                screen: SignedOut
            }
        },
        {
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    );
};
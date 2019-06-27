import * as types from '../constants/ActionTypes';

export const setLoggedIn = item => {
    

    return({
        type: types.SET_LOGUED_ACCOUNT,
        payload: item
    });
};
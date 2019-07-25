import * as types from 'ColumbiaIncoming/constants/ActionTypes';

export const setLoguedAccount = item => {
    return({
        type: types.SET_LOGUED_ACCOUNT,
        payload: item
    });
};
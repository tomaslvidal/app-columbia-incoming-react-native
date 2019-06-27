import { SET_LOGUED_ACCOUNT } from 'ColumbiaIncoming/constants/ActionTypes';

const initialState = {
    account: {
        logged_in: false
    }
};

const accountReducer = (state = initialState.account, action) => {
    switch (action.type) {
        case SET_LOGUED_ACCOUNT:
            return {
            ...state, 
            logged_in: action.payload
            };
        default:
            return state;
    }
};

export default accountReducer;
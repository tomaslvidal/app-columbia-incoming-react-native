import { SET_LOGUED_ACCOUNT } from 'ColumbiaIncoming/constants/ActionTypes';

const initialState = {
    account: {
        info: {}
    }
};

const accountReducer = (state = initialState.account, action) => {
    switch (action.type) {
        case SET_LOGUED_ACCOUNT:
            return {
            ...state, 
            info: action.payload
            };
        default:
            return state;
    }
};

export default accountReducer;
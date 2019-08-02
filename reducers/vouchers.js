import { SET_VOUCHERS } from '../constants/ActionTypes';

const initialState = {
    vouchers: {
        items: [],
        loading: true
    }
};

const vouchersReducer = (state = initialState.vouchers, action) => {
    switch(action.type){
        case SET_VOUCHERS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

export default vouchersReducer;
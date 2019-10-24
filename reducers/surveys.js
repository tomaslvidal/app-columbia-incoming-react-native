import { SET_SURVEYS, HIDDEN_SURVEYS } from '../constants/ActionTypes';

const initialState = {
    surveys: {
        items: [],
        loading: true,
        hiddens: {}
    }
};

const surveysReducer = (state = initialState.surveys, action) => {
    switch(action.type){
        case SET_SURVEYS:
            return {
                ...state,
                ...action.payload
            };
        case HIDDEN_SURVEYS:
            return {
                ...state,
                hidden: {
                    ...state.hidden,
                    ...action.payload
                }
            };
        default:
            return state;
    }
};

export default surveysReducer;
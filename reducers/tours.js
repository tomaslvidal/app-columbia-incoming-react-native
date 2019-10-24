import { SET_TOURS } from '../constants/ActionTypes';

const initialState = {
    tours: {
        items: [],
        loading: true
    }
};

const toursReducer = (state = initialState.tours, action) => {
    switch(action.type){
        case SET_TOURS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

export default toursReducer;
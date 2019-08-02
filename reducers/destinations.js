import { SET_DESTINATIONS, UPDATE_DESTINATION } from '../constants/ActionTypes';

const initialState = {
    destinations: {
        items: [],
        loading: true
    }
};

const destinationsReducer = (state = initialState.destinations, action) => {
    switch(action.type){
        case SET_DESTINATIONS:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_DESTINATION:
            return {
                ...state,
                items: state.items.map((item, index) => {
                    if(index === action.payload.key){
                        return({
                            ...item,
                            ...action.payload.data
                        });
                    }
                    else{
                        return item;
                    }
                })
            };
        default:
            return state;
    }
};

export default destinationsReducer;
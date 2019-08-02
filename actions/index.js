import * as types from 'ColumbiaIncoming/constants/ActionTypes';

const setLoguedAccount = item => async dispatch => {
    dispatch({
        type: types.SET_LOGUED_ACCOUNT,
        payload: item
    });
};

const setDestinations = item => async dispatch => {
    dispatch({
        type: types.SET_DESTINATIONS,
        payload: item
    });
};

const setSurveys = item => async dispatch => {
    dispatch({
        type: types.SET_SURVEYS,
        payload: item
    });
};

const setTours = item => async dispatch => {
    dispatch({
        type: types.SET_TOURS,
        payload: item
    });
};

const updateDestination = item => async dispatch => {
    dispatch({
        type: types.UPDATE_DESTINATION,
        payload: {
            key: item.key,
            data: item.data
        }
    });
};

const hiddenSurveys = item => async dispatch => {
    dispatch({
        type: types.HIDDEN_SURVEYS,
        payload: item
    });
};

export { setLoguedAccount, setDestinations, updateDestination, hiddenSurveys, setSurveys, setTours };
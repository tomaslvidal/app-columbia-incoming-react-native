import { combineReducers } from 'redux';

import accountReducer from './account';

import destinationsReducer from './destinations';

import surveysReducer from './surveys';

import toursReducer from './tours';

export default combineReducers({
    account: accountReducer,
    destinations: destinationsReducer,
    surveys: surveysReducer,
    tours: toursReducer
});
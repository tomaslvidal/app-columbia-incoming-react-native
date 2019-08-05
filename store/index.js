import { createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';

import thunk from 'redux-thunk';

import reducer from 'ColumbiaIncoming/reducers';

const store = createStore(
    reducer,
    {},
    applyMiddleware(thunk),
    // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(logger, thunk))
);

export default store;
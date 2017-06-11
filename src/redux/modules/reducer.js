import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './User';
import files from './Files';

export default combineReducers({
    routing: routerReducer,
    user,
    files
});

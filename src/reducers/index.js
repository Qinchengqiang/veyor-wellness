import { combineReducers } from 'redux';

import auth from "./auth";
import fetchList from './fetchList';

export default combineReducers({
    auth,
    fetchList
});
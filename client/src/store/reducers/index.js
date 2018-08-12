import { combineReducers } from 'redux';
import authReducer from './authReducer';
import projectReducer from './Project';
import sourceReducer from './Source';

export default combineReducers({
  auth: authReducer,
  project: projectReducer,
  source: sourceReducer
});

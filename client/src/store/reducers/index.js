import { combineReducers } from 'redux';
import authReducer from './authReducer';
import projectReducer from './Project';

export default combineReducers({
  auth: authReducer,
  project: projectReducer
});

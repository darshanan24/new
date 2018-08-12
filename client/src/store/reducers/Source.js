import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  sourceID: null,
  sources: [],
  sourceData: null,
  loading: false,
  error: null,
  created: false
};

const SourceInit = (state, action) => {
  return updateObject(state, { created: false });
};

const createSourceStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const createSourceSuccess = (state, action) => {
  return updateObject(state, {
    sourceData: action.sourceData,
    loading: false,
    created: true
  });
};

const createSourceFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const fetchSourcesStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchSourcesSuccess = (state, action) => {
  return updateObject(state, {
    sources: action.sources,
    loading: false
  });
};

const fetchSourcesFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const setSourceID = (state, action) => {
  console.log('current SourceID reducer' + action.sourceID);
  return updateObject(state, { sourceID: action.sourceID });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SOURCE_INIT:
      return SourceInit(state, action);
    case actionTypes.CREATE_SOURCE_START:
      return createSourceStart(state, action);
    case actionTypes.CREATE_SOURCE_SUCCESS:
      return createSourceSuccess(state, action);
    case actionTypes.CREATE_SOURCE_FAIL:
      return createSourceFail(state, action);
    case actionTypes.FETCH_SOURCES_START:
      return fetchSourcesStart(state, action);
    case actionTypes.FETCH_SOURCES_SUCCESS:
      return fetchSourcesSuccess(state, action);
    case actionTypes.FETCH_SOURCES_FAIL:
      return fetchSourcesFail(state, action);
    case actionTypes.SET_SOURCE_ID:
      return setSourceID(state, action);
    default:
      return state;
  }
};

export default reducer;

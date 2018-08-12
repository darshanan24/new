import * as actionTypes from './actionTypes';
import axios from '../../axios-landoop';

export const createSourceStart = () => {
  return {
    type: actionTypes.CREATE_SOURCE_START
  };
};

export const createSourceSucess = (id, sourceData) => {
  console.log('data from source' + sourceData);
  return {
    type: actionTypes.CREATE_SOURCE_SUCCESS,
    sourceId: id,
    sourceData: sourceData
  };
};

export const createSourceFail = error => {
  return {
    type: actionTypes.CREATE_SOURCE_FAIL,
    error: error
  };
};

export const SourceInit = () => {
  return {
    type: actionTypes.SOURCE_INIT
  };
};

export const createSource = sourceData => {
  return dispatch => {
    dispatch(createSourceStart());
    axios
      .post('/connectors', sourceData.configuration, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        dispatch(
          createSourceSucess(response.data.name, sourceData.configuration)
        );
      })
      .catch(error => {
        dispatch(createSourceFail(error));
      });
  };
};

export const fetchSourcesSuccess = sources => {
  return {
    type: actionTypes.FETCH_SOURCES_SUCCESS,
    sources: sources
  };
};

export const fetchSourcesFail = error => {
  return {
    type: actionTypes.FETCH_SOURCES_FAIL,
    error: error
  };
};

export const fetchSourcesStart = () => {
  return {
    type: actionTypes.FETCH_SOURCES_START
  };
};

export const setSourceID = sourceID => {
  console.log('current SourceID actions ' + sourceID);
  return {
    type: actionTypes.SET_SOURCE_ID,
    sourceID: sourceID
  };
};

export const fetchSources = () => {
  return dispatch => {
    dispatch(fetchSourcesStart());
    //  const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get('/connectors')
      .then(res => {
        const fetchedSources = [];
        for (let key in res.data) {
          console.log('in store' + res.data[key]);
          fetchedSources.push(res.data[key]);
        }
        dispatch(fetchSourcesSuccess(fetchedSources));
      })
      .catch(err => {
        dispatch(fetchSourcesFail(err));
      });
  };
};

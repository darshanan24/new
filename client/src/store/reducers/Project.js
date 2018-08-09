import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  projectID: null,
  project: null,
  projects: [],
  projectData: null,
  loading: false,
  error: null,
  created: false
};

const ProjectInit = (state, action) => {
  return updateObject(state, { created: false });
};

const createProjectStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const createProjectSuccess = (state, action) => {
  return updateObject(state, {
    projectID: action.id,
    loading: false,
    created: true
  });
};

const createProjectFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const fetchProjectsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchProjectsSuccess = (state, action) => {
  return updateObject(state, {
    projects: action.projects,

    loading: false
  });
};

const fetchProjectsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const setProjectSucess = (state, action) => {
  return updateObject(state, {
    project: action.project
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROJECT_INIT:
      return ProjectInit(state, action);
    case actionTypes.CREATE_PROJECT_START:
      return createProjectStart(state, action);
    case actionTypes.CREATE_PROJECT_SUCCESS:
      return createProjectSuccess(state, action);
    case actionTypes.CREATE_PROJECT_FAIL:
      return createProjectFail(state, action);
    case actionTypes.FETCH_PROJECTS_START:
      return fetchProjectsStart(state, action);
    case actionTypes.FETCH_PROJECTS_SUCCESS:
      return fetchProjectsSuccess(state, action);
    case actionTypes.FETCH_PROJECTS_FAIL:
      return fetchProjectsFail(state, action);
    case actionTypes.SET_PROJECT_SUCESS:
      return setProjectSucess(state, action);
    default:
      return state;
  }
};

export default reducer;

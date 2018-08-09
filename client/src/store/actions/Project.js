import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const createProjectStart = () => {
  return {
    type: actionTypes.CREATE_PROJECT_START
  };
};

export const createProjectSucess = id => {
  console.log('data from project' + id);
  return {
    type: actionTypes.CREATE_PROJECT_SUCCESS,
    projectID: id
  };
};

export const createProjectFail = error => {
  return {
    type: actionTypes.CREATE_PROJECT_FAIL,
    error: error
  };
};

export const ProjectInit = () => {
  return {
    type: actionTypes.PROJECT_INIT
  };
};

export const createProject = projectData => {
  return dispatch => {
    dispatch(createProjectStart());
    axios
      .post('/projects.json', projectData)
      .then(response => {
        console.log('response from post');
        dispatch(createProjectSucess(response.data.name));
      })
      .catch(error => {
        dispatch(createProjectFail(error));
      });
  };
};

export const fetchProjectsStart = () => {
  return {
    type: actionTypes.FETCH_PROJECTS_START
  };
};

export const fetchProjectsSuccess = projects => {
  return {
    type: actionTypes.FETCH_PROJECTS_SUCCESS,
    projects: projects
  };
};

export const fetchProjectsFail = error => {
  return {
    type: actionTypes.FETCH_PROJECTS_FAIL,
    error: error
  };
};

export const fetchProjects = () => {
  return dispatch => {
    dispatch(fetchProjectsStart());
    //  const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get('/projects.json')
      .then(res => {
        const fetchedProjects = [];
        for (let key in res.data) {
          fetchedProjects.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchProjectsSuccess(fetchedProjects));
      })
      .catch(err => {
        dispatch(fetchProjectsFail(err));
      });
  };
};

export const setProjectFail = error => {
  return {
    type: actionTypes.SET_PROJECT_FAIL,
    error: error
  };
};

export const setProjectSucess = selectedProject => {
  return {
    type: actionTypes.SET_PROJECT_SUCESS,
    project: selectedProject
  };
};

export const setProject = projectID => {
  return dispatch => {
    const queryParams = '?orderBy="$key"&equalTo="' + projectID + '"';
    axios
      .get('/projects.json' + queryParams)
      .then(res => {
        let selectedProject = null;
        for (let key in res.data) {
          selectedProject = {
            projectID: key,
            name: res.data[key].name,
            description: res.data[key].description
          };
        }
        dispatch(setProjectSucess(selectedProject));
      })
      .catch(err => {
        dispatch(setProjectFail(err));
      });
  };
};

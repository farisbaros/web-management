import { take, put, call, fork, select, all, takeLatest, takeEvery } from 'redux-saga/effects'
import { messages } from '../../controls/MessageBox';
import axios from 'axios';

import * as actionType from './Action';


const HOST_URL = 'http://localhost:8080';
const BASE_URL = HOST_URL + '/api/userapplication';

function getConfig() {
  return {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  };
}

export function apiGetUserApplication(action) {
  return axios.get(BASE_URL + '/search'
    + '?pageIndex=' + action.data.criteria.pageIndex + '&pageSize=' + action.data.criteria.pageSize
    + '&sortField=' + action.data.criteria.sortField + '&sortDirection=' + action.data.criteria.sortDirection
    + '&userName=' + action.data.criteria.userName + '&clientName=' + action.data.criteria.clientName
    + '&groupName=' + action.data.criteria.groupName + '&activeStatus=' + action.data.criteria.activeStatus)
    .then(res => res.data)
}

export function apiGetUserApplicationById(action) {
  return axios.get(BASE_URL + '/' + action.data.id)
    .then(res => res.data);
}


export function apiGetUserApplicationByUsername(action) {
  return axios.get(BASE_URL + '/username?value=' + action.data.username)
    .then(res => res.data);
}

export function apiAddUserApplication(action) {
  return axios.post(BASE_URL, action.data.model)
    .then(res => res.data);
}

export function apiEditUserApplication(action) {
  return axios.put(BASE_URL + '/' + action.data.id, action.data.model)
    .then(res => res.data);
}

export function apiDeleteUserApplication(action) {
  return axios.delete(BASE_URL + '/' + action.data.id)
    .then(res => res.data);
}

export function apiGetUser(action) {
  return axios.get('http://localhost:10002/api/user/searchbyusername?username=', getConfig())
    .then(res => res.data);
}

export function apiGetClient(action) {
  return axios.get('http://moqmulator.azurewebsites.net/ipung/client')
    .then(res => res.data);
}

export function apiGetGroup(action) {
  return axios.get('http://moqmulator.azurewebsites.net/ipung/group/clientName=' + action.data.clientName)
    .then(res => res.data);
}

export function apiGetBranchArea() {
  return axios.get('http://moqmulator.azurewebsites.net/ipung/brancharea')
    .then(res => res.data);
}

export function apiGetCostCenter(action) {
  return axios.get('http://moqmulator.azurewebsites.net/ipung/costcenter/baCode=' + action.data.baCode)
    .then(res => res.data);
}

export function* getUserApplication(action) {
  try {
    const data = yield call(apiGetUserApplication, action);

    yield put({ type: actionType.GET_USER_APPLICATION_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.GET_USER_APPLICATION_FAIL, error: error });
  }
}

export function* getUserApplicationById(action) {
  try {
    const data = yield call(apiGetUserApplicationById, action);

    yield put({ type: actionType.GET_USER_APPLICATION_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.GET_USER_APPLICATION_BY_ID_FAIL, error: error });
  }
}

export function* getUserApplicationByUsername(action) {
  try {
    const data = yield call(apiGetUserApplicationByUsername, action);

    yield put({ type: actionType.GET_USER_APPLICATION_BY_USERNAME_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.GET_USER_APPLICATION_BY_USERNAME_FAIL, error: error });
  }
}

export function* addUserApplication(action) {
  try {
    const data = yield call(apiAddUserApplication, action);

    yield put({ type: actionType.ADD_USER_APPLICATION_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.ADD_USER_APPLICATION_FAIL, error: error });
  }
}

export function* editUserApplication(action) {
  try {
    const data = yield call(apiEditUserApplication, action);

    yield put({ type: actionType.EDIT_USER_APPLICATION_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.EDIT_USER_APPLICATION_FAIL, error: error });
  }
}

export function* deleteUserApplication(action) {
  try {
    const data = yield call(apiDeleteUserApplication, action);

    yield put({ type: actionType.DELETE_USER_APPLICATION_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.DELETE_USER_APPLICATION_FAIL, error: error });
  }
}

export function* getUser(action) {
  try {
    const data = yield call(apiGetUser, action);

    yield put({ type: actionType.GET_USER_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.GET_USER_FAIL, error: error });
  }
}

export function* getClient(action) {
  try {
    const data = yield call(apiGetClient, action);

    yield put({ type: actionType.GET_CLIENT_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.GET_CLIENT_FAIL, error: error });
  }
}

export function* getGroup(action) {
  try {
    const data = yield call(apiGetGroup, action);

    yield put({ type: actionType.GET_GROUP_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.GET_GROUP_FAIL, error: error });
  }
}

export function* getBranchArea() {
  try {
    const data = yield call(apiGetBranchArea);

    yield put({ type: actionType.GET_BRANCH_AREA_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.GET_BRANCH_AREA_FAIL, error: error });
  }
}

export function* getCostCenter(action) {
  try {
    const data = yield call(apiGetCostCenter, action);

    yield put({ type: actionType.GET_COST_CENTER_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.GET_COST_CENTER_FAIL, error: error });
  }
}

export function* userApplicationSaga() {
  yield (takeLatest(actionType.GET_USER_APPLICATION, getUserApplication));
  yield (takeLatest(actionType.GET_USER_APPLICATION_BY_ID, getUserApplicationById));
  yield (takeLatest(actionType.GET_USER_APPLICATION_BY_USERNAME, getUserApplicationByUsername));
  
  yield (takeLatest(actionType.ADD_USER_APPLICATION, addUserApplication));
  yield (takeLatest(actionType.EDIT_USER_APPLICATION, editUserApplication));
  yield (takeLatest(actionType.DELETE_USER_APPLICATION, deleteUserApplication));


  yield (takeLatest(actionType.GET_USER, getUser));
  yield (takeLatest(actionType.GET_CLIENT, getClient));
  yield (takeLatest(actionType.GET_GROUP, getGroup));
  yield (takeLatest(actionType.GET_BRANCH_AREA, getBranchArea));
  yield (takeLatest(actionType.GET_COST_CENTER, getCostCenter));

}

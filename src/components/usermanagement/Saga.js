import {
  take,
  put,
  call,
  fork,
  select,
  all,
  takeLatest,
  takeEvery
} from 'redux-saga/effects';
import { messages } from '../controls/MessageBox';
import axios from 'axios';

import * as actionType from './Action';

const BASE_URL = 'http://localhost:10002';
const API_URL = BASE_URL + '/api/user';

function getConfig() {
  return {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  };
};

export function apiGetUser(action) {
  const criteria = action.data.criteria;
  let param = '?pageIndex=' + criteria.pageIndex + '&pageSize=' + criteria.pageSize +
    '&sortField=' + criteria.sortField + '&sortDirection=' + criteria.sortDirection +
    '&username=' + criteria.userName + '&fullName=' + criteria.fullName;
    if (criteria.activeStatus != null) {
      param +='&activeStatus=' + criteria.activeStatus;
    }

  return axios.get(API_URL + '/search' + param, getConfig())
    .then(res => res.data);
}

export function apiGetUserById(action) {
  const id = action.data.id;
  let param = id;

  return axios.get(API_URL + '/' + param, getConfig())
    .then(res => res.data);
}

export function apiGetAccessObject(action) {
  return axios.get(BASE_URL + '/api/accessobject', getConfig())
    .then(res => res.data);
}

export function apiAddUser(action) {
  return axios.post(API_URL, action.data.model, getConfig())
    .then((res) => res.data);
}

export function apiEditUser(action) {
  return axios.put(API_URL + '/' + action.data.id, action.data.model, getConfig())
    .then((res) => res.data);
}

export function apiDeleteUser(action) {
  return axios.delete(API_URL + '/' + action.data.id, getConfig())
    .then((res) => res.data);
}

export function apiGetUserObjectByUserId(action) {
  return axios.get(BASE_URL + '/api/userobject/getbyuserid?userId=' + action.data.userId, getConfig())
    .then(res => res.data);
}

export function* getUser(action) {
  try {
    const data = yield call(apiGetUser, action);

    yield put({ type: actionType.GET_USER_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.GET_USER_FAIL, error: error });
  }
}

export function* getUserById(action) {
  try {
    const data = yield call(apiGetUserById, action);

    yield put({ type: actionType.GET_USER_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.GET_USER_BY_ID_FAIL, error: error });
  }
}

export function* getAccessObject(action) {
  try {
    const data = yield call(apiGetAccessObject, action);

    yield put({ type: actionType.GET_ACCESS_OBJ_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.GET_ACCESS_OBJ_FAIL, error: error });
  }
}

export function* addUser(action) {
  try {
    const data = yield call(apiAddUser, action);

    yield put({ type: actionType.ADD_USER_SUCCESS, payload: data });
  } catch (error) {
   yield put({ type: actionType.ADD_USER_FAIL, error: error });
  }
}

export function* editUser(action) {
  try {
    const data = yield call(apiEditUser, action);

    yield put({ type: actionType.EDIT_USER_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.EDIT_USER_FAIL, error: error });
  }
}

export function* deleteUser(action) {
  try {
    const data = yield call(apiDeleteUser, action);

    yield put({ type: actionType.DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.DELETE_USER_FAIL, error: error });
  }
}

export function* getUserObjectByUserId(action) {
  try {
    const data = yield call(apiGetUserObjectByUserId, action);

    yield put({ type: actionType.GET_USER_OBJECT_BY_USER_ID_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.GET_USER_OBJECT_BY_USER_ID_FAIL, error: error });
  }
}

export function* userSaga() {
  yield takeLatest(actionType.GET_USER, getUser);
  yield takeLatest(actionType.GET_USER_BY_ID, getUserById);
  yield takeLatest(actionType.GET_ACCESS_OBJ, getAccessObject);
  yield takeLatest(actionType.ADD_USER, addUser);
  yield takeLatest(actionType.EDIT_USER, editUser);
  yield takeLatest(actionType.DELETE_USER, deleteUser);
  yield takeLatest(actionType.GET_USER_OBJECT_BY_USER_ID, getUserObjectByUserId);
}

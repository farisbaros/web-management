import { take, put, call, fork, select, all, takeLatest, takeEvery } from 'redux-saga/effects'
import { messages } from '../../controls/MessageBox';
import axios from 'axios';

import * as actionType from './Action';

const BASE_URL = "http://localhost:10004";

export function apiGetGroup(action) {
  //debugger
  return axios.get(BASE_URL + "/api/group/search?groupName=" + action.criteria.groupName +
    "&clientName=" + action.criteria.clientName +
    "&portGsmName=" + action.criteria.portGsmName +
    "&groupStatus=" + action.criteria.groupStatus +
    "&operatorName=" + action.criteria.operatorName +
    "&previlegeTempName=" + action.criteria.privilegeTempName +
    "&pageIndex=" + action.criteria.pageIndex +
    "&pageSize=" + action.criteria.pageSize)
 
      .then(res => res.data)
}

export function* getGroup(action) {
  try {
    const data = yield call(apiGetGroup, action);
    yield put({ type: actionType.GET_GROUP_SUCCESS, payload: data});
  } catch (error) {
    messages('Error', 'Failed to get group', 'error', false);
    yield put({ type: actionType.GET_GROUP_FAIL, payload: error});
  }
}

export function* groupSaga() {
  yield (takeLatest(actionType.GET_GROUP, getGroup));
  yield (takeLatest(actionType.GET_CLIENT, getClient));
  yield (takeLatest(actionType.GET_OPERATOR, getOperator));
  yield (takeLatest(actionType.GET_PORT_GSM, getPortGsm));
  yield (takeLatest(actionType.ADD_GROUP, addGroup));
  yield (takeLatest(actionType.GET_GROUP_BY_ID, getGroupById));
  yield (takeLatest(actionType.GET_PRIVILEGES, getPrivileges));
}


export function apiGetGroupById(action) {
  return axios.get(BASE_URL+"/api/group/"+action.criteria.id)
  .then(res => res.data)
}

export function* getGroupById(action) {
  try {
    const data = yield call(apiGetGroupById, action);
    yield put({ type: actionType.GET_GROUP_BY_ID_SUCCESS, payload: data});

  } catch (error) {
    messages('Error', 'Failed to get group by id', 'error', false);
    yield put({ type: actionType.GET_GROUP_BY_ID_FAIL, payload: error});
  }
}

//ADD

export function apiAddGroup(action) {
  debugger
  return axios.post("http://localhost:10003/api/group/", action.data)
      .then(res => res.data)
}

export function* addGroup(action) {
  try {
    const data = yield call(apiAddGroup, action);
    messages('Success', 'Success add group', 'success', false);
    yield put({ type: actionType.ADD_GROUP_SUCCESS, payload: data});
  } catch (error) {
    messages('Error', 'Failed to add group', 'error', false);
    yield put({ type: actionType.ADD_GROUP_FAIL, payload: error});
  }
}

//UPDATE

export function apiUpdateGroup(action) {
  return axios.put("http://moqmulator.azurewebsites.net/api/group/update",action.model)
      .then(res => res.data)
}

export function* updateGroup(action) {
  try {
    const data = yield call(apiUpdateGroup, action);
    messages('Success', 'Success update group', 'success', false);
    yield put({ type: actionType.UPDATE_GROUP_SUCCESS, payload: data});``
  } catch (error) {
    messages('Error', 'Failed to update group', 'error', false);
    yield put({ type: actionType.UPDATE_GROUP_FAIL, payload: error});
  }
}

export function* updateGroupSaga() {
  yield (takeLatest(actionType.UPDATE_GROUP, updateGroup))
}


//DELETE

export function apiDeleteGroup(action) {
  return axios.get("http://moqmulator.azurewebsites.net/group/delete/"+action.data.id)
      .then(res => res.data)
}

export function* deleteGroup(action) {
  try {
    const data = yield call(apiDeleteGroup, action);

    yield put({ type: actionType.DELETE_GROUP_SUCCESS, payload: data});
  } catch (error) {
    messages('Error', 'Failed to delete group', 'error', false);
    yield put({ type: actionType.DELETE_GROUP_FAIL, payload: error});
  }
}

export function* deleteGroupSaga() {
  yield (takeLatest(actionType.DELETE_GROUP, deleteGroup))
}

export function apiGetClient(action) {
  //return axios.get(BASE_URL+"/api/group/"+action.criteria.id)
  return axios.get("http://moqmulator.azurewebsites.net/ipung/client")
  .then(res => res.data)
}

export function* getClient(action) {
  try {
    const data = yield call(apiGetClient, action);
    yield put({ type: actionType.GET_CLIENT_SUCCESS, payload: data});
    //debugger
  } catch (error) {
    messages('Error', 'Failed to get group by id', 'error', false);
    yield put({ type: actionType.GET_CLIENT_FAIL, payload: error});
  }
}

export function apiGetOperator(action) {
  //return axios.get(BASE_URL+"/api/group/"+action.criteria.id)
  return axios.get("http://moqmulator.azurewebsites.net/api/operator")
  .then(res => res.data)
}

export function* getOperator(action) {
  try {
    const data = yield call(apiGetOperator, action);
    yield put({ type: actionType.GET_OPERATOR_SUCCESS, payload: data});
    //debugger
  } catch (error) {
    messages('Error', 'Failed to get operator', 'error', false);
    yield put({ type: actionType.GET_OPERATOR_FAIL, payload: error});
  }
}

export function apiGetPortGsm(action) {
  //return axios.get(BASE_URL+"/api/group/"+action.criteria.id)
  return axios.get("http://moqmulator.azurewebsites.net/api/portGsm")
  .then(res => res.data)
}

export function* getPortGsm(action) {
  try {
    const data = yield call(apiGetPortGsm, action);
    yield put({ type: actionType.GET_PORT_GSM_SUCCESS, payload: data});
    //debugger
  } catch (error) {
    messages('Error', 'Failed to get port gsm', 'error', false);
    yield put({ type: actionType.GET_PORT_GSM_FAIL, payload: error});
  }
}

export function apiGetPrivileges(action) {
  //return axios.get(BASE_URL+"/api/group/"+action.criteria.id)
  return axios.get("http://moqmulator.azurewebsites.net/doni/privileges")
  .then(res => res.data)
}

export function* getPrivileges(action) {
  try {
    const data = yield call(apiGetPrivileges, action);
    yield put({ type: actionType.GET_PRIVILEGES_SUCCESS, payload: data});
    //debugger
  } catch (error) {
    messages('Error', 'Failed to get privileges', 'error', false);
    yield put({ type: actionType.GET_PRIVILEGES_FAIL, payload: error});
  }
}
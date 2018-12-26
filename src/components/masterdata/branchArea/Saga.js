import { put, call, takeLatest } from 'redux-saga/effects'
import { messages } from '../../controls/MessageBox';
import axios from 'axios';

import * as actionType from './Action';

// server
// const BASE_URL = 'http://localhost:10003/';
const BASE_URL = 'http://moqmulator.azurewebsites.net';
const API_URL = BASE_URL + '/api/brancharea';

export function apiGetBrachArea(action) {
  return axios.get(API_URL+"/get")
  //return axios.get(BASE_URL+"/api/brancharea/search?baCode="+action.criteria.baCode+"&baDesc="+action.criteria.baDesc+"&area="+action.criteria.area+"&pageIndex="+action.criteria.pageIndex+"&pageSize="+action.criteria.pageSize)
    .then(res => res.data)
}

export function* getBranchArea(action) {
  try {
    const data = yield call(apiGetBrachArea, action);
    yield put({ type: actionType.GET_BRANCH_AREA_SUCCESS, payload: data});
  } catch (error) {
    yield put({ type: actionType.GET_BRANCH_AREA_FAIL, payload: error});
  }
}

export function apiGetBrachAreaById(action) {
  return axios.get(API_URL+"/"+action.data.id)
    .then(res => res.data)
}

export function* getBranchAreaById(action) {
  try {
    const data = yield call(apiGetBrachAreaById, action);
    yield put({ type: actionType.GET_BRANCH_AREA_BY_ID_SUCCESS, payload: data});
  } catch (error) {
    yield put({ type: actionType.GET_BRANCH_AREA_BY_ID_FAIL, payload: error});
  }
}

export function apiAddBrachArea(action) {
  return axios.post(API_URL, action.data)
  .then(res => res.data)
}

export function* addBranchArea(action) {
  try {
    const data = yield call(apiAddBrachArea, action);
    yield put({ type: actionType.ADD_BRANCH_AREA_SUCCESS, payload: data});
  } catch (error) {
    yield put({ type: actionType.ADD_BRANCH_AREA_FAIL, payload: error});
  }
}

export function apiEditBrachArea(action) {
  return axios.put(API_URL+"/"+action.data.id,action.data.model)
    .then(res => res.data)
}

export function* editBranchArea(action) {
  try {
    const data = yield call(apiEditBrachArea, action);
    yield put({ type: actionType.EDIT_BRANCH_AREA_SUCCESS, payload: data});
  } catch (error) {
    yield put({ type: actionType.EDIT_BRANCH_AREA_FAIL, payload: error});
  }
}

export function apiDeleteBrachArea(action) {
  return axios.delete(API_URL+"/"+action.data.id)
    .then(res => res.data)
}

export function* deleteBranchArea(action) {
  try {
    const data = yield call(apiDeleteBrachArea, action);

    yield put({ type: actionType.DELETE_BRANCH_AREA_SUCCESS, payload: data});
  } catch (error) {
    yield put({ type: actionType.DELETE_BRANCH_AREA_FAIL, payload: error});
  }
}

export function* branchAreaSaga() {
  yield (takeLatest(actionType.GET_BRANCH_AREA, getBranchArea));
  yield (takeLatest(actionType.ADD_BRANCH_AREA, addBranchArea));
  yield (takeLatest(actionType.DELETE_BRANCH_AREA, deleteBranchArea));
  yield (takeLatest(actionType.EDIT_BRANCH_AREA, editBranchArea));
  yield (takeLatest(actionType.GET_BRANCH_AREA_BY_ID, getBranchAreaById))
}
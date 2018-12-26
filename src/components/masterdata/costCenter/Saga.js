import { put, call, takeLatest} from 'redux-saga/effects'
import axios from 'axios';

import * as actionType from './Action';

// server
// const BASE_URL = 'http://localhost:10003/';
const BASE_URL = 'http://moqmulator.azurewebsites.net';
const API_URL = BASE_URL + '/api/costcenter';

export function apiGetCostArea(action) {
  return axios.get(BASE_URL+"/api/costcenter")
  //return axios.get(BASE_URL+"/api/costcenter/search?costCenterCode="+action.criteria.costCenterCode+"&costCenterDesc="+action.criteria.costCenterDesc+"&baCode="+action.criteria.baCode+"&pageIndex="+action.criteria.pageIndex+"&pageSize="+action.criteria.pageSize)
    .then(res => res.data)
}

export function apiGetBranch(action) {
  //return axios.get(BASE_URL+"/api/brancharea/all")
  return axios.get("http://moqmulator.azurewebsites.net//branch/getBranch")
  .then(res => res.data)
}

export function* getCostCenterByCriteria(action) {
  try {
    const data = yield call(apiGetCostArea, action);
    yield put({ type: actionType.GET_COST_CENTER_SUCCESS, payload: data});
  } catch (error) {
    yield put({ type: actionType.GET_COST_CENTER_FAIL, payload: error});
  }
}

export function* getBranch(action) {
  try {
    const data = yield call(apiGetBranch, action);
    yield put({ type: actionType.GET_BRANCH_SUCCESS, payload: data});
    
  } catch (error) {
    yield put({ type: actionType.GET_BRANCH_FAIL, payload: error});
  }
}

export function apiGetCostCenterById(action) {
    //return axios.get(BASE_URL+"/api/costcenter/"+action.criteria.id)
  return axios.get("http://moqmulator.azurewebsites.net/api/costcenter/get/1")
      .then(res => res.data)
}

export function* getCostCenterById(action) {
  try {
    const data = yield call(apiGetCostCenterById, action);
    yield put({ type: actionType.GET_COST_CENTER_BY_ID_SUCCESS, payload: data});
  } catch (error) {
     yield put({ type: actionType.GET_COST_CENTER_BY_ID_FAIL, payload: error});
  }
}

export function apiAddCostCenter(action) {
  return axios.post(BASE_URL+"/api/costcenter/",action.data.data)
      .then(res => res.data)
}

export function* addCostCenter(action) {
  try {
    const data = yield call(apiAddCostCenter, action);
    yield put({ type: actionType.ADD_COST_CENTER_SUCCESS, payload: data});
  } catch (error) {
    yield put({ type: actionType.ADD_COST_CENTER_FAIL, payload: error});
  }
}

export function apiUpdateCostCenter(action) {
  return axios.put(BASE_URL+"/api/costcenter/"+action.data.id,action.data.model)
      .then(res => res.data)
}

export function* editCostCenter(action) {
  try {
    const data = yield call(apiUpdateCostCenter, action);
    yield put({ type: actionType.EDIT_COST_CENTER_SUCCESS, payload: data});
  } catch (error) {
    yield put({ type: actionType.EDIT_COST_CENTER_FAIL, payload: error});
  }
}

export function apiDeleteCostCenter(action) {
  return axios.delete(BASE_URL+"/api/costcenter/"+action.data.id)
      .then(res => res.data)
}

export function* deleteCostCenter(action) {
  try {
    const data = yield call(apiDeleteCostCenter, action);
    yield put({ type: actionType.DELETE_COST_CENTER_SUCCESS, payload: data});
  } catch (error) {
    yield put({ type: actionType.DELETE_COST_CENTER_FAIL, payload: error});
  }
}

export function* costCenterSaga() {
  yield (takeLatest(actionType.GET_COST_CENTER, getCostCenterByCriteria));
  yield (takeLatest(actionType.DELETE_COST_CENTER, deleteCostCenter));
  yield (takeLatest(actionType.EDIT_COST_CENTER, editCostCenter));
  yield (takeLatest(actionType.GET_COST_CENTER_BY_ID, getCostCenterById));
  yield (takeLatest(actionType.ADD_COST_CENTER, addCostCenter));
  yield (takeLatest(actionType.GET_BRANCH, getBranch));
}
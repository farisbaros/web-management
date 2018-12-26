import { take, put, call, fork, select, all, takeLatest, takeEvery } from 'redux-saga/effects'
import axios from 'axios';

import * as actionType from './Action';

const BASE_URL = 'http://localhost:8080';
const API_URL = BASE_URL + '/api/client';

function getConfig() {
  return {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  };
};

export function apiGetClient(action) {
  const criteria = action.criteria;
  let param = '?pageIndex=' + criteria.pageIndex + '&pageSize=' + criteria.pageSize +
    '&sortField=' + criteria.sortField + '&sortDirection=' + criteria.sortDirection +
    '&clientName=' + criteria.clientName + '&senderId=' + criteria.senderId +
    '&modemPort=' + criteria.modemPort;

    if (criteria.activeStatus != null) {
      param +='&activeStatus=' + criteria.activeStatus;
    }

  return axios.get(API_URL + '/search' + param, getConfig())
    .then(res => res.data);
}

export function apiGetClientById(action) {
  return axios.get(API_URL + '/' + action.id, getConfig())
    .then(res => res.data);
}

export function apiAddClient(action) {
  return axios.post(API_URL, action.model, getConfig())
    .then((res) => res.data);
}

export function apiEditClient(action) {
  return axios.put(API_URL + '/' + action.id, action.model, getConfig())
    .then((res) => res.data);
}

export function apiDeleteClient(action) {
  return axios.delete(API_URL + '/' + action.id, getConfig())
    .then((res) => res.data);
}

export function apiGetVendor(action) {
  return axios.get('http://API_VENDOR', getConfig())
    .then((res) => res.data);
}

export function apiGetOperator(action) {
  return axios.get('http://API_OPERATOR', getConfig())
    .then((res) => res.data);
}

export function apiGetGsmPort(action) {
  return axios.get('http://API_GSM', getConfig())
    .then((res) => res.data);
}

export function apiGetClientGsm(action) {
  return axios.delete(BASE_URL + '/api/clientgsm', getConfig())
    .then((res) => res.data);
}

export function apiGetClientGsmExceptClientId(action) {
  return axios.delete(BASE_URL + '/api/clientgsm/' + action.clientId, getConfig())
    .then((res) => res.data);
}

export function* getClient(action) {
  try {
    const data = yield call(apiGetClient, action);
    
    yield put({ type: actionType.GET_CLIENT_SUCCESS, payload: data});
  } catch (error) {
    yield put({ type: actionType.GET_CLIENT_FAIL, error: error});
  }
}

export function* getClientById(action) {
  try {
    const data = yield call(apiGetClientById, action);

    yield put({ type: actionType.GET_CLIENT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.GET_CLIENT_BY_ID_FAIL, error: error });
  }
}

export function* addClient(action) {
  try {
    const data = yield call(apiAddClient, action);

    yield put({ type: actionType.ADD_CLIENT_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.ADD_CLIENT_FAIL, error: error });
  }
}

export function* editClient(action) {
  try {
    const data = yield call(apiEditClient, action);

    yield put({ type: actionType.EDIT_CLIENT_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.EDIT_CLIENT_FAIL, error: error });
  }
}

export function* deleteClient(action) {
  try {
    const data = yield call(apiDeleteClient, action);

    yield put({ type: actionType.DELETE_CLIENT_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.DELETE_CLIENT_FAIL, error: error });
  }
}

export function* getVendor(action) {
  try {
    const data = yield call(apiGetVendor, action);

    yield put({ type: actionType.GET_VENDOR_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.GET_VENDOR_FAIL, error: error });
  }
}

export function* getOperator(action) {
  try {
    const data = yield call(apiGetOperator, action);

    yield put({ type: actionType.GET_OPERATOR_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.GET_OPERATOR_FAIL, error: error });
  }
}

export function* getGsmPort(action) {
  try {
    const data = yield call(apiGetGsmPort, action);

    yield put({ type: actionType.GET_GSM_PORT_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.GET_GSM_PORT_FAIL, error: error });
  }
}

export function* getClientGsm(action) {
  try {
    const data = yield call(apiGetClientGsm, action);

    yield put({ type: actionType.GET_CLIENT_GSM_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.GET_CLIENT_GSM_FAIL, error: error });
  }
}

export function* getClientGsmExceptClientId(action) {
  try {
    const data = yield call(apiGetClientGsmExceptClientId, action);

    yield put({ type: actionType.GET_CLIENT_GSM_EXCEPT_CLIENTID_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.GET_CLIENT_GSM_EXCEPT_CLIENTID_FAIL, error: error });
  }
}

export function* clientSaga() {
  yield takeLatest(actionType.GET_CLIENT, getClient);
  yield takeLatest(actionType.GET_CLIENT_BY_ID, getClientById);
  yield takeLatest(actionType.ADD_CLIENT, addClient);
  yield takeLatest(actionType.EDIT_CLIENT, editClient);
  yield takeLatest(actionType.DELETE_CLIENT, deleteClient);
  yield takeLatest(actionType.GET_VENDOR, getVendor);
  yield takeLatest(actionType.GET_OPERATOR, getOperator);
  yield takeLatest(actionType.GET_GSM_PORT, getGsmPort);
  yield takeLatest(actionType.GET_CLIENT_GSM, getClientGsm);
  yield takeLatest(actionType.GET_CLIENT_GSM_EXCEPT_CLIENTID, getClientGsmExceptClientId);
}

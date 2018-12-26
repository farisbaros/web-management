import { take, put, call, fork, select, all, takeLatest, takeEvery } from 'redux-saga/effects'
import { messages } from '../../controls/MessageBox';
import axios from 'axios';

import * as actionType from './Action';

export function apiGetClient(action) {
  return axios.get("http://localhost:10005/api/client/search?clientName="
    + action.criteria.clientName)
      .then(res => res.data)
}

export function* getClient(action) {
  try {
    const data = yield call(apiGetClient, action);

    yield put({ type: actionType.GET_CLIENT_SUCCESS, payload: data});
  } catch (error) {
    messages('Error', 'Failed to get client', 'error', false);
    yield put({ type: actionType.GET_CLIENT_FAIL, payload: error});
  }
}

export function* clientSaga() {
  yield (takeLatest(actionType.GET_CLIENT, getClient))
}


// export function* saga() {
//   yield (takeLatest(actionType.GET_CLIENT, getClient))
// }

//import { take, put, call, fork, select, all, takeLatest, takeEvery } from 'redux-saga/effects';
import { put, takeLatest } from 'redux-saga/effects';
import { messages } from '../controls/MessageBox';

import * as actionType from './Action';

export function* logout(action) {
  try {
    yield put({ type: actionType.LOGOUT_SUCCESS, payload: true });
  } catch (error) {
    messages('Error', 'Failed to logout.', 'error', false);
    yield put({ type: actionType.LOGOUT_FAIL, payload: error });
  }
}

export function* logoutSaga() {
  yield (takeLatest(actionType.LOGOUT, logout));
}

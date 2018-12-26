import { take, put, call, fork, select, all, takeLatest, takeEvery } from 'redux-saga/effects';
import { messages } from '../controls/MessageBox';
import axios from 'axios';

import * as actionType from './Action';
import { LOGIN_INIT_SUCCESS } from './Action';

const HOST_URL = 'http://localhost:10002';

export function apiLogin(action) {
  const formData = new FormData;
  formData.append('grant_type', 'password');
  formData.append('username', action.params.username);
  formData.append('password', action.params.password);

  // return axios({
  //   method: 'post',
  //   url: HOST_URL + '/oauth/token',
  //   data: formData,
  //   headers: {
  //     Authorization: 'Basic Y2xpZW50OnNlY3JldA=='
  //   }
  // }).then(res => res.data);
  return "hdjahdsg2gh2g3j2hgj23g232h4gj3g23j424h";
}

export function* loginInit() {
  put({ type: LOGIN_INIT_SUCCESS });
}

export function* login(action) {
  try {
    const data = yield call(apiLogin, action);

    yield put({ type: actionType.LOGIN_SUCCESS, payload: data });
  } catch (error) {
    yield put({ type: actionType.LOGIN_FAIL, payload: error });
  }
}

export function* loginSaga() {
  yield (takeLatest(actionType.LOGIN_INIT, loginInit));
  yield (takeLatest(actionType.LOGIN, login));
}


import { take, put, call, fork, select, all, takeLatest, takeEvery } from 'redux-saga/effects'

export function* helloSaga() {
  console.log('sagas connected')
}

export default function* root() {
  yield all([
    helloSaga()
  ])
}

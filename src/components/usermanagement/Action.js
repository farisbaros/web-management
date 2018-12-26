export const GET_USER = 'GET_USER';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAIL = 'GET_USER_FAIL';

export const GET_USER_BY_ID = 'GET_USER_BY_ID';
export const GET_USER_BY_ID_SUCCESS = 'GET_USER_BY_ID_SUCCESS';
export const GET_USER_BY_ID_FAIL = 'GET_USER_BY_ID_FAIL';

export const GET_ACCESS_OBJ = 'GET_ACCESS_OBJ'
export const GET_ACCESS_OBJ_SUCCESS = 'GET_ACCESS_OBJ_SUCCESS'
export const GET_ACCESS_OBJ_FAIL = 'GET_ACCESS_OBJ_FAIL'

export const ADD_USER_INIT = 'ADD_USER_INIT';
export const ADD_USER = 'ADD_USER';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
export const ADD_USER_FAIL = 'ADD_USER_FAIL';

export const EDIT_USER = 'EDIT_USER';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAIL = 'EDIT_USER_FAIL';

export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';

export const GET_USER_OBJECT_BY_USER_ID = 'GET_USER_OBJECT_BY_USER_ID';
export const GET_USER_OBJECT_BY_USER_ID_SUCCESS = 'GET_USER_OBJECT_BY_USER_ID_SUCCESS';
export const GET_USER_OBJECT_BY_USER_ID_FAIL = 'GET_USER_OBJECT_BY_USER_ID_FAIL';

export function getUserBySearchCriteria(criteria) {
  return dispatch => {
    dispatch({ type: GET_USER, data: { criteria: criteria } });
  };
}

export function getUserById(id) {
  return dispatch => {
    dispatch({ type: GET_USER_BY_ID, data: { id: id } });
  };
}

export function getAccessObj() {
  return (dispatch) => {
    dispatch({ type: GET_ACCESS_OBJ });
  }
}

export function addUserInit() {
  return dispatch => {
    dispatch({ type: ADD_USER_INIT });
  };
}

export function addUser(model) {
  return dispatch => {
    dispatch({ type: ADD_USER, data: { model: model } });
  };
}

export function editUser(id, model) {
  return dispatch => {
    dispatch({ type: EDIT_USER, data: { id: id, model: model } });
  };
}

export function deleteUser(id) {
  return dispatch => {
    dispatch({ type: DELETE_USER, data: { id: id } });
  };
}

export function getUserObjectByUserId(userId) {
  return dispatch => {
    dispatch({ type: GET_USER_OBJECT_BY_USER_ID, data: { userId: userId } });
  };
}

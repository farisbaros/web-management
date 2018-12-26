export const GET_GROUP = 'GET_GROUP'
export const GET_GROUP_SUCCESS = 'GET_GROUP_SUCCESS'
export const GET_GROUP_FAIL = 'GET_GROUP_FAIL'

export function getGroup(criteria) {
  return (dispatch) => {
    dispatch({ type: GET_GROUP, criteria: criteria});
  }
}

export const GET_GROUP_BY_ID = 'GET_GROUP_BY_ID'
export const GET_GROUP_BY_ID_SUCCESS = 'GET_GROUP_BY_ID_SUCCESS'
export const GET_GROUP_BY_ID_FAIL = 'GET_GROUP_BY_ID_FAIL'

export function getGroupById(criteria) {
  return (dispatch) => {
    dispatch({ type: GET_GROUP_BY_ID, criteria: criteria});
  }
}

export const ADD_GROUP = 'ADD_GROUP'
export const ADD_GROUP_SUCCESS = 'ADD_GROUP_SUCCESS'
export const ADD_GROUP_FAIL = 'ADD_GROUP_FAIL'

export function addGroup(data) {
  return (dispatch) => {
    dispatch({ type: ADD_GROUP, data: data});
  }
}

export const UPDATE_GROUP = 'UPDATE_GROUP'
export const UPDATE_GROUP_SUCCESS = 'UPDATE_GROUP_SUCCESS'
export const UPDATE_GROUP_FAIL = 'UPDATE_GROUP_FAIL'

export function updateGroup(criteria) {
  return (dispatch) => {
    dispatch({ type: UPDATE_GROUP, criteria: criteria});
  }
}

export const DELETE_GROUP = 'DELETE_GROUP'
export const DELETE_GROUP_SUCCESS = 'DELETE_GROUP_SUCCESS'
export const DELETE_GROUP_FAIL = 'DELETE_GROUP_FAIL'

export function deleteGroup(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_GROUP, data: {id:id}});
  }
}

export const GET_CLIENT = 'GET_CLIENT'
export const GET_CLIENT_SUCCESS = 'GET_CLIENT_SUCCESS'
export const GET_CLIENT_FAIL = 'GET_CLIENT_FAIL'

export function getClient(criteria) {
  return (dispatch) => {
    dispatch({ type: GET_CLIENT, criteria: criteria });
  }
}

export const GET_OPERATOR = 'GET_OPERATOR'
export const GET_OPERATOR_SUCCESS = 'GET_OPERATOR_SUCCESS'
export const GET_OPERATOR_FAIL = 'GET_OPERATOR_FAIL'

export function getOperator(criteria) {
  return (dispatch) => {
    dispatch({ type: GET_OPERATOR, criteria: criteria });
  }
}

export const GET_PORT_GSM = 'GET_PORT_GSM'
export const GET_PORT_GSM_SUCCESS = 'GET_PORT_GSM_SUCCESS'
export const GET_PORT_GSM_FAIL = 'GET_PORT_GSM_FAIL'

export function getPortGsm(criteria) {
  return (dispatch) => {
    dispatch({ type: GET_PORT_GSM, criteria: criteria });
  }
}

export const GET_PRIVILEGES = 'GET_PRIVILEGES'
export const GET_PRIVILEGES_SUCCESS = 'GET_PRIVILEGES_SUCCESS'
export const GET_PRIVILEGES_FAIL = 'GET_PRIVILEGES_FAIL'

export function getPrivileges(criteria) {
  return (dispatch) => {
    dispatch({ type: GET_PRIVILEGES, criteria: criteria });
  }
}
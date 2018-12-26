export const GET_CLIENT = 'GET_CLIENT'
export const GET_CLIENT_SUCCESS = 'GET_CLIENT_SUCCESS'
export const GET_CLIENT_FAIL = 'GET_CLIENT_FAIL'

export const GET_CLIENT_BY_ID = 'GET_CLIENT_BY_ID'
export const GET_CLIENT_BY_ID_SUCCESS = 'GET_CLIENT_BY_ID_SUCCESS'
export const GET_CLIENT_BY_ID_FAIL = 'GET_CLIENT_BY_ID_FAIL'

export const ADD_CLIENT = 'ADD_CLIENT'
export const ADD_CLIENT_SUCCESS = 'ADD_CLIENT_SUCCESS'
export const ADD_CLIENT_FAIL = 'ADD_CLIENT_FAIL'

export const EDIT_CLIENT = 'EDIT_CLIENT'
export const EDIT_CLIENT_SUCCESS = 'EDIT_CLIENT_SUCCESS'
export const EDIT_CLIENT_FAIL = 'EDIT_CLIENT_FAIL'

export const DELETE_CLIENT = 'DELETE_CLIENT'
export const DELETE_CLIENT_SUCCESS = 'DELETE_CLIENT_SUCCESS'
export const DELETE_CLIENT_FAIL = 'DELETE_CLIENT_FAIL'

export const GET_VENDOR = 'GET_VENDOR'
export const GET_VENDOR_SUCCESS = 'GET_VENDOR_SUCCESS'
export const GET_VENDOR_FAIL = 'GET_VENDOR_FAIL'

export const GET_OPERATOR = 'GET_OPERATOR'
export const GET_OPERATOR_SUCCESS = 'GET_OPERATOR_SUCCESS'
export const GET_OPERATOR_FAIL = 'GET_OPERATOR_FAIL'

export const GET_GSM_PORT = 'GET_GSM_PORT'
export const GET_GSM_PORT_SUCCESS = 'GET_GSM_PORT_SUCCESS'
export const GET_GSM_PORT_FAIL = 'GET_GSM_PORT_FAIL'

export const GET_CLIENT_GSM = 'GET_CLIENT_GSM'
export const GET_CLIENT_GSM_SUCCESS = 'GET_CLIENT_GSM_SUCCESS'
export const GET_CLIENT_GSM_FAIL = 'GET_CLIENT_GSM_FAIL'

export const GET_CLIENT_GSM_EXCEPT_CLIENTID = 'GET_CLIENT_GSM_EXCEPT_CLIENTID'
export const GET_CLIENT_GSM_EXCEPT_CLIENTID_SUCCESS = 'GET_CLIENT_GSM_EXCEPT_CLIENTID_SUCCESS'
export const GET_CLIENT_GSM_EXCEPT_CLIENTID_FAIL = 'GET_CLIENT_GSM_EXCEPT_CLIENTID_FAIL'

export function getClientBySearchCriteria(criteria) {
  return (dispatch) => {
    dispatch({ type: GET_CLIENT, criteria: criteria });
  }
}

export function getClientById(id) {
  return (dispatch) => {
    dispatch({ type: GET_CLIENT_BY_ID, id: id });
  }
}

export function addClient(model) {
  return (dispatch) => {
    dispatch({ type: ADD_CLIENT, model: model });
  }
}

export function editClient(id, model) {
  return (dispatch) => {
    dispatch({ type: EDIT_CLIENT, id: id, model: model });
  }
}

export function deleteClient(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_CLIENT, id: id });
  }
}

export function getVendor() {
  return (dispatch) => {
    dispatch({ type: GET_VENDOR });
  }
}

export function getOperator() {
  return (dispatch) => {
    dispatch({ type: GET_OPERATOR });
  }
}

export function getGsmPort() {
  return (dispatch) => {
    dispatch({ type: GET_GSM_PORT });
  }
}

export function getClientGsm() {
  return (dispatch) => {
    dispatch({ type: GET_CLIENT_GSM });
  }
}

export function getClientGsmExceptClientId(clientId) {
  return (dispatch) => {
    dispatch({ type: GET_CLIENT_GSM_EXCEPT_CLIENTID, clientId: clientId });
  }
}
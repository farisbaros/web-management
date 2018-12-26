export const GET_USER_APPLICATION = 'GET_USER_APPLICATION'
export const GET_USER_APPLICATION_SUCCESS = 'GET_USER_APPLICATION_SUCCESS'
export const GET_USER_APPLICATION_FAIL = 'GET_USER_APPLICATION_FAIL'

export const GET_USER_APPLICATION_BY_ID = 'GET_USER_APPLICATION_BY_ID'
export const GET_USER_APPLICATION_BY_ID_SUCCESS = 'GET_USER_APPLICATION_BY_ID_SUCCESS'
export const GET_USER_APPLICATION_BY_ID_FAIL = 'GET_USER_APPLICATION_BY_ID_FAIL'

export const GET_USER_APPLICATION_BY_USERNAME = 'GET_USER_APPLICATION_BY_USERNAME'
export const GET_USER_APPLICATION_BY_USERNAME_SUCCESS = 'GET_USER_APPLICATION_BY_USERNAME_SUCCESS'
export const GET_USER_APPLICATION_BY_USERNAME_FAIL = 'GET_USER_APPLICATION_BY_USERNAME_FAIL'

export const ADD_USER_APPLICATION = 'ADD_USER_APPLICATION'
export const ADD_USER_APPLICATION_SUCCESS = 'ADD_USER_APPLICATION_SUCCESS'
export const ADD_USER_APPLICATION_FAIL = 'ADD_USER_APPLICATION_FAIL'

export const EDIT_USER_APPLICATION = 'EDIT_USER_APPLICATION'
export const EDIT_USER_APPLICATION_SUCCESS = 'EDIT_USER_APPLICATION_SUCCESS'
export const EDIT_USER_APPLICATION_FAIL = 'EDIT_USER_APPLICATION_FAIL'

export const DELETE_USER_APPLICATION = 'DELETE_USER_APPLICATION'
export const DELETE_USER_APPLICATION_SUCCESS = 'DELETE_USER_APPLICATION_SUCCESS'
export const DELETE_USER_APPLICATION_FAIL = 'DELETE_USER_APPLICATION_FAIL'

export const GET_USER = 'GET_USER'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_FAIL = 'GET_USER_FAIL'

export const GET_CLIENT = 'GET_CLIENT'
export const GET_CLIENT_SUCCESS = 'GET_CLIENT_SUCCESS'
export const GET_CLIENT_FAIL = 'GET_CLIENT_FAIL'

export const GET_GROUP = 'GET_GROUP'
export const GET_GROUP_SUCCESS = 'GET_GROUP_SUCCESS'
export const GET_GROUP_FAIL = 'GET_GROUP_FAIL'

export const GET_BRANCH_AREA = 'GET_BRANCH_AREA'
export const GET_BRANCH_AREA_SUCCESS = 'GET_BRANCH_AREA_SUCCESS'
export const GET_BRANCH_AREA_FAIL = 'GET_BRANCH_AREA_FAIL'

export const GET_COST_CENTER = 'GET_COST_CENTER'
export const GET_COST_CENTER_SUCCESS = 'GET_COST_CENTER_SUCCESS'
export const GET_COST_CENTER_FAIL = 'GET_COST_CENTER_FAIL'



export function getUserApplication(criteria) {
  return (dispatch) => {
    dispatch({ type: GET_USER_APPLICATION, data: { criteria: criteria } });
  }
}

export function getUserApplicationById(id) {
  return (dispatch) => {
    dispatch({ type: GET_USER_APPLICATION_BY_ID, data: { id: id } });
  }
}

export function getUserApplicationByUsername(username) {
  return (dispatch) => {
    dispatch({ type: GET_USER_APPLICATION_BY_USERNAME, data: { username: username } });
  }
}


export function addUserApplication(model){
  return (dispatch) => {
    dispatch({ type: ADD_USER_APPLICATION, data: { model: model } });
  }
}

export function editUserApplication(id, model) {
  return (dispatch) => {
    dispatch({ type: EDIT_USER_APPLICATION, data: { id: id, model: model } });
  }
}

export function deleteUserApplication(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_USER_APPLICATION, data: { id: id } });
  }
 }

export function getUser() {
  return (dispatch) => {
    dispatch({ type: GET_USER });
  }
}

export function getClient() {
  return (dispatch) => {
    dispatch({ type: GET_CLIENT });
  }
}

export function getGroup(clientName) {
  return (dispatch) => {
    dispatch({ type: GET_GROUP, data: { clientName: clientName } });
  }
}

export function getBranchArea(action) {
  return (dispatch) => {
    dispatch({ type: GET_BRANCH_AREA, action: action });
  }
}

export function getCostCenter(baCode) {
  return (dispatch) => {
    dispatch({ type: GET_COST_CENTER, data: { baCode: baCode } });
  }
}

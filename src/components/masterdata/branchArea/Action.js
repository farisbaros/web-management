export const GET_BRANCH_AREA = 'GET_BRANCH_AREA'
export const GET_BRANCH_AREA_SUCCESS = 'GET_BRANCH_AREA_SUCCESS'
export const GET_BRANCH_AREA_FAIL = 'GET_BRANCH_AREA_FAIL'

export const GET_BRANCH_AREA_BY_ID = 'GET_BRANCH_AREA_BY_ID'
export const GET_BRANCH_AREA_BY_ID_SUCCESS = 'GET_BRANCH_AREA_BY_ID_SUCCESS'
export const GET_BRANCH_AREA_BY_ID_FAIL = 'GET_BRANCH_AREA_BY_ID_FAIL'

export const ADD_BRANCH_AREA = 'ADD_BRANCH_AREA'
export const ADD_BRANCH_AREA_SUCCESS = 'ADD_BRANCH_AREA_SUCCESS'
export const ADD_BRANCH_AREA_FAIL = 'ADD_BRANCH_AREA_FAIL'

export const EDIT_BRANCH_AREA = 'EDIT_BRANCH_AREA'
export const EDIT_BRANCH_AREA_SUCCESS = 'EDIT_BRANCH_AREA_SUCCESS'
export const EDIT_BRANCH_AREA_FAIL = 'EDIT_BRANCH_AREA_FAIL'

export const DELETE_BRANCH_AREA = 'DELETE_BRANCH_AREA'
export const DELETE_BRANCH_AREA_SUCCESS = 'DELETE_BRANCH_AREA_SUCCESS'
export const DELETE_BRANCH_AREA_FAIL = 'DELETE_BRANCH_AREA_FAIL'

export function getBranchAreaBySearchCriteria(criteria) {
  return (dispatch) => {
    dispatch({ type: GET_BRANCH_AREA, criteria: criteria});
  }
}

export function getBranchAreaById(id) {
  return (dispatch) => {
    dispatch({ type: GET_BRANCH_AREA_BY_ID, data: { id: id }});
  }
}

export function addBranchArea(data) {
  return (dispatch) => {
    dispatch({ type: ADD_BRANCH_AREA, data: data});
  }
}

export function editBranchArea(id, model) {
  return (dispatch) => {
    dispatch({ type: EDIT_BRANCH_AREA, data: { id: id, model: model } });
  }
}

export function deleteBranchArea(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_BRANCH_AREA, data: { id: id }});
  }
}
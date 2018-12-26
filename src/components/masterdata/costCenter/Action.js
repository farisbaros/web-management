export const GET_COST_CENTER = 'GET_COST_CENTER'
export const GET_COST_CENTER_SUCCESS = 'GET_COST_CENTER_SUCCESS'
export const GET_COST_CENTER_FAIL = 'GET_COST_CENTER_FAIL'

export const GET_BRANCH = 'GET_BRANCH'
export const GET_BRANCH_SUCCESS = 'GET_BRANCH_SUCCESS'
export const GET_BRANCH_FAIL = 'GET_BRANCH_FAIL'

export const GET_COST_CENTER_BY_ID = 'GET_BRANCH_AREA_BY_ID'
export const GET_COST_CENTER_BY_ID_SUCCESS = 'GET_BRANCH_AREA_BY_ID_SUCCESS'
export const GET_COST_CENTER_BY_ID_FAIL = 'GET_BRANCH_AREA_BY_ID_FAIL'

export const ADD_COST_CENTER = 'ADD_COST_CENTER'
export const ADD_COST_CENTER_SUCCESS = 'ADD_COST_CENTER_SUCCESS'
export const ADD_COST_CENTER_FAIL = 'ADD_COST_CENTER_FAIL'

export const EDIT_COST_CENTER = 'EDIT_COST_CENTER'
export const EDIT_COST_CENTER_SUCCESS = 'EDIT_COST_CENTER_SUCCESS'
export const EDIT_COST_CENTER_FAIL = 'EDIT_COST_CENTER_FAIL'

export const DELETE_COST_CENTER = 'DELETE_COST_CENTER'
export const DELETE_COST_CENTER_SUCCESS = 'DELETE_COST_CENTER_SUCCESS'
export const DELETE_COST_CENTER_FAIL = 'DELETE_COST_CENTER_FAIL'

export function getCostCenterByCriteria(criteria) {
  return (dispatch) => {
    dispatch({ type: GET_COST_CENTER, criteria: criteria});
  }
}

export function getBranch(criteria) {
  return (dispatch) => {
    dispatch({ type: GET_BRANCH, criteria: criteria});
  }
}

export function getCostCenterById(criteria) {
  return (dispatch) => {
    dispatch({ type: GET_COST_CENTER_BY_ID, criteria: criteria});
  }
}

export function addCostCenter(data) {
  return (dispatch) => {
    dispatch({ type: ADD_COST_CENTER, data:{data: data}});
  }
}

export function editCostCenter(id, model) {
  return (dispatch) => {
    dispatch({ type: EDIT_COST_CENTER, data: {id:id,model:model}});
  }
}

export function deleteCostCenter(id) {
  return (dispatch) => {
    dispatch({ type: DELETE_COST_CENTER, data: {id:id}});
  }
}
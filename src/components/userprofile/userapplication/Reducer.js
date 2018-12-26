//import { combineReducers } from 'redux'
//import { reducer as formReducer } from 'redux-form';
import * as actionType from './Action';

const initialState = {
  loading: false,
  currentAction: '',
  error: null,
  data: {
    content: [],
    totalPages: 0
  },
  model: {},
  user: [],
  client: [],
  group: [],
  branchArea: [],
  costCenter: []
};

export const userApplicationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_USER_APPLICATION:
      return {
        ...state,
        loading: true,
        currentAction: action.type
      };
    case actionType.GET_USER_APPLICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        data: action.payload
      };
    case actionType.GET_USER_APPLICATION_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };

    case actionType.GET_USER_APPLICATION_BY_ID:
      return {
        ...state,
        loading: true,
        currentAction: action.type
      };
    case actionType.GET_USER_APPLICATION_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        model: action.payload
      };
    case actionType.GET_USER_APPLICATION_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };

    case actionType.ADD_USER_APPLICATION:
      return {
        ...state,
        loading: true,
        currentAction: action.type
      };
    case actionType.ADD_USER_APPLICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        data: action.payload
      };
    case actionType.ADD_USER_APPLICATION_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };

    case actionType.EDIT_USER_APPLICATION:
      return {
        ...state,
        loading: true,
        currentAction: action.type
      };
    case actionType.EDIT_USER_APPLICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        model: action.data
      };
    case actionType.EDIT_USER_APPLICATION_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };

    case actionType.DELETE_USER_APPLICATION:
      return {
        ...state,
        loading: true,
        currentAction: action.type
      };
    case actionType.DELETE_USER_APPLICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type
      };
    case actionType.DELETE_USER_APPLICATION_FAIL:
      return {
        ...state,
        loading: true,
        currentAction: action.type,
        error: action.error
      };

    case actionType.GET_USER:
      return {
        ...state,
        loading: true,
        currentAction: action.type
      };
    case actionType.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        user: action.payload
      };
    case actionType.GET_USER_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };

    case actionType.GET_CLIENT:
      return {
        ...state,
        loading: true,
        currentAction: action.type
      };
    case actionType.GET_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        client: action.payload
      };
    case actionType.GET_CLIENT_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };

    case actionType.GET_GROUP:
      return {
        ...state,
        loading: true,
        currentAction: action.type
      };
    case actionType.GET_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        group: action.payload
      };
    case actionType.GET_GROUP_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };

    case actionType.GET_BRANCH_AREA:
      return {
        ...state,
        loading: true,
        currentAction: action.type
      };
    case actionType.GET_BRANCH_AREA_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        branchArea: action.payload
      };
    case actionType.GET_BRANCH_AREA_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };

    case actionType.GET_COST_CENTER:
      return {
        ...state,
        loading: true,
        currentAction: action.type
      };
    case actionType.GET_COST_CENTER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        costCenter: action.payload
      };
    case actionType.GET_COST_CENTER_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };

    default:
      return state;
  }
}

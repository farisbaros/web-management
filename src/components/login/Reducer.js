import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import * as actionType from './Action'

const initialState = {
  loading: false,
  error: null,
  data: {},
  currentAction: ''
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.LOGIN_INIT:
      return {
        ...state,
        loading: false,
        data: {},
        currentAction: action.type
      };

    case actionType.LOGIN_INIT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {},
        currentAction: action.type
      };

    case actionType.LOGIN:
      return {
        ...state,
        loading: true,
        currentAction: action.type
      };

    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        currentAction: action.type
      };

    case actionType.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        currentAction: action.type
      };

    default:
      return state;
  }
}

//import { combineReducers } from 'redux'
//import { reducer as formReducer } from 'redux-form'
import * as actionType from './Action'

const initialState = {
  loading: false,
  error: null,
  data: {}
};

export const loginReducer = (state = initialState, action) => {
  // debugger;
  switch (action.type) {
    case actionType.LOGOUT:
      return {
        ...state,
        loading: true
      };

    case actionType.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case actionType.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}

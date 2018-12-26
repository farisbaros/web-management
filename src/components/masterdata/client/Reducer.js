import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form';
import * as actionType from './Action';


const initialState = {
  criteria: {},
  loading: false,
  error: null,
  data: []
};

export const clientReducer = (state = initialState, action) => {
  // debugger;
  switch(action.type) {
    case actionType.GET_CLIENT:
      return {
        ...state,
        loading: true
      };

    case actionType.GET_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case actionType.GET_CLIENT_FAIL:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}

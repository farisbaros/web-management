import * as actionType from './Action'

const initialState = {
  loading: false,
  currentAction: '',
  error: null,
  data: {
    content: [],
    totalPages: 0
  },
  model: {},
  dataUserObject: [],
  dataAccessObject: []
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
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
        data: action.payload
      };
    case actionType.GET_USER_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };

    case actionType.GET_USER_BY_ID:
      return {
        ...state,
        loading: true,
        currentAction: action.type,
      };
    case actionType.GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        model: action.payload
      };
    case actionType.GET_USER_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };

    case actionType.GET_ACCESS_OBJ:
      return {
        ...state,
        loading: true,
        currentAction: action.type,
      };
    case actionType.GET_ACCESS_OBJ_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        dataAccessObject: action.payload
      };
    case actionType.GET_ACCESS_OBJ_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };

    case actionType.ADD_USER_INIT:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
      };
    case actionType.ADD_USER:
      return {
        ...state,
        loading: true,
        currentAction: action.type,
      };
    case actionType.ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        data: action.payload
      };
    case actionType.ADD_USER_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };

    case actionType.EDIT_USER:
      return {
        ...state,
        loading: true,
        currentAction: action.type,
      };
    case actionType.EDIT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        model: action.payload
      };
    case actionType.EDIT_USER_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };

    case actionType.DELETE_USER:
      return {
        ...state,
        loading: true,
        currentAction: action.type,
      };
    case actionType.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type
      };
    case actionType.DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };

    case actionType.GET_USER_OBJECT_BY_USER_ID:
      return {
        ...state,
        loading: true,
        currentAction: action.type
      };
    case actionType.GET_USER_OBJECT_BY_USER_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        dataUserObject: action.payload
      };
    case actionType.GET_USER_OBJECT_BY_USER_ID_FAIL:
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

import * as actionType from './Action';

const initialState = {
  loading: false,
  currentAction: '',
  criteria: {},
  error: null,
  data: {
    content: [],
    totalPages: 0
  }, 
  model: {}  
};

export const branchAreaReducer = (state = initialState, action) => {

  switch(action.type) {
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
        data: action.payload,
        currentAction: action.type
    };

    case actionType.GET_BRANCH_AREA_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
    };

    case actionType.GET_BRANCH_AREA_BY_ID:
      return {
        ...state,
        loading: true,
        currentAction: action.type
    };

    case actionType.GET_BRANCH_AREA_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        model: action.payload,
        currentAction: action.type
    };

    case actionType.GET_BRANCH_AREA_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type
    };

    case actionType.ADD_BRANCH_AREA:
      return {
        ...state,
        loading: true,
        currentAction: action.type
    };

    case actionType.ADD_BRANCH_AREA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        currentAction: action.type
    };
    
    case actionType.ADD_BRANCH_AREA_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
    };

    case actionType.EDIT_BRANCH_AREA:
      return {
        ...state,
        loading: true,
        currentAction: action.type
    };

    case actionType.EDIT_BRANCH_AREA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        currentAction: action.type
    };
    
    case actionType.EDIT_BRANCH_AREA_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
    };

    case actionType.DELETE_BRANCH_AREA:
      return {
        ...state,
        loading:true,
        currentAction: action.type
    };

    case actionType.DELETE_BRANCH_AREA_SUCCESS:
      return {
        ...state,
        loading:false,
        currentAction: action.type
    };
    
    case actionType.DELETE_BRANCH_AREA_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error:action.error
    };

    default:
    return state;
  }
}

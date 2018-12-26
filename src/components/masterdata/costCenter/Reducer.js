import * as actionType from './Action';

const initialState = {
  criteria: {},
  loading: false,
  error: null,
  data: {
    content: [],
    totalPages: 0
  }, 
  model:{},
  currentAction: null,
  branchList: []
};

export const costCenterReducer = (state = initialState, action) => {
  
  switch(action.type) {
    case actionType.GET_COST_CENTER:
      return {
        ...state,
        loading: true,
        currentAction: action.type,
       };

    case actionType.GET_COST_CENTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        currentAction: action.type
      };

    case actionType.GET_COST_CENTER_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };

      case actionType.GET_BRANCH:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
      };
    
      case actionType.GET_BRANCH_SUCCESS:
      return {
        ...state,
        loading: false,
        branchList: action.payload,
        currentAction: action.type,
      };
    
      case actionType.GET_BRANCH_FAIL:
      return {
        ...state,
        loading: false,
        branchList: action.payload,
        currentAction: action.type,
        error: action.error
      };

      case actionType.GET_COST_CENTER_BY_ID:
      return {
        ...state,
        loading: true,
        currentAction: action.type,
      };

    case actionType.GET_COST_CENTER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        model: action.payload,
        currentAction: action.type
      };

    case actionType.GET_COST_CENTER_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };
    
      case actionType.ADD_COST_CENTER:
      return {
        ...state,
        loading: true,
        currentAction: action.type,
      };

    case actionType.ADD_COST_CENTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        currentAction: action.type
      };
    
    case actionType.ADD_COST_CENTER_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };

      case actionType.EDIT_COST_CENTER:
      return {
        ...state,
        loading: true,
        currentAction: action.type,
      };

    case actionType.EDIT_COST_CENTER_SUCCESS:
      return {
        ...state,
        loading: false,
        model: action.payload,
        currentAction: action.type
      };
    
    case actionType.EDIT_COST_CENTER_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };

      case actionType.DELETE_COST_CENTER:
      return {
        ...state,
        loading: true,
        currentAction: action.type,
      };

    case actionType.DELETE_COST_CENTER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        currentAction: action.type
      };
    
    case actionType.DELETE_COST_CENTER_FAIL:
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

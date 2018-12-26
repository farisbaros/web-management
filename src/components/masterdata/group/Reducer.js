import * as actionType from './Action';

const initialState = {
  criteria: {},
  loading: false,
  error: null,
  data: [],
  model: {},
  client: [],
  operator: [],
  portGsm: [],
  privileges:[]
};

export const groupReducer = (state = initialState, action) => {
  
  switch(action.type) {
    case actionType.GET_GROUP:
      return {
        ...state,
        loading: true
      };

    case actionType.GET_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };

    case actionType.GET_GROUP_FAIL:
      return {
        ...state,
        loading: false
      };
    
      case actionType.GET_GROUP_BY_ID:
      return {
        ...state,
        loading: true
      };

    case actionType.GET_GROUP_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        model: action.payload
      };

    case actionType.GET_GROUP_BY_ID_FAIL:
      return {
        ...state,
        loading: false
      };

      case actionType.ADD_GROUP:
      return {
        ...state,
        loading: true
      };

    case actionType.ADD_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    
    case actionType.ADD_GROUP_FAIL:
      return {
        ...state,
        loading: false
      };

      case actionType.UPDATE_GROUP:
      return {
        ...state,
        loading: true
      };

    case actionType.UPDATE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    
    case actionType.UPDATE_GROUP_FAIL:
      return {
        ...state,
        loading: false
      };

      case actionType.DELETE_GROUP:
      return {
        ...state,
        loading: true
      };

    case actionType.DELETE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    
    case actionType.DELETE_GROUP_FAIL:
      return {
        ...state,
        loading: false
      };

    case actionType.GET_CLIENT:
      return {
        ...state,
        loading: true
    };

    case actionType.GET_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        client: action.payload
    };

    case actionType.GET_CLIENT_FAIL:
      return {
        ...state,
        loading: false
      };
    
      case actionType.GET_PORT_GSM:
      return {
        ...state,
        loading: true
    };

    case actionType.GET_PORT_GSM_SUCCESS:
      return {
        ...state,
        loading: false,
        portGsm: action.payload
    };

    case actionType.GET_PORT_GSM_FAIL:
      return {
        ...state,
        loading: false
    };
    
      case actionType.GET_OPERATOR:
      return {
        ...state,
        loading: true
      };

    case actionType.GET_OPERATOR_SUCCESS:
      return {
        ...state,
        loading: false,
        operator: action.payload
      };

    case actionType.GET_OPERATOR_FAIL:
      return {
        ...state,
        loading: false
      };
    
      case actionType.GET_PRIVILEGES:
      return {
        ...state,
        loading: true
      };

    case actionType.GET_PRIVILEGES_SUCCESS:
      return {
        ...state,
        loading: false,
        privileges: action.payload
      };

    case actionType.GET_PRIVILEGES_FAIL:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}
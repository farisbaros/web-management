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
  dataVendor: [],
  dataOperator: [],
  dataGsmPort: [],
  dataClientGsm: []
};

export const clientReducer = (state = initialState, action) => {

  switch(action.type) {
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
        data: action.payload
      };
    case actionType.GET_CLIENT_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };
    case actionType.GET_CLIENT_BY_ID:
      return {
        ...state,
        loading: true,
        currentAction: action.type
      };
    case actionType.GET_CLIENT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        model: action.payload
      };
    case actionType.GET_CLIENT_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };
    case actionType.ADD_CLIENT:
      return {
        ...state,
        loading: true,
        currentAction: action.type
      };
    case actionType.ADD_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        model: action.payload,
      };
    case actionType.ADD_CLIENT_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };
    
    case actionType.EDIT_CLIENT:
      return {
        ...state,
        loading: true,
        currentAction: action.type,
      };
    case actionType.EDIT_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        model: action.payload
      };
    case actionType.EDIT_CLIENT_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };
    case actionType.DELETE_CLIENT:
      return {
        ...state,
        loading: true,
        currentAction: action.type,
      };
    case actionType.DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        model: action.payload
      };
    case actionType.DELETE_CLIENT_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };
    case actionType.GET_VENDOR:
      return {
        ...state,
        loading: true,
        currentAction: action.type,
      };
    case actionType.GET_VENDOR_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        dataVendor: action.payload
      };
    case actionType.GET_VENDOR_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };
    case actionType.GET_OPERATOR:
      return {
        ...state,
        loading: true,
        currentAction: action.type,
      };
    case actionType.GET_OPERATOR_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        dataOperator: action.payload
      };
    case actionType.GET_OPERATOR_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };
    case actionType.GET_GSM_PORT:
      return {
        ...state,
        loading: true,
        currentAction: action.type,
      };
    case actionType.GET_GSM_PORT_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        dataGsmPort: action.payload
      };
    case actionType.GET_GSM_PORT_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };
    case actionType.GET_CLIENT_GSM:
      return {
        ...state,
        loading: true,
        currentAction: action.type,
      };
    case actionType.GET_CLIENT_GSM_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        dataClientGsm: action.payload
      };
    case actionType.GET_CLIENT_GSM_FAIL:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        error: action.error
      };
    case actionType.GET_CLIENT_GSM_EXCEPT_CLIENTID:
      return {
        ...state,
        loading: true,
        currentAction: action.type,
      };
    case actionType.GET_CLIENT_GSM_EXCEPT_CLIENTID_SUCCESS:
      return {
        ...state,
        loading: false,
        currentAction: action.type,
        dataClientGsm: action.payload
      };
    case actionType.GET_CLIENT_GSM_EXCEPT_CLIENTID_FAIL:
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

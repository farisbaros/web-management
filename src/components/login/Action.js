export const LOGIN_INIT = "LOGIN_INIT";
export const LOGIN_INIT_SUCCESS = "LOGIN_INIT_SUCCESS";
export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export function loginInit() {
  return dispatch => {
    dispatch({ type: LOGIN_INIT });
  };
}

export function login(params) {
  return dispatch => {
    dispatch({ type: LOGIN, params: params });
  };
}

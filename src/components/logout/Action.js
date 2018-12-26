export const LOGOUT = 'LOGOUT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'

export function logout() {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
  }
}

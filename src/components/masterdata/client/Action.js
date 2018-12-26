export const GET_CLIENT = 'GET_CLIENT'
export const GET_CLIENT_SUCCESS = 'GET_CLIENT_SUCCESS'
export const GET_CLIENT_FAIL = 'GET_CLIENT_FAIL'


export function getClient(criteria) {
  return (dispatch) => {
    dispatch({ type: GET_CLIENT, criteria: criteria});
  }
}

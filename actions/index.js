import {API_ROOT, INITIAL_FETCH} from '../utils/constants.js'


export function initialFetch() {
  return (dispatch) => {
    const request = fetch(
        `${API_ROOT}/shifts`, {
          method: 'GET',
        }
      );
    return request.then(r => r.json()).then(
      response => dispatch({ type: INITIAL_FETCH, payload: { shifts: response } }),
      (err) => {
        console.log(err);
      },
    );
  };
}

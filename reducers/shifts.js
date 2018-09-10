import { createReducer } from '../utils';
import {
  INITIAL_FETCH
} from '../utils/constants';

const initialState = {
  shifts: [],
  init_loading: true,
};

export default createReducer(initialState, {
  [INITIAL_FETCH]: (state, payload) => Object.assign({}, state, {
    ...state,
    init_loading: false,
    shifts: payload.shifts,
  }),
});

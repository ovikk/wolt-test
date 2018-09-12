import { createReducer } from "../utils";
import { END_FETCHING } from "../utils/constants";

const initialState = {
    shifts: [],
    init_loading: true,
    test: false
};

export default createReducer(initialState, {
    [END_FETCHING]: (state, payload) =>
        Object.assign({}, state, {
            ...state,
            init_loading: false,
            shifts: payload.shifts
        }),
});

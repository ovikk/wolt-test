import { createReducer } from "../utils";
import { END_FETCHING, LOADING_SHIFT, BOOKED_SHIFT, CANCELED_SHIFT, PARSE_OVERLAPPING, CANCEL_LOADING, START_FETCHING } from "../utils/constants";

function checkOverlap(a, b) {
    if (!a.booked) return false;
    if (a === b) return false;
    return Math.max(a.startTime, b.startTime) < Math.min(a.endTime, b.endTime);
}

const initialState = {
    shifts: [],
    loading: true,
    init_loading: true,
};

export default createReducer(initialState, {
    [START_FETCHING]: (state, payload) =>
        Object.assign({}, state, {
            ...state,
            loading: true,
        }),
    [END_FETCHING]: (state, payload) =>
        Object.assign({}, state, {
            ...state,
            loading: false,
            init_loading: false,
            shifts: payload.shifts
        }),
    [LOADING_SHIFT]: (state, payload) => {
        const newShifts = state.shifts.slice();
        const { shift } = payload;
        newShifts[shift.index].loading = true;
        return Object.assign({}, state, {
            ...state,
            shift: newShifts
        });
    },
    [CANCEL_LOADING]: (state, payload) => {
        const newShifts = state.shifts.slice();
        const { shift } = payload;
        newShifts[shift.index].loading = false;
        return Object.assign({}, state, {
            ...state,
            shift: newShifts
        });
    },
    [BOOKED_SHIFT]: (state, payload) => {
        const newShifts = state.shift.slice();
        const { shift } = payload;
        newShifts[shift.index].booked = true;
        newShifts[shift.index].loading = false;
        return Object.assign({}, state, {
            ...state,
            shift: newShifts
        });
    },
    [CANCELED_SHIFT]: (state, payload) => {
        const newShifts = state.shift.slice();
        const { shift } = payload;
        newShifts[shift.index].booked = false;
        newShifts[shift.index].loading = false;
        return Object.assign({}, state, {
            ...state,
            shift: newShifts
        });
    },
    [PARSE_OVERLAPPING]: state => {
        const newShifts = state.shift.slice().map(o => {
            let overlap = false;
            state.shifts.map(l => {
                if (checkOverlap(l, o)) overlap = true;
            });

            o.overlap = overlap;
            return o;
        });
        return Object.assign({}, state, {
            ...state,
            shift: newShifts
        });
    }
});

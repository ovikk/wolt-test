import { API_ROOT, END_FETCHING, START_FETCHING, LOADING_SHIFT, BOOKED_SHIFT, CANCELED_SHIFT, PARSE_OVERLAPPING, CANCEL_LOADING } from "../utils/constants.js";
import moment from "moment";

export function fetchShifts() {
    return dispatch => {
        dispatch({ type: START_FETCHING });
        const request = fetch(`${API_ROOT}/shifts`, {
            method: "GET"
        });
        return request.then(r => r.json()).then(
            response => {
                dispatch({ type: END_FETCHING, payload: { shifts: parseShifts(response) } });
            },
            err => {
                console.log(err);
            }
        );
    };
}

function checkOverlap(a, b) {
    if (!a.booked) return false;
    if (a === b) return false;
    return Math.max(a.startTime, b.startTime) < Math.min(a.endTime, b.endTime);
}

function parseShifts(shifts) {
    const now = moment();

    return shifts
        .filter(o => {
            const start = moment(o.startTime);
            const end = moment(o.endTime);

            if (now.diff(end) > 0) {
                return false;
            } else if (now.diff(start) > 0) {
                if (o.booked) o.ongoing = true;
                else return false;
            }

            let overlap = false;
            shifts.map(l => {
                if (checkOverlap(l, o)) overlap = true;
            });

            o.overlap = overlap;

            if (start.format("MMMM Do") === now.format("MMMM Do")) {
                o.day = "Today";
            } else if (start.subtract(1, "day").format("MMMM Do") === now.format("MMMM Do")) {
                o.day = "Tomorrow";
            } else {
                o.day = start.format("MMMM Do");
            }

            o.duration = moment.duration(end.diff(start)).hours();
            o.startHour = start.format("HH:mm");
            o.endHour = end.format("HH:mm");

            return true;
        })
        .sort((a, b) => a.startTime - b.startTime)
        .map((o, i) => {
            o.index = i;
            return o;
        });
}

export function bookShift(shift) {
    return dispatch => {
        dispatch({ type: LOADING_SHIFT, payload: { shift } });

        const request = fetch(`${API_ROOT}/shifts/${shift.id}/book`, {
            method: "POST"
        });

        return request.then(
            response => {
                if (response.ok) {
                    dispatch({ type: BOOKED_SHIFT, payload: { shift } });
                    dispatch({ type: PARSE_OVERLAPPING });
                } else {
                    dispatch({ type: CANCEL_LOADING, payload: { shift } });
                }
            },
            err => {
                console.log(err);
            }
        );
    };
}

export function cancelShift(shift) {
    return dispatch => {
        dispatch({ type: LOADING_SHIFT, payload: { shift } });

        const request = fetch(`${API_ROOT}/shifts/${shift.id}/cancel`, {
            method: "POST"
        });

        return request.then(
            response => {
                if (responce.ok) {
                    dispatch({ type: CANCELED_SHIFT, payload: { shift } });
                    dispatch({ type: PARSE_OVERLAPPING });
                } else {
                    dispatch({ type: CANCEL_LOADING, payload: { shift } });
                }
            },
            err => {
                console.log(err);
            }
        );
    };
}

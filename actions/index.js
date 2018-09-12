import { API_ROOT, END_FETCHING, START_FETCHING } from "../utils/constants.js";
import moment from "moment";

export function fetchShifts() {
    return dispatch => {
        dispatch({ type: START_FETCHING });
        const request = fetch(`${API_ROOT}/shifts`, {
            method: "GET"
        });
        return request
            .then(r => r.json())
            .then(
                response => {
                    dispatch({ type: END_FETCHING, payload: { shifts: parseShifts(response) } });
                },
                err => {
                    console.log(err);
                }
            )
    };
}

function parseShifts(shifts) {
    console.log(shifts);
    const now = moment();

    const h = shifts.filter(o => {
        const start = moment(o.startTime);
        const end = moment(o.endTime);

        if (now.diff(end) > 0) {
            return false;
        } else if (now.diff(start) > 0 && o.booked) {
            o.ongoing = true;
        }

        if (start.format("MMMM Do") === now.format("MMMM Do")) {
            o.day = "Today";
        } else if (start.subtract(1, "day").format("MMMM do") === now.format("MMMM Do")) {
            o.day = "Tomorrow";
        } else {
            o.day = start.format("MMMM do");
        }
        o.duration = moment.duration(end.diff(start)).hours();

        return true;
    });
    console.log(h);
    return (h)
}

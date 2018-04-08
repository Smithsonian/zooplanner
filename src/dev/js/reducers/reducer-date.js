
const initialState = {
    hours: null,
    date: fillDate(),
    hoursFetched: false,
    eventFetched: false,
    notesFetched: false,
    event: [],
    notes: "No Notes",
}

function fillDate() {
    var hash = window.location.hash.substring(6, 23);
    if (hash === "") {
        return null;
    } else {
        const date = hash.replace(/%20/g, " ");
        return date;
    }
}

function stateToString(date) {
    var tripHash = window.location.hash.substring(23);
    var str = "date=" + date;
    window.location.hash = str + tripHash;
}

export default function(state=initialState, action) {
    switch(action.type) {
        case "FETCH_EVENT_FULFILLED": {
            return {...state, eventFetched: true, event: action.payload.data}
        }
        case "DATE_INPUTTED": {
            stateToString(action.payload)
            return {...state, date: action.payload}
        }
        case "FETCH_HOURS_FULFILLED": {
            return {...state, hoursFetched: true, hours: action.payload.data, notes: action.payload.data}
        }
        default: return state;
    }
}


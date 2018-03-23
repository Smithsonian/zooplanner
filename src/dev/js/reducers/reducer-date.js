const initialState = {
    hours: null,
    date: null,
    hoursFetched: false,
    eventFetched: false,
    notesFetched: false,
    event: [],
    notes: "No Notes",
}

export default function(state=initialState, action) {
    switch(action.type) {
        case "FETCH_EVENT_FULFILLED": {
            return {...state, eventFetched: true, event: action.payload.data}
        }
        case "DATE_INPUTTED": {
            return {...state, date: action.payload}
        }
        case "FETCH_HOURS_FULFILLED": {
            return {...state, hoursFetched: true, hours: action.payload.data, notes: action.payload.data}
        }
        default: return state;
    }
}


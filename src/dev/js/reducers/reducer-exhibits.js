const initialState = {
    fetching: false,
    fetched: false,
    exhibits: [],
    error: null,
    type: "exhibit"
}

export default function(state=initialState, action) {
    switch(action.type) {
        case "FETCH_EXHIBITS_PENDING": {
            return {...state, fetching: true}
        }
        case "FETCH_EXHIBITS_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_EXHIBITS_FULFILLED": {
            return {...state, fetching: false, fetched: true, exhibits: action.payload.data}
        }
    }
    return state
}
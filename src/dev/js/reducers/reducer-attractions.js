const initialState = {
    fetching: false,
    fetched: false,
    attractions: [],
    error: null,
    type: "attraction",
}

export default function(state=initialState, action) {
    switch(action.type) {
        case "FETCH_ATTRACTIONS_PENDING": {
            return {...state, fetching: true}
        }
        case "FETCH_ATTRACTIONS_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_ATTRACTIONS_FULFILLED": {
            return {...state, fetching: false, fetched: true, attractions: action.payload.data}
        }
        default: {return state}
    }
}
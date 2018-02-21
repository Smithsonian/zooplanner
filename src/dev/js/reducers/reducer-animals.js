const initialState = {
    fetching: false,
    fetched: false,
    animals: [],
    error: null,
}

export default function(state=initialState, action) {
    switch(action.type) {
        case "FETCH_ANIMALS_PENDING": {
            return {...state, fetching: true}
        }
        case "FETCH_ANIMALS_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_ANIMALS_FULFILLED": {
            return {...state, fetching: false, fetched: true, animals: action.payload.data}
        }
    }
    return state
}
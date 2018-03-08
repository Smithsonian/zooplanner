const initialState = {
    fetching: false,
    fetched: false,
    animalsFetching: false,
    animalsFetched: false,
    exhibits: [],
    animals: [],
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
        case "FETCH_ANIMALS_IN_EXHIBIT_PENDING": {
            return {...state, animalsFetching: true}
        }
        case "FETCH_ANIMALS_IN_EXHIBIT_FULFILLED": {
            return {...state, animalsFetching:false, animalsFetched:true, animals: action.payload.data}
        }
        case "UNFETCH": {
            return {...state, animalsFetched: action.payload, animals: []}
        }
        default: {return state}
    }
}
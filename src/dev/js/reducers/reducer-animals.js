const initialState = {
    fetching: false,
    fetched: false,
    animals: [],
    error: null,
    type: "animal",
    expandAnimal: null,
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
        case "EXPAND_ANIMAL": {
            return {...state, expandAnimal: action.payload}
        }
        case "UNEXPAND_ANIMAL": {
            return {...state, expandAnimal: action.payload}
        }
        default: return state
    }
}
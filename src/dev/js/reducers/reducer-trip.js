const initialState = {
    trip: [],

}

export default function(state=initialState, action) {
    switch(action.type) {
        case "ADD_TO_TRIP": {
            return {...state, trip: [...state.trip, action.payload]}
        }
        case "CLEAR_TRIP": {
            return {...state, trip: []}
        }
        case "REMOVE_FROM_TRIP": {
            return {...state, trip: state.trip.filter(item => item !== action.payload)}
        }
        default: {
            return state
        }
    }
}
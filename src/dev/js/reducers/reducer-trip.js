const initialState = {
    trip: [],

}

export default function(state=initialState, action) {
    switch(action.type) {
        case "ADD_TO_TRIP": {
            console.log(action.payload[1], "action.payload")
            return {...state, trip: [...state.trip, action.payload[1]]}
        }
    }
    return state
}
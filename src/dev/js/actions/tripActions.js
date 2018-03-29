import axios from 'axios'

export function addToTrip(item) {
    return {
        type: "ADD_TO_TRIP",
        payload: item
    }
}

export function clearTrip() {
    return {
        type: "CLEAR_TRIP",
        payload: null
    }
}
export function removeFromTrip(item) {
    return {
        type: "REMOVE_FROM_TRIP",
        payload: item
    }
}

export function updateTrip(newTrip) {
    return {
        type: "UPDATE_TRIP",
        payload: newTrip
    }
}

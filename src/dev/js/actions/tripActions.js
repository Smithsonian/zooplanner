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

export function optimizeTrip() {
    return {
        type: "OPTIMIZE_TRIP",
        payload: null
    }
}

export function updateDistances(distances) {
    return {
        type: "UPDATE_DISTANCES",
        payload: distances
    }
}

export function updateDurations(durations) {
    return {
        type: "UPDATE_DURATIONS",
        payload: durations
    }
}

export function importAnimals() {
    return function(dispatch) {
        dispatch ({
            type: "IMPORT_ANIMALS",
            payload: axios.get("https://nationalzoo.si.edu/pyd/views/animals?display_id=list")
        });
    }
}

export function importExhibits() {
    return function(dispatch) {
        dispatch({
            type: "IMPORT_EXHIBITS",
            payload: axios.get("https://nationalzoo.si.edu/pyd/views/exhibit_list?display_id=exhibits")
        });
    }
}

export function importRestrooms(restrooms) {
    return {
        type: "IMPORT_RESTROOMS",
        payload: restrooms
    }
}

export function importDailyPrograms() {
    return function(dispatch) {
        dispatch({
            type: "IMPORT_DAILY_PROGRAMS",
            payload: axios.get("https://www.trumba.com/calendars/national-zoo-daily-zoo-activities.json?startDateTime=")
        });
    }
}

export function importAttractions() {
    return function(dispatch) {
        dispatch({
            type: "IMPORT_ATTRACTIONS",
            payload: axios.get("https://nationalzoo.si.edu/pyd/views/attractions?display_id=attractions")
        });
    }
}
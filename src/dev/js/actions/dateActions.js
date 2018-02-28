import axios from 'axios';

export function setDate(date) {
    return {
        type: "DATE_INPUTTED",
        payload: date
    }
}

export function fetchHours(hoursAPI) {
    return function(dispatch) {
        dispatch({
            type: "FETCH_HOURS",
	        payload: axios.get(hoursAPI)
        })
    }
}

export function fetchEvent(eventsAPI) {
    return function(dispatch) {
        dispatch({
            type: "FETCH_EVENT",
	        payload: axios.get(eventsAPI)
        })
    }
}
// export function fetchNotes() {
//     return function(dispatch) {
//         dispatch({
//             type: "FETCH_NOTES",
// 	        payload: axios.get(notesAPI)
//         })
//     }
// }
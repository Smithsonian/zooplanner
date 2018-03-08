import axios from 'axios';

export function fetchExhibits() {
    return function(dispatch) {
        dispatch({
            type: "FETCH_EXHIBITS",
	        payload: axios.get('https://nationalzoo.si.edu/pyd/views/exhibit_list?display_id=exhibits')
        })
    }
}

export function fetchAnimalsInExhibit(exhibitNID) {
    const html = 'https://nationalzoo.si.edu/pyd/views/animals?display_id=list&exhibit=' + exhibitNID
    return function(dispatch) {
        dispatch({
            type: "FETCH_ANIMALS_IN_EXHIBIT",
            payload: axios.get(html)
        });     
    }
}

export function unfetch() {
    return {
        type: "UNFETCH",
        payload: false
    }
}
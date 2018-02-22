import axios from 'axios';

export function fetchExhibits() {
    return function(dispatch) {
        dispatch({
            type: "FETCH_EXHIBITS",
	        payload: axios.get('https://nationalzoo.si.edu/pyd/views/exhibit_list?display_id=exhibits')
        })
    }
}
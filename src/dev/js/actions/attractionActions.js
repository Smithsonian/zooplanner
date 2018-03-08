import axios from 'axios';

export function fetchAttractions() {
    return function(dispatch) {
        dispatch({
            type: "FETCH_ATTRACTIONS",
            payload: axios.get('https://nationalzoo.si.edu/pyd/views/attractions?display_id=attractions'),
        });
    }
}
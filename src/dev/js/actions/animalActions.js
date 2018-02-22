import axios from 'axios';

export function fetchAnimals() {
    return function(dispatch) {
        dispatch({
            type: "FETCH_ANIMALS",
	        payload: axios.get('https://nationalzoo.si.edu/pyd/views/animals?display_id=list')
        })
    }
}

export function expandAnimal(animal) {
    return {
        type: "EXPAND_ANIMAL",
        payload: animal[1]
    }
}

export function unexpandAnimal() {
    return {
        type: "UNEXPAND_ANIMAL",
        payload: null
    }
}
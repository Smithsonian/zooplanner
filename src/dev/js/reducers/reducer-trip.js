import axios from 'axios';

const initialState = {
    trip: fillTrip(),
}

function fillTrip() {
    var glossary = {}
    var currTrip = []
    axios.get("https://nationalzoo.si.edu/pyd/views/animals?display_id=list")
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                glossary[response.data[i].title] = response.data[i]
            }
            var hash = window.location.hash
            if (hash === "") {
                return []
            } else {
                hash = hash.split("&&")
                for (var i = 1; i < hash.length - 1; i++) {
                    currTrip[i-1] = hash[i].replace(/%20/g, " ")
                }
                
                for (var j = 0; j < currTrip.length; j++) {
                    currTrip[j] = glossary[currTrip[j]]
                    console.log(glossary[currTrip[j]])
                }
            }
        })
    return currTrip;
}

function stateToString(newTrip) {
    var str = "!trip=&&"
    for (var i = 0; i < newTrip.length; i++) {
        str += newTrip[i].title
        str += "&&"
    }
    window.location.hash = str
}


export default function(state=initialState, action) {
    switch(action.type) {
        case "ADD_TO_TRIP": {
            const newTrip = [...state.trip, action.payload]
            stateToString(newTrip)
            return {...state, trip: newTrip}
        }
        case "CLEAR_TRIP": {
            window.location.hash = "";
            return {...state, trip: []}
        }
        case "REMOVE_FROM_TRIP": {
            const newTrip = state.trip.filter(item => item !== action.payload);
            var str = ""
            stateToString(newTrip)
            return {...state, trip: newTrip}
        }
        case "UPDATE_TRIP": {
            const newTrip = action.payload
            stateToString(newTrip)
            return {...state, trip: newTrip}
        }
        default: {
            return state
        }
    }
}
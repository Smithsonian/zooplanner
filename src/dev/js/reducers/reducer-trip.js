import axios from 'axios';

const initialState = {
    trip: [],
    tripHash: window.location.hash.substring(23),
    importAnimalsPending: false,
    importAnimalsFulfilled: false,
}

// function fillTrip() {
//     var glossary = {}
//     var currTrip = []
//     axios.get("https://nationalzoo.si.edu/pyd/views/animals?display_id=list")
//         .then((response) => {
//             for (var i = 0; i < response.data.length; i++) {
//                 glossary[response.data[i].title] = response.data[i]
//             }
//             var hash = window.location.hash.substring(23);
//             if (hash === "") {
//                 return []
//             } else {
//                 hash = hash.split("&&")
//                 for (var i = 1; i < hash.length - 1; i++) {
//                     currTrip[i-1] = hash[i].replace(/%20/g, " ")
//                 }
                
//                 for (var j = 0; j < currTrip.length; j++) {
//                     currTrip[j] = glossary[currTrip[j]]
//                 }
//             }
//         })
//     return currTrip;
// }

function stateToString(newTrip) {
    var str = window.location.hash.substring(0, 23) + "!trip=&&";
    for (var i = 0; i < newTrip.length; i++) {
        str += newTrip[i].title
        str += "&&"
    }
    window.location.hash = str;
}


export default function(state=initialState, action) {
    switch(action.type) {
        case "ADD_TO_TRIP": {
            const newTrip = [...state.trip, action.payload]
            stateToString(newTrip)
            return {...state, trip: newTrip}
        }
        case "CLEAR_TRIP": {
            window.location.hash = window.location.hash.substring(0, 23);
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
        case "IMPORT_ANIMALS_PENDING": {
            return {...state, importAnimalsPending: true}
        }
        case "IMPORT_ANIMALS_FULFILLED": {
            var glossary = {};
            var currTrip = [];

            for (var i = 0; i < action.payload.data.length; i++) {
                glossary[action.payload.data[i].title] = action.payload.data[i]
            }
            var hash = window.location.hash.substring(23);
            if (hash === "") {
                return []
            } else {
                hash = hash.split("&&")
                for (var i = 1; i < hash.length - 1; i++) {
                    currTrip[i-1] = hash[i].replace(/%20/g, " ")
                }
                
                for (var j = 0; j < currTrip.length; j++) {
                    currTrip[j] = glossary[currTrip[j]]
                }
            }

            return {...state, trip: currTrip, importAnimalsPending: false, importAnimalsFulfilled: true}
        }
        default: {
            return state
        }
    }
}
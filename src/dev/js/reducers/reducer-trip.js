
const initialState = {
    trip: [],
    tripFromHash: stringToArr(),
    tripHash: window.location.hash.substring(23),
    importAnimalsPending: false,
    importAnimalsFulfilled: false,
    importExhibitsPending: false,
    importExhibitsFulfilled: false,
}

function stateToString(newTrip) {
    var str = window.location.hash.substring(0, 23) + "!trip=&&";
    for (var i = 0; i < newTrip.length; i++) {
        str += newTrip[i].title
        str += "&&"
    }
    window.location.hash = str;
}

function stringToArr() {
    var currTrip = [];
    var hash = window.location.hash.substring(23);
    console.log(hash, "HASHH");
    hash = hash.split("&&");
    for (var i = 1; i < hash.length - 1; i++) {
        currTrip[i-1] = hash[i].replace(/%20/g, " ")
    }
    return currTrip;
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
            const newTrip = state.trip.filter(item => item.title !== action.payload.title);
            const newTripFromHash = state.tripFromHash.filter(item => item !== action.payload.title)
            stateToString(newTrip)
            return {...state, trip: newTrip, tripFromHash: newTripFromHash}
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
            var tripFromHash = state.tripFromHash;
            var hash = state.tripHash;

            for (var i = 0; i < action.payload.data.length; i++) {
                if (action.payload.data[i].type === "Animal") {
                    glossary[action.payload.data[i].title] = action.payload.data[i];
                }
            }
            if (hash === "") {
                return [];
            } else {
                for (var j = 0; j < tripFromHash.length; j++) {
                    if (glossary[tripFromHash[j]] !== undefined) {
                        currTrip[j] = glossary[tripFromHash[j]];
                    }
                }
            }
            const updatedTrip = state.trip.concat(currTrip);
            return {...state, trip: updatedTrip, tripFromHash: tripFromHash, importAnimalsPending: false, importAnimalsFulfilled: true}
        }
        case "IMPORT_EXHIBITS_PENDING": {
            return {...state, importExhibitsPending: true}
        }
        case "IMPORT_EXHIBITS_FULFILLED": {
            glossary = {};
            currTrip = [];
            tripFromHash = state.tripFromHash;
            hash = state.tripHash;

            for (i = 0; i < action.payload.data.length; i++) {
                if (action.payload.data[i].type === "Exhibit") {
                    glossary[action.payload.data[i].title] = action.payload.data[i];
                }
            }
            if (hash === "") {
                return [];
            } else {
                for (j = 0; j < tripFromHash.length; j++) {
                    if (glossary[tripFromHash[j]] !== undefined) {
                        currTrip[j] = glossary[tripFromHash[j]];
                    }
                }
            }
            const updatedTrip = state.trip.concat(currTrip);
            return {...state, trip: updatedTrip, tripFromHash: tripFromHash, importExhibitsPending: false, importExhibitsFulfilled: true}
        }
        default: {
            return state
        }
    }
}

const initialState = {
    trip: [],
    tripFromHash: stringToArr(),
    tripHash: window.location.hash.substring(23),
    optimized: false,
    searchBarSource: [],
    importAnimalsPending: false,
    importAnimalsFulfilled: false,
    animalsImport: [],
    importExhibitsPending: false,
    importExhibitsFulfilled: false,
    exhibitsImport: [],
    importDailyProgramsPending: false,
    importDailyProgramsFulfilled: false,
    dailyProgramsImport: [],
    importAttractionsPending: false,
    importAttractionsFulfilled: false,
    attractionsImport: [],
    waypointDistances: [],
    waypointDurations: [],
}

function stateToString(newTrip) {
    var str = window.location.hash.substring(0, 23) + "!trip=&&";
    for (var i = 0; i < newTrip.length; i++) {
        if (newTrip[i] === undefined) {
            continue;
        }
        else if (newTrip[i].type === undefined) {
            str += newTrip[i].eventID
        } else {
            str += newTrip[i].title
        }
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
        case "UPDATE_DISTANCES": {
            return {...state, waypointDistances: action.payload}
        }
        case "UPDATE_DURATIONS": {
            return {...state, waypointDurations: action.payload}
        }
        case "OPTIMIZE_TRIP": {
            return {...state, optimized: !state.optimized}
        }
        case "IMPORT_ANIMALS_PENDING": {
            return {...state, importAnimalsPending: true}
        }
        case "IMPORT_ANIMALS_FULFILLED": {
            var glossary = {};
            var currTrip = [];
            var tripFromHash = state.tripFromHash;
            var hash = state.tripHash;
            var searchBarSource = state.searchBarSource;

            for (var i = 0; i < action.payload.data.length; i++) {
                if (action.payload.data[i].type === "Animal") {
                    glossary[action.payload.data[i].title] = action.payload.data[i];
                    searchBarSource.push({text: action.payload.data[i].title, type: "Animal"});
                }
            }
            if (hash === "") {
                return [];
            } else {
                for (var j = 0; j < tripFromHash.length; ) {
                    if (glossary[tripFromHash[j]] !== undefined) {
                        currTrip[j] = glossary[tripFromHash[j]];
                        j++
                    }
                }
            }
            const updatedTrip = state.trip.concat(currTrip);
            return {...state, trip: updatedTrip, tripFromHash: tripFromHash, importAnimalsPending: false, importAnimalsFulfilled: true, animalsImport: action.payload.data, searchBarSource: searchBarSource}
        }
        case "IMPORT_EXHIBITS_PENDING": {
            return {...state, importExhibitsPending: true}
        }
        case "IMPORT_EXHIBITS_FULFILLED": {
            glossary = {};
            currTrip = [];
            tripFromHash = state.tripFromHash;
            hash = state.tripHash;
            var searchBarSource = state.searchBarSource;

            for (i = 0; i < action.payload.data.length; i++) {
                if (action.payload.data[i].type === "Exhibit") {
                    glossary[action.payload.data[i].title] = action.payload.data[i];
                    searchBarSource.push({text: action.payload.data[i].title, type: "Exhibit"});
                }
            }
            if (hash === "") {
                return [];
            } else {
                for (j = 0; j < tripFromHash.length; ) {
                    if (glossary[tripFromHash[j]] !== undefined) {
                        currTrip[j] = glossary[tripFromHash[j]];
                        j++
                    }
                }
            }
            const updatedTrip = state.trip.concat(currTrip);
            return {...state, trip: updatedTrip, tripFromHash: tripFromHash, importExhibitsPending: false, importExhibitsFulfilled: true, exhibitsImport: action.payload.data, searchBarSource: searchBarSource}
        }
        case "IMPORT_RESTROOMS": {
            glossary = {};
            currTrip = [];
            tripFromHash = state.tripFromHash;
            hash = state.tripHash;
            var searchBarSource = state.searchBarSource;

            for (i = 0; i < action.payload.length; i++) {
                if (action.payload[i].type === "Restroom") {
                    glossary[action.payload[i].title] = action.payload[i];
                    searchBarSource.push({text: action.payload[i].title, type: "Restroom"});
                }
            }
            if (hash === "") {
                return [];
            } else {
                for (j = 0; j < tripFromHash.length; ) {
                    if (glossary[tripFromHash[j]] !== undefined) {
                        currTrip[j] = glossary[tripFromHash[j]];
                        j++
                    }
                }
            }
            const updatedTrip = state.trip.concat(currTrip);
            return {...state, trip: updatedTrip, tripFromHash: tripFromHash, searchBarSource: searchBarSource}

        }
        case "IMPORT_DAILY_PROGRAMS_PENDING": {
            return {...state, importDailyProgramsPending: true}
        }
        case "IMPORT_DAILY_PROGRAMS_FULFILLED": {
            glossary = {};
            currTrip = [];
            tripFromHash = state.tripFromHash;
            hash = state.tripHash;
            var searchBarSource = state.searchBarSource;

            for (i = 0; i < action.payload.data.length; i++) {
                if (action.payload.data[i].type === undefined) {
                    glossary[action.payload.data[i].eventID] = action.payload.data[i];
                    searchBarSource.push({text: action.payload.data[i].title, type: "DailyProgram"});
                }
            }
            if (hash === "") {
                return [];
            } else {
                for (j = 0; j < tripFromHash.length; ) {
                    if (glossary[tripFromHash[j]] !== undefined) {
                        currTrip[j] = glossary[tripFromHash[j]];
                        j++
                    }
                }
            }
            const updatedTrip = state.trip.concat(currTrip);
            return {...state, trip: updatedTrip, tripFromHash: tripFromHash, importDailyProgramsPending: false, importDailyProgramsFulfilled: true, dailyProgramsImport: action.payload.data, searchBarSource: searchBarSource}
        }
        case "IMPORT_ATTRACTIONS_PENDING": {
            return {...state, importAttractionsPending: true}
        }
        case "IMPORT_ATTRACTIONS_FULFILLED": {
            glossary = {};
            currTrip = [];
            tripFromHash = state.tripFromHash;
            hash = state.tripHash;
            var searchBarSource = state.searchBarSource;

            for (i = 0; i < action.payload.data.length; i++) {
                if (action.payload.data[i].type === "Attraction") {
                    glossary[action.payload.data[i].title] = action.payload.data[i];
                    searchBarSource.push({text: action.payload.data[i].title, type: "Attraction"});
                }
            }
            if (hash === "") {
                return [];
            } else {
                for (j = 0; j < tripFromHash.length; ) {
                    if (glossary[tripFromHash[j]] !== undefined) {
                        currTrip[j] = glossary[tripFromHash[j]];
                        j++
                    }
                }
            }
            const updatedTrip = state.trip.concat(currTrip);
            return {...state, trip: updatedTrip, tripFromHash: tripFromHash, importAttractionsPending: false, importAttractionsFulfilled: true, attractionsImport: action.payload.data, searchBarSource: searchBarSource}
        }
        
        default: {
            return state
        }
    }
}
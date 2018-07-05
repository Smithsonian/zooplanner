const initialState = {
    ammenities: false,
    attractions: false,
    dailyPrograms: false,
    exhibits: false,
    food: false,
    restrooms: false,
}

export default function(state=initialState, action) {
    switch(action.type) {
        case "AMMENITIES": {
            return {...state, ammenities: action.payload}
        }
        case "ATTRACTIONS": {
            return {...state, attractions: action.payload}
        }
        case "DAILY_PROGRAMS": {
            return {...state, dailyPrograms: action.payload}
        }
        case "EXHIBITS": {
            return {...state, exhibits: action.payload}
        }
        case "FOOD": {
            return {...state, food: action.payload}
        }
        case "RESTROOMS": {
            return {...state, restrooms: action.payload}
        }
        default: {return state}
    }
}
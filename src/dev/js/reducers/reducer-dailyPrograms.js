const initialState = {
    fetching: false,
    fetched: false,
    dailyPrograms: [],
    error: null,
    type: "dailyProgram",
}

export default function(state=initialState, action) {
    switch(action.type) {
        case "FETCH_DAILY_PROGRAMS_PENDING": {
            return {...state, fetching: true}
        }
        case "FETCH_DAILY_PROGRAMS_REJECTED": {
            return {...state, fetching: false, error: action.payload}
        }
        case "FETCH_DAILY_PROGRAMS_FULFILLED": {
            return {...state, fetching: false, fetched: true, dailyPrograms: action.payload.data}
        }
        default: {return state}
    }
}
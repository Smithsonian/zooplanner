import axios from 'axios';

export function fetchDailyPrograms(date) {
    return function(dispatch) {
        dispatch ({
            type: "FETCH_DAILY_PROGRAMS",
            payload: axios.get("http://www.trumba.com/calendars/national-zoo-daily-zoo-activities.json?startDateTime=" + date)
        })
    }
}
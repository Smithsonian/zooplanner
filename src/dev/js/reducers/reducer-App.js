const initialState = {
    page: checkHash(),
}

function checkHash() {
    if (window.location.hash != "") {
        return "main"
    } else {
        return "date"
    }
}

export default function(state = initialState, action) {
    switch(action.type) {
        case "SET_PAGE": {
            return {...state, page: action.payload}
        }
        default: return state;
    }
}
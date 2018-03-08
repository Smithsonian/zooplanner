const initialState= {
    focusedItem: null,
    expanded: false,
}

export default function(state=initialState, action) {
    switch(action.type) {
        case "EXPAND": {
            return {...state, focusedItem: action.payload, expanded: true,}
        }
        case "UNEXPAND": {
            return {...state, focusedItem: null, expanded: false,}
        }
        default: {return state}
    }
}
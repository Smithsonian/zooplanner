
export function expandItem(item) {
    return {
        type: "EXPAND",
        payload: item
    }
}

export function unexpandItem() {
    return {
        type: "UNEXPAND",
        payload: null
    }
}

export function expandItem(item) {
    return {
        type: "EXPAND",
        payload: item[1]
    }
}

export function unexpandItem() {
    return {
        type: "UNEXPAND",
        payload: null
    }
}
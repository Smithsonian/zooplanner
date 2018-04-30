const initialState = {
    restrooms: [
        {title: "Zoo Police Station Restroom", location: "Zoo Police Station", coordinates: "38.928005, -77.047363", type: "Restroom", image:"http://i245.photobucket.com/albums/gg45/peachberryaili/bathroom-icon_3.png"},
        {title: "Amazonia Restroom", location: "Amazonia", coordinates: "38.928090, -77.048108", type: "Restroom", image:"http://i245.photobucket.com/albums/gg45/peachberryaili/bathroom-icon_3.png"},
        {title: "Visitor Center Restroom", location: "Visitor Center", coordinates: "38.930439, -77.054447", type: "Restroom", image:"http://i245.photobucket.com/albums/gg45/peachberryaili/bathroom-icon_3.png"},
        {title: "Bus Lot Restroom", location: "Bus Lot", coordinates: "38.932158, -77.052187", type: "Restroom", image:"http://i245.photobucket.com/albums/gg45/peachberryaili/bathroom-icon_3.png"},
        {title: "Elephant Trails Restroom", location: "Elephant Trails", coordinates: "38.930403, -77.050962", type: "Restroom", image:"http://i245.photobucket.com/albums/gg45/peachberryaili/bathroom-icon_3.png"},
    ],
}

export default function(state=initialState, action) {
    switch(action.type) {
        default: return state
    }
}
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import {connect} from 'react-redux';
import SimpleItem from './simpleitem.js'

const GoogleMapsWrapper = withScriptjs(withGoogleMap(props => {
    const {onMapMounted, ...otherProps} = props;
    return (<GoogleMap 
            defaultZoom={17}
            defaultCenter={{ lat: 38.9296, lng: -77.0498 }}
            ref={c => {onMapMounted && onMapMounted(c)}}>
            {props.children}
            </GoogleMap>
    )
  }));

class MyMapComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {exhibitWindowState: {}, attractionWindowState: {}}
    }

    parseCoords(coordString) {
        const lat = parseFloat(coordString.substring(0, 10));
        const long = parseFloat(coordString.substring(12, 22));
        const arr = [lat, -long]
        return arr
    }

    convertToArray(object) {
		var result = Object.keys(object).map(function(key) {
			return [Number(key), object[key]];
		});
		return result;
    }
    
    showExhibitWindow(arr, key) {
        arr[key] = true;
        this.setState({attractionWindowState: {}})
        this.setState({exhibitWindowState: arr});
    }
    showAttractionWindow(arr, key) {
        arr[key] = true;
        this.setState({exhibitWindowState: {}})
        this.setState({attractionWindowState: arr});
    }

    render() {
        
        let exhibitList = this.convertToArray(this.props.exhibits);

        var exhibitWindow = {}
        exhibitList.map((item) => {
            exhibitWindow[item[1].title] = false
        })

        const exhibitMarker = exhibitList.map((item) => {
            return (
                <Marker 
                    key={item[1].title}
                    position={{lat: this.parseCoords(item[1].coordinates)[0], lng: this.parseCoords(item[1].coordinates)[1]}}
                    icon='https://www.google.com.au/maps/vt/icon/name=assets/icons/spotlight/spotlight_pin_v2_shadow-1-small.png,assets/icons/spotlight/spotlight_pin_v2-1-small.png,assets/icons/spotlight/spotlight_pin_v2_dot-1-small.png,assets/icons/spotlight/spotlight_pin_v2_accent-1-small.png&highlight=93FF95,C34D57,960a0a,ffffff&color=93FF95?scale=0.7'    
                    onClick={() => this.showExhibitWindow(exhibitWindow, item[1].title)}
                >
                    {this.state.exhibitWindowState[item[1].title] && <InfoWindow>
                        <div>
                            <SimpleItem
                                key = {item[1].title}
                                name={item[1].title}
                                img={item[1].image}
                                location={item[1].exhibit_name}
                                type={this.props.type}
                                item={item}/>
                        </div>
                    </InfoWindow>}
                </Marker>
            );
        });

        let attractionsList = this.convertToArray(this.props.attractions);
        var attractionWindow = {}
        attractionsList.map((item) => {
            attractionWindow[item[1].title] = false
        })
        const attractionMarker = attractionsList.map((item) => {
            return (
                <Marker
                    key={item[1].title}
                    position={{lat: this.parseCoords(item[1].coordinates)[0], lng: this.parseCoords(item[1].coordinates)[1]}}
                    icon='https://www.google.com.au/maps/vt/icon/name=assets/icons/spotlight/spotlight_pin_v2_shadow-1-small.png,assets/icons/spotlight/spotlight_pin_v2-1-small.png,assets/icons/spotlight/spotlight_pin_v2_dot-1-small.png,assets/icons/spotlight/spotlight_pin_v2_accent-1-small.png&highlight=93FF95,F18B30,960a0a,ffffff&color=93FF95?scale=0.7'
                    onClick={() => this.showAttractionWindow(attractionWindow, item[1].title)}
                >
                    {this.state.attractionWindowState[item[1].title] && <InfoWindow>
                        <div>
                            <SimpleItem
                                key = {item[1].title}
                                name={item[1].title}
                                img={item[1].image}
                                location={item[1].exhibit_name}
                                type={this.props.type}
                                item={item}/>
                        </div>
                    </InfoWindow>}
                </Marker>
            );
        });


        return(
            <GoogleMapsWrapper
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC0DrCZRqF-G8hmIbh8_1Y6K71qub3uPhY"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            >
                {exhibitMarker}
                {attractionMarker}
            </GoogleMapsWrapper>

        )
    }
}


function mapStateToProps(state) {
	return {
		animals: state.animals.animals,
		animalsFetched: state.animals.fetched,
		exhibits: state.exhibits.exhibits,
		exhibitsFetched: state.exhibits.fetched,
		attractions: state.attractions.attractions,
		attractionsFetched: state.attractions.fetched,
	};
}

export default connect(mapStateToProps)(MyMapComponent);
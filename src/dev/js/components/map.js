import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import {connect} from 'react-redux';
import SimpleItem from './simpleitem.js'

const style = [
    {
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "landscape.natural.landcover",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "landscape.natural.terrain",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#42ff22"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.attraction",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "poi.attraction",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#b8ff9d"
        }
      ]
    },
    {
      "featureType": "poi.attraction",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "poi.attraction",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.business",
      "elementType": "labels",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ];

const GoogleMapsWrapper = withScriptjs(withGoogleMap(props => {
    // const {onMapMounted, ...otherProps} = props;
    const {onMapMounted} = props;
    return (<GoogleMap 
            defaultZoom={17}
            defaultCenter={{ lat: 38.9296, lng: -77.0498 }}
            ref={c => {onMapMounted && onMapMounted(c)}}
            defaultOptions={{styles: style}}>
            {props.children}
            </GoogleMap>
    )
  }));

class MyMapComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {mapWindowState: {},}
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

    showMapWindow(key) {
      let arr = this.state.mapWindowState;
      if (arr[key] === true) {
        arr[key] = false;
      } else {
        Object.keys(arr).forEach(v => arr[v] = false);
        arr[key] = true;
      }
      this.setState({mapWindowState: arr});
    }


    render() {

        let exhibitList = this.convertToArray(this.props.exhibits);
        let attractionsList = this.convertToArray(this.props.attractions);
        let restroomsList = this.props.restrooms;

        const exhibitMarker = exhibitList.map((item) => {
            return (
                <Marker 
                    key={item[1].title}
                    position={{lat: this.parseCoords(item[1].coordinates)[0], lng: this.parseCoords(item[1].coordinates)[1]}}
                    icon='https://www.google.com.au/maps/vt/icon/name=assets/icons/spotlight/spotlight_pin_v2_shadow-1-small.png,assets/icons/spotlight/spotlight_pin_v2-1-small.png,assets/icons/spotlight/spotlight_pin_v2_dot-1-small.png,assets/icons/spotlight/spotlight_pin_v2_accent-1-small.png&highlight=93FF95,C34D57,960a0a,ffffff&color=93FF95?scale=0.7'    
                    onClick={() => this.showMapWindow(item[1].title)}
                >
                    {this.state.mapWindowState[item[1].title] && 
                      <InfoWindow onCloseClick={() => this.showMapWindow(item[1].title)}>
                        <div>
                            <SimpleItem
                                key = {item[1].title}
                                name={item[1].title}
                                img={item[1].image}
                                location={item[1].exhibit_name}
                                type={this.props.type}
                                item={item[1]}/>
                        </div>
                    </InfoWindow>}
                </Marker>
            );
        });

        const attractionMarker = attractionsList.map((item) => {
            return (
                <Marker
                    key={item[1].title}
                    position={{lat: this.parseCoords(item[1].coordinates)[0], lng: this.parseCoords(item[1].coordinates)[1]}}
                    icon='https://www.google.com.au/maps/vt/icon/name=assets/icons/spotlight/spotlight_pin_v2_shadow-1-small.png,assets/icons/spotlight/spotlight_pin_v2-1-small.png,assets/icons/spotlight/spotlight_pin_v2_dot-1-small.png,assets/icons/spotlight/spotlight_pin_v2_accent-1-small.png&highlight=93FF95,F18B30,960a0a,ffffff&color=93FF95?scale=0.7'
                    onClick={() => this.showMapWindow(item[1].title)}
                >
                    {this.state.mapWindowState[item[1].title] && 
                      <InfoWindow onCloseClick={() => this.showMapWindow(item[1].title)}>
                        <div>
                            <SimpleItem
                                key = {item[1].title}
                                name={item[1].title}
                                img={item[1].image}
                                location={item[1].exhibit_name}
                                type={this.props.type}
                                item={item[1]}/>
                        </div>
                    </InfoWindow>}
                </Marker>
            );
        });

        const restroomMarker = restroomsList.map((item) => {
            return (
                <Marker
                    key={item.title}
                    position={{lat: this.parseCoords(item.coordinates)[0], lng: this.parseCoords(item.coordinates)[1]}}
                    icon='https://www.google.com.au/maps/vt/icon/name=assets/icons/spotlight/spotlight_pin_v2_shadow-1-small.png,assets/icons/spotlight/spotlight_pin_v2-1-small.png,assets/icons/spotlight/spotlight_pin_v2_dot-1-small.png,assets/icons/spotlight/spotlight_pin_v2_accent-1-small.png&highlight=93FF95,617D9B,3E5066,ffffff&color=93FF95?scale=0.7'
                    onClick={() => this.showMapWindow(item.title)}
                >
                  {this.state.mapWindowState[item.title] && 
                    <InfoWindow onCloseClick={() => this.showMapWindow(item.title)}>
                        <div>
                            <SimpleItem
                                key = {item.title}
                                name={item.title}
                                img={item.image}
                                location={item.exhibit_name}
                                type={this.props.type}
                                item={item}/>
                        </div>
                    </InfoWindow>}
                </Marker>
            );
        });

        //google maps link to use when in development https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places
        //actual APIkey: https://maps.googleapis.com/maps/api/js?key=AIzaSyC0DrCZRqF-G8hmIbh8_1Y6K71qub3uPhY
        return(
            <GoogleMapsWrapper
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC0DrCZRqF-G8hmIbh8_1Y6K71qub3uPhY"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            >
                {exhibitMarker}
                {attractionMarker}
                {restroomMarker}
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
    restrooms: state.restrooms.restrooms,
	};
}

export default connect(mapStateToProps)(MyMapComponent);
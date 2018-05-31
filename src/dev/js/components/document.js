import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setPage} from "../actions/AppActions"
import MyMapComponent from "./map.js"
import Trip from "./trip.js"


class MyDocument extends Component {
    convertToArray(object) {
		var result = Object.keys(object).map(function(key) {
			return [Number(key), object[key]];
		});
		return result;
    }

    render() {
        let passedList = this.convertToArray(this.props.trip);
        var listItem = passedList.map((item) => {
            item = item[1];
            var itemLocation;
            if (item.exhibit_name == null) {
                itemLocation = <p id="itemLocation"></p>
            } else {
                itemLocation = <p id="itemLocation">{item.exhibit_name.replace(/&#039;/g, "'")}</p>
            }
            var image;
            switch (item.type) { //to change image variable
                case "Exhibit": {
                    image = item.image_small;
                    break;
                } case "Attraction": {
                    image = item.image_small;
                    break;
                } case "Animal": {
                    image = item.image_small;
                    break;
                } case "Restroom": {
                    image = item.image;
                    break;
                } case undefined: {
                    image = "https://farm1.staticflickr.com/956/27940952588_0296bce9a3_m.jpg"
                    break;
                } default: break;
            }        
            return (
                <div className='simpleItem' key={item.title}>
                    <div className="row">
                        <div className="col-3" id="itemImage">
                            <a href={window.location.hash} alt={item.title}><img alt={item.title} src={image}/></a>
                        </div>
                        <div className='col-8' id="itemInfo">
                            <a id='itemName' alt={item.title} href={window.location.hash} title={item.title}>{item.title.replace(/&#039;/g, "'")}</a>
                            <br/>
                            {itemLocation}
                        </div>
                    </div>
                </div>
            )
        });

        return (
            <div> 
                <div className="row" id="printTopBar">
                    <div className="col-5" id="backButtonContainer">
                        <button className='btn btn-link' id='printBackButton' onClick={() => this.props.setPage("main")}>&larr; BACK</button>
                    </div>
                    <div className="col-7" id="printButtonContainer">
                        <button type='submit' className='btn btn-default' id='printButton' onClick={() => window.print()}>PRINT</button>
                    </div>
                </div>
                <div id="divname">
                    <p id='zooplanner'> YOUR TRIP </p>
                    <div id="printMapContainer">
                        <MyMapComponent/>
                    </div>
                    <div id="printListItem">
                        {listItem}
                    </div>
					
                </div>
            </div>
            
        )
    }
  
}

function mapStateToProps(state) {
	return {
        animalsImport: state.trip.animalsImport,
        exhibitsImport: state.trip.exhibitImport,
        attractionsImport: state.trip.attractionsImport,
        dailyProgramsImport: state.trip.dailyProgramsImport,
        trip: state.trip.trip,
        source: state.trip.searchBarSource,
	};
}
function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		setPage: setPage,
	}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(MyDocument);

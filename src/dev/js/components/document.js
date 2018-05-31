import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setPage} from "../actions/AppActions"
import MyMapComponent from "./map.js"


class MyDocument extends Component {

    render() {
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
                <MyMapComponent/>
                <div id="divname">
					
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

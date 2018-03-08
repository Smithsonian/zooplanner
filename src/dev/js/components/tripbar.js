import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Trip from "./trip.js"
import {clearTrip} from "../actions/tripActions"

class TripBar extends Component { //called in Main
	clearTrip() {
		this.props.clearTrip()
	}
	render() {
		return (
			<div>
				<p className='title'>YOUR TRIP <button type="button" className="btn btn-link" id="clearTrip" onClick={() => this.clearTrip()}>CLEAR TRIP</button></p>
				
				<hr/>
				<div className='row' id='dateHoursBar'>
					<p id='dateHoursText'>VISIT DATE: {this.props.date}<br/> ZOO HOURS: {this.props.hours[2].time}</p>
				</div>
				<Trip />
				<div className='row' id='finishTripBar'>
					<button type='submit' className='btn btn-default' id='finishButton'>FINISH</button>
				</div>
			</div>
		);
	}
} 

function mapStateToProps(state) {
	return {
		date: state.date.date,
		hours: state.date.hours,
		trip: state.trip.trip,
	};
}
function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		clearTrip: clearTrip
	}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(TripBar);
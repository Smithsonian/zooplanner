import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Trip from "./trip.js"
import {clearTrip} from "../actions/tripActions"
import {fetchHours} from "../actions/dateActions"

class TripBar extends Component { //called in Main
	clearTrip() {
		this.props.clearTrip()
	}

	fetchHours() {
		var hash = window.location.hash.substring(6, 23);
		if (hash === "") {
			return null;
		} else {
			const date = hash.substring(0,4) + "+" + hash.substring(7,9) + "%2C+" + hash.substring(13);
			this.props.fetchHours("https://nationalzoo.si.edu/pyd/views/homepage_card?display_id=hours&date[value][date]=" + date);
		}
	}

	componentWillMount() {
		this.fetchHours();
	}

	render() {
		var hours;
		if (this.props.hours != null) {
			hours = this.props.hours[2].time;
		} else {
			hours = "loading"
		}
		return (
			<div>
				<p className='title'>YOUR TRIP <button type="button" className="btn btn-link" id="clearTrip" onClick={() => this.clearTrip()}>CLEAR TRIP</button></p>
				
				<hr/>
				<div className='row' id='dateHoursBar'>
					<p id='dateHoursText'>VISIT DATE: {this.props.date}<br/> ZOO HOURS: {hours}</p>
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
		clearTrip: clearTrip,
		fetchHours: fetchHours,
	}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(TripBar);
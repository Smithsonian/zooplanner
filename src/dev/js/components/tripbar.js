import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';

class TripBar extends Component { //called in Main
	render() {
		const emptyTrip = <p id='emptyTripText'>You have not added anything yet <br/><br/><br/> Need help planning?<br/> See pre-planned trips</p>
		return (
			<div>
				<p className='title'>YOUR TRIP</p>
				<hr/>
				<div className='row' id='dateHoursBar'>
					<p id='dateHoursText'>VISIT DATE: {this.props.getDate}<br/> ZOO HOURS: {this.props.getHours}</p>
				</div>
				<div className='row' id='emptyTripContainer'>
					{emptyTrip}
				</div>
				<div className='row' id='finishTripBar'>
					<button type='submit' className='btn btn-default' id='finishButton'>FINISH</button>
				</div>
			</div>
		);
	}
} 

export default TripBar;
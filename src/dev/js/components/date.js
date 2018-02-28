import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setDate} from '../actions/dateActions'
import {fetchHours} from '../actions/dateActions'
import {fetchEvent} from '../actions/dateActions'


export class Date extends Component {
	constructor(props) {
		super(props);
		this.state = {formfilled: false, page1:true};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.formatDateForQuery = this.formatDateForQuery.bind(this);
	}

	handleChange(event) { // set the state.date to event.target.value and the props.date to a nicely parsed one (which is this.state.tripDate in Main)
		this.setState({formfilled: true}) //this specific date format needed for calandar input
		this.props.setDate(event.target.value)
	}

	handleClick(event) { //change page, adds date parameters to HoursAPI url, call HoursAPI
		const HoursAPI = 'https://nationalzoo.si.edu/pyd/views/homepage_card?display_id=hours&date[value][date]='
		const EventsAPI = 'https://nationalzoo.si.edu/pyd/views/events?display_id=special_events'
		this.setState({page1: false});
		var completeHoursAPI = HoursAPI + this.formatDateForQuery();
		this.props.fetchHours(completeHoursAPI);
		this.props.fetchEvent('https://nationalzoo.si.edu/pyd/views/events?display_id=special_events&date[value][month]=5&date[value][day]=17&date[value][year]=2018')
		//request for events need to still add date parameters here!!!!!!
		// axios.get('https://nationalzoo.si.edu/pyd/views/events?display_id=special_events&date[value][month]=05&date[value][day]=17&date[value][year]=2018')
		// 	.then(response => this.setState({events: [response.data[0].title, response.data[0].description, response.data[0].image, response.data[0].path]}));
		//^ sets this.state.events to an array with title, description, image, and path (ie. events/zoofari)
	}

	formatDateForQuery() {
		var timearr = this.props.date.split("-");
		const year = timearr[0];
		const month = timearr[1].replace(/^0+/, '');
		const day = timearr[2]; 
		var monthArr = ['none', 'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
		this.props.setDate(monthArr[month] + " " + day + ", " + year);
		return monthArr[month] + "+" + day + "%2C+" + year;
	}

	minDate() {
		return moment().format("YYYY-MM-DD").toString();
	}

	render () {
		const datePage1 = (
			<div className='container-fluid' id='date-body'>
				<h1 id='welcome-title'>WELCOME TO THE<br/> ZOO PLANNER!</h1>
				<p id='visit-date'>Date of Visit</p>
				<form>
					<div className='form-group'>
						<input type='date' className='form-control' min= {this.minDate()} max='2018-12-12' id='calendar' value={this.props.date} onChange={this.handleChange}/>
					</div>
					<button type='button' className='btn btn-default' disabled={!this.state.formfilled} onClick={this.handleClick}>NEXT</button>
				</form>
			</div>
		);
		var datePage2;
		
		if (!this.props.hoursFetched || !this.props.eventFetched) {
			datePage2 = (
				<div className='container-fluid' id='date-body'>
					<div className='date-scrn-2'>
						<h1 id='welcome-title'>WELCOME TO THE<br/> ZOO PLANNER!</h1>
						<div id='event-date'>
							loading...
						</div>
						<button type='button' className='btn btn-default' onClick={this.props.onClick}>START</button>
					</div>
				</div>
			)
		}
		else {
			var notes = ""
			if (this.props.notes[0].note == null && this.props.notes[1].note == null && this.props.notes[2].note == null) {
				notes = "No Notes"
			} else {
				if (this.props.notes[0].note != null) {
					notes += this.props.notes[0].note + ", "
				}
				if (this.props.notes[1].note != null) {
					notes += this.props.notes[1].note
				}
				if (this.props.notes[2].note != null) {
					notes += ", " + this.props.notes[2].note
				}
			}
			var eventURL = "https://nationalzoo.si.edu" + this.props.event[0].path
			datePage2 = (
				<div className='container-fluid' id='date-body'>
					<div className='date-scrn-2'>
						<h1 id='welcome-title'>WELCOME TO THE<br/> ZOO PLANNER!</h1>
						<div id='event-date'>
							<button type="button" className="btn btn-link" onClick={() => this.setState({page1:true})}>&larr; BACK</button>
							<br/>
							<div id="event-date-details">
								TRIP DATE:&nbsp;<span className='detail-date'>{this.props.date}</span><br/>
								ZOO HOURS:&nbsp;<span className='detail-date'>{this.props.hours[2].time}</span><br/>
								EVENTS:&nbsp;<span className='detail-date'><a target="_blank" href={eventURL}>{this.props.event[0].title} (click to open)</a></span><br/>
								PLEASE NOTE:&nbsp;<span className='detail-date'>{notes}</span>
							</div>
						</div>
						<button type='button' className='btn btn-default' onClick={this.props.onClick}>START</button>
					</div>
				</div>
			);
		}

		return(this.state.page1 ? datePage1 : datePage2);
	}
}

function mapStateToProps(state) {
	return {
		date: state.date.date,
		hours: state.date.hours,
		event: state.date.event,
		notes: state.date.notes,
		hoursFetched: state.date.hoursFetched,
		eventFetched: state.date.eventFetched
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		fetchHours: fetchHours,
		setDate: setDate,
		fetchEvent: fetchEvent,
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Date);
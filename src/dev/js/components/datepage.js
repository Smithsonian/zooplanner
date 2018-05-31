import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setDate} from '../actions/dateActions'
import {fetchHours} from '../actions/dateActions'
import {fetchEvent} from '../actions/dateActions'
import DatePicker from 'react-date-picker'
import ReactLoading from 'react-loading';


export class DatePage extends Component {
	constructor(props) {
		super(props);
		this.state = {formfilled: false, page1:true};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.formatDateForQuery = this.formatDateForQuery.bind(this);
	}

	handleChange(event) { // set the state.date to event.target.value and the props.date to a nicely parsed one (which is this.state.tripDate in Main)
		if (event == null){
			return;
		}
		this.setState({formfilled: true}) //this specific date format needed for calandar input
		var dateSplit = event.toString().split(" ");
		var mdy = ""
		mdy += dateSplit[1] + " " + dateSplit[2] + " " + dateSplit[3]
		this.props.setDate(mdy)
	}

	handleClick(event) { //change page, adds date parameters to HoursAPI url, call HoursAPI
		const HoursAPI = 'https://nationalzoo.si.edu/pyd/views/homepage_card?display_id=hours&date[value][date]='
		const EventsAPI = 'https://nationalzoo.si.edu/pyd/views/events?display_id=special_events&date[value][date]='
		this.setState({page1: false});
		const dateForQuery = this.formatDateForQuery();
		var completeHoursAPI = HoursAPI + dateForQuery;
		var completeEventsAPI = EventsAPI + dateForQuery;
		this.props.fetchHours(completeHoursAPI);
		this.props.fetchEvent(completeEventsAPI);
		//request for events need to still add date parameters here!!!!!!
		// axios.get('https://nationalzoo.si.edu/pyd/views/events?display_id=special_events&date[value][month]=05&date[value][day]=17&date[value][year]=2018')
		// 	.then(response => this.setState({events: [response.data[0].title, response.data[0].description, response.data[0].image, response.data[0].path]}));
		//^ sets this.state.events to an array with title, description, image, and path (ie. events/zoofari)
	}

	formatDateForQuery() {
		console.log(this.props.date);
		var timearr = this.props.date.split(" ");
		const year = timearr[2];
		const month = timearr[0] + ".";
		const day = timearr[1]; 
		this.props.setDate(month + " " + day + ", " + year);
		return month + "+" + day + "%2C+" + year;
	}

	maxDate() {
		var yearFromNow = new Date();
		yearFromNow.setFullYear(yearFromNow.getFullYear() + 1);
		return yearFromNow;
	}

	backButton() {
		this.props.setDate(null);
		this.setState({page1:true, formfilled: false});
	}
	render () {
		const datePage1 = (
			<div className='container-fluid' id='date-body'>
				<h1 id='welcome-title'>WELCOME TO THE<br/> ZOO PLANNER!</h1>
				<p id='visit-date'>Date of Visit</p>
				<DatePicker minDate={new Date()} maxDate={this.maxDate()} value={this.props.date} onChange={this.handleChange}/>
				<div>
					<button type='button' className='btn btn-default' id='dateButton' disabled={!this.state.formfilled} onClick={this.handleClick}>NEXT</button>
				</div>
			</div>
		);
		var datePage2;
		
		if (!this.props.hoursFetched || !this.props.eventFetched) {
			datePage2 = (
				<div className='container-fluid' id='date-body'>
					<div className='date-scrn-2'>
						<h1 id='welcome-title'>WELCOME TO THE<br/> ZOO PLANNER!</h1>
						<div id='event-date'>
							<ReactLoading type={"spinningBubbles"} color={"#00C5AB"}/>
						</div>
						<button type='button' className='btn btn-default' disabled={!this.props.hoursFetched || !this.props.eventFetched} onClick={this.props.onClick}>START</button>
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
			var eventTag = <span className="detail-date">Nothing scheduled</span>
			if (this.props.event[0] != null) {
				const eventURL = "https://nationalzoo.si.edu" + this.props.event[0].path;
				eventTag = <span className='detail-date'><a target="_blank" href={eventURL}>{this.props.event[0].title} <i className="glyphicon glyphicon-new-window"></i></a></span>
			}
			datePage2 = (
				<div className='container-fluid' id='date-body'>
					<div className='date-scrn-2'>
						<h1 id='welcome-title'>WELCOME TO THE<br/> ZOO PLANNER!</h1>
						<div id='event-date'>
							<button type="button" className="btn btn-link" onClick={() => this.backButton()}>&larr; BACK</button>
							<br/>
							<div id="event-date-details">
								TRIP DATE:&nbsp;<span className='detail-date'>{this.props.date}</span><br/>
								ZOO HOURS:&nbsp;<span className='detail-date'>{this.props.hours[2].time}</span><br/>
								SPECIAL EVENTS:&nbsp;{eventTag}<br/>
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

export default connect(mapStateToProps, matchDispatchToProps)(DatePage);
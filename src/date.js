import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Main.css';
import axios from 'axios';
import moment from 'moment';


export class Date extends Component {
	constructor(props) {
		super(props);
		this.state = {date: '', hours: '', events: ["No Events"], notes:'No Notes', formfilled: false, page1:true};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.formatDateForQuery = this.formatDateForQuery.bind(this);
	}

	handleChange(event) { // set the state.date to event.target.value and the props.date to a nicely parsed one (which is this.state.tripDate in Main)
		var datearr = event.target.value.split("-");
		const year = datearr[0];
		const month = datearr[1].replace(/^0+/, '');
		const day = datearr[2]; 
		var monthArr = ['none', 'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
		const formattedDate = monthArr[month]+ " " + day + " " + year;
		this.setState({date: event.target.value, formfilled: true}) //this specific date format needed for calandar input
		this.props.setDate(formattedDate);
	}

	handleClick(event) { //change page, adds date parameters to HoursAPI url, call HoursAPI
		const HoursAPI = 'https://nationalzoo.si.edu/pyd/views/homepage_card?display_id=hours&date[value][date]='
		const EventsAPI = 'https://nationalzoo.si.edu/pyd/views/events?display_id=special_events'
		this.setState({page1: false});
		var completeHoursAPI = HoursAPI + this.formatDateForQuery();
		//request to get zoo hours
		axios.get(completeHoursAPI)
			.then((response) => {
				this.props.setHours(response.data[2].time);
				this.setState({notes: response.data[2].note})
			});
		//request for events need to still add date parameters here!!!!!!
		axios.get('https://nationalzoo.si.edu/pyd/views/events?display_id=special_events&date[value][month]=5&date[value][day]=17&date[value][year]=2018')
			.then(response => this.setState({events: [response.data[0].title, response.data[0].description, response.data[0].image, response.data[0].path]}));
		//^ sets this.state.events to an array with title, description, image, and path (ie. events/zoofari)
	}

	formatDateForQuery() {
		var timearr = this.state.date.split("-");
		const year = timearr[0];
		const month = timearr[1].replace(/^0+/, '');
		const day = timearr[2]; 
		var monthArr = ['none', 'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
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
						<input type='date' className='form-control' min= {this.minDate()} max='2018-12-12' id='calendar' value={this.state.date} onChange={this.handleChange}/>
					</div>
					<button type='submit' className='btn btn-default' disabled={!this.state.formfilled} onClick={this.handleClick}>NEXT</button>
				</form>
			</div>
		);

		const datePage2 = (
			<div className='container-fluid' id='date-body'>
				<div className='date-scrn-2'>
					<h1 id='welcome-title'>WELCOME TO THE<br/> ZOO PLANNER!</h1>
					<div id='event-date'>
						TRIP DATE:&nbsp;<span className='detail-date'>{this.props.getDate()}</span><br/>
						ZOO HOURS:&nbsp;<span className='detail-date'>{this.props.getHours()}</span><br/>
						EVENTS:&nbsp;<span className='detail-date'>{this.state.events[0]}</span><br/>
						PLEASE NOTE:&nbsp;<span className='detail-date'>{this.state.notes}</span>
					</div>
					<button type='submit' className='btn btn-default' onClick={this.props.onClick}>START</button>
				</div>
			</div>
		);

		return(this.state.page1 ? datePage1 : datePage2);
	}
}

export default Date;
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import axios from 'axios'

const HoursAPI = 'https://nationalzoo.si.edu/pyd/views/homepage_card?display_id=hours&date[value][date]='
const EventsAPI = 'https://nationalzoo.si.edu/pyd/views/events?display_id=special_events'

export class Date extends Component {
	constructor(props) {
		super(props);
		this.state = {time: '', hours: '', hourQueryFormat: '', events: ["No Events"], formfilled: false, page1:true};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.formatHours = this.formatHours.bind(this);
	}

	handleChange(event) { // set the state.time
		this.setState({time: event.target.value, formfilled: true});
	}
	handleClick(event) { //change page, set hourQueryFormat to get ready for API call, call API
		this.setState({page1: false});
		console.log(this.state.hourQueryFormat);
		var API = HoursAPI + this.formatHours();
		console.log(API);
		//request to get zoo hours
		axios.get(API)
			.then(response => console.log(response.data));
		//request for events
		axios.get('https://nationalzoo.si.edu/pyd/views/events?display_id=special_events&date[value][month]=5&date[value][day]=17&date[value][year]=2018')
			.then(response => this.setState({events: response.data[0].title}));
	}

	formatHours() {
		var timearr = this.state.time.split("-");
		const year = timearr[0];
		const month = timearr[1].replace(/^0+/, '');
		const day = timearr[2]; 
		var monthArr = ['none', 'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
		this.setState({hourQueryFormat: string});
		var string = monthArr[month] + "+" + day + "%2C+" + year;
		return string;
		
	}

	render () {
		const datePage1 = (
			<div className='container-fluid' id='date-body'>
				<h1 id='welcome-title'>WELCOME TO THE<br/> ZOO PLANNER!</h1>
				<p id='visit-date'>Date of Visit</p>
				<form>
					<div className='form-group'>
						<input type='date' className='form-control' min='2017-01-01' max='2018-12-12' id='calendar' value={this.state.time} onChange={this.handleChange}/>
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
						TRIP DATE:&nbsp;<span className='detail-date'>{this.state.time}</span><br/>
						ZOO HOURS:&nbsp;<span className='detail-date'>{this.state.hours}</span><br/>
						EVENTS:&nbsp;<span className='detail-date'>{this.state.events}</span><br/>
						PLEASE NOTE:&nbsp;<span className='detail-date'>notes</span>
					</div>
					<button type='submit' className='btn btn-default' onClick={this.props.onClick}>START</button>
				</div>
			</div>
		);

		return(this.state.page1 ? datePage1 : datePage2);
	}
}

class ExploreBar extends Component {
	render() {
		return <p>ExploreBar</p>
	}
}


class TripBar extends Component {
	render() {
		return <p>TripBar</p>
	}
}

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {overlay:'date'};
		this.closeOverlay = this.closeOverlay.bind(this);
	}

	closeOverlay() {
		this.setState({overlay:''})
	}

	renderOverlay() {
		switch(this.state.overlay) {
			case 'date': return <Date onClick={this.closeOverlay} />
			case '': return ''
		}
	}
	render () {

		return (
			<div className='App'>
				<div id="top-border">
					Zoo Planner 
			    </div> 

			    <div id='overlay'>
					{this.renderOverlay()}
			    </div>

			    <div id="content">
			    	<div className='container-fluid'>
				    	<div className='row'>
				    		<div className='col' id='exploreBar'>
								<ExploreBar/>
							</div>

							<div className='col-7' id='mapContainer'>
								<img src='https://www.citymetric.com/sites/default/files/styles/nodeimage/public/article_2016/08/gmaps_head.png?itok=MZsYvZFq' />
							</div>

							<div className='col' id='tripBar'>
								<TripBar/>
							</div>
				    	</div> 
				    </div>
			    </div> 

			    <div id="bottom-border"> 
			    </div>
			</div>
		);
	}
}

export default Main;
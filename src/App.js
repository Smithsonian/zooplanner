import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import axios from 'axios'

const HoursAPI = 'https://nationalzoo.si.edu/pyd/views/homepage_card?display_id=hours&date[value][date]='

export class Date extends Component {
	constructor(props) {
		super(props);
		this.state = {time: '', hours: '', hourQueryFormat: '', formfilled: false, page1:true};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.formatHours = this.formatHours.bind(this);
	}

	handleChange(event) {
		this.setState({time: event.target.value, formfilled: true});
	}
	handleClick(event) { //change page, set hourQueryFormat to get ready for API call, call API
		this.setState({page1: false});
		this.formatHours();
		var API = HoursAPI + this.state.hourQueryFormat
		axios.get(API)
			.then(response => console.log(response));
	}

	formatHours() {
		var timearr = this.state.time.split("-");
		const year = timearr[0];
		const month = timearr[1].replace(/^0+/, '');
		const day = timearr[2]; 
		var monthArr = ['none', 'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
		var string = monthArr[month] + "+" + day + "%2C+" + year;
		this.setState({hourQueryFormat: string});
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
						ZOO HOURS:&nbsp;<span className='detail-date'>{HoursAPI + this.state.hourQueryFormat}</span><br/>
						EVENTS:&nbsp;<span className='detail-date'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </span><br/>
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
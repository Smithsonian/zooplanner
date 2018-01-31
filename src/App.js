import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Main.css';
import axios from 'axios';
import Date from './date.js'

class ExploreBar extends Component { //filters in order of exhibits, food, attractions, dailyprogs, ammenities, restrooms
	constructor(props) {
		super(props);
		this.state = {filters:[false, false, false, false, false, false], animals:[], exhibits:[]}
		this.updateCheckbox = this.updateCheckbox.bind(this);
		this.checkFilter = this.checkFilter.bind(this);
	}

	queryAnimals() {
		axios.get('https://nationalzoo.si.edu/pyd/views/animals?display_id=list') //CORS ERROR AGAIN!
			.then(response => console.log(response[0]));
	}

	updateCheckbox(filter) { //NEED TO EDIT THIS! DO NOT DIRECLY MUTATE STATE!!!
		if (filter === "exhibits") {
			this.state.filters[0] = !this.state.filters[0];
		}
	}

	checkFilter(index) {
		switch(index) {
			case 0: return this.state.filters[0];
		}
	}

	render() {
		//CHECK IF THERE IS A FILTER IN PLACE, IF SO DO NOT RENDER CATEGORIES BUT RENDER THE FILTERED ASPECTS!
		return (
			<div>
				<Filter updateCheckbox={this.updateCheckbox} checkFilter={this.checkFilter}/>
				{this.queryAnimals()}
				<hr/>
				<p className='title'>SEARCH BOX HERE</p>
				<br/>
				<br/>
				<hr/>
				<Categories/>
				<br/>
				<br/>
			</div>
		);
	}
}

class Filter extends Component {
	render() {
		return (
			<div id='filter'>
				<p className='title'>FILTER</p>
				<hr/>
				<form>
					<div className="row">
						<div className="col-6" id='filterlabel'>
							<input type='checkbox' id='exhibits' name='filter' onChange={this.props.updateCheckbox("exhibits")} />
							<label htmlFor='exhibits'>&nbsp;Exhibits</label>
						</div>
						<div className="col-6" id='filterlabel'>
							<input type='checkbox' id='attractions' name='filter' onChange={this.props.updateCheckbox("attractions")} />
							<label htmlFor='exhibits'>&nbsp;Attractions</label>
						</div>
					</div>
					<div className="row">
						<div className="col-6" id='filterlabel'>
							<input type='checkbox' id='food' name='filter' onChange={this.props.updateCheckbox("food")} />
							<label htmlFor='exhibits'>&nbsp;Food</label>
						</div>
						<div className="col-6" id='filterlabel'>
							<input type='checkbox' id='dailyprogs' name='filter' onChange={this.props.updateCheckbox("dailyprogs")} />
							<label htmlFor='exhibits'>&nbsp;Daily Programs</label>
						</div>
					</div>
					<div className="row">
						<div className="col-6" id='filterlabel'>
							<input type='checkbox' id='restrooms' name='filter' onChange={this.props.updateCheckbox("restrooms")} />
							<label htmlFor='exhibits'>&nbsp;Restrooms</label>
						</div>
						<div className="col-6" id='filterlabel'>
							<input type='checkbox' id='ammenities' name='filter' onChange={this.props.updateCheckbox("ammenities")} />
							<label htmlFor='exhibits'>&nbsp;Ammenities</label>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

class Categories extends Component {
	render() {
		return (
			<div id='categories'>
				<p className='title'>A-Z LIST</p>
				<hr/>
				<div id="accordion">
				  <div className="card">
				    <div className="card-header" id="headingOne">
				      <p className="mb-0">
				        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
				          ANIMALS
				        </button>
				      </p>
				    </div>

				    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
				      <div className="card-body">
				        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus 
				      </div>
				    </div>
				  </div>
				  <div className="card">
				    <div className="card-header" id="headingTwo">
				      <p className="mb-0">
				        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
				          ATTRACTIONS
				        </button>
				      </p>
				    </div>
				    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
				      <div className="card-body">
				        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus 
				      </div>
				    </div>
				  </div>
				  <div className="card">
				    <div className="card-header" id="headingThree">
				      <p className="mb-0">
				        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
				          AMMENITIES
				        </button>
				      </p>
				    </div>
				    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
				      <div className="card-body">
				        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus 
				      </div>
				    </div>
				  </div>
				</div>
			</div>
		);
	}
}


class TripBar extends Component {
	render() {
		return <p>TripBar</p>
	}
}

class Main extends Component {
	render() {
		return (
			<div id="content">
		    	<div className='container-fluid'>
			    	<div className='row'>
			    		<aside className='col' id='exploreBar'>
							<ExploreBar/>
						</aside>

						<div className='col-7' id='mapContainer'>
							Hiiiiiiiiiiiii
						</div>

						<aside className='col' id='tripBar'>
							<TripBar/>
						</aside>
			    	</div> 
			    </div>
		    </div> 
		);

	}
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {overlay:'date', tripDate:'', zooHours:''};
		this.closeOverlay = this.closeOverlay.bind(this);
		this.setDate = this.setDate.bind(this);
		this.setHours = this.setHours.bind(this);
		this.getDate = this.getDate.bind(this);
		this.getHours = this.getHours.bind(this);
	}

	closeOverlay() {
		this.setState({overlay:''})
	}

	renderOverlay() { //later change this so it passes in a parameter ie: date, searchbyanimal, preplan... then use it for the switch statement
		switch(this.state.overlay) {
			case 'date': return <Date setDate={this.setDate} setHours = {this.setHours} getDate = {this.getDate} getHours = {this.getHours} onClick={this.closeOverlay} />
			case '': return <Main/>
		}
	}

	setDate(date) {
		this.setState({tripDate: date});
	}
	getDate() {
		return this.state.tripDate;
	}

	setHours(hours) {
		this.setState({zooHours: hours});
	}

	getHours() {
		return this.state.zooHours;
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

			    <div id="bottom-border"> 
			    </div>
			</div>
		);
	}
}

export default App;
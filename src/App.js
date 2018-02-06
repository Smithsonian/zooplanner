import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Main.css';
import axios from 'axios';
import Date from './date.js'

class ExploreBar extends Component { //filters in order of ammenities, attractions, daily programs, exhibits, food, restrooms
	constructor(props) {
		super(props);
		this.state = {filters:[], animals:[], exhibits:[]}
		this.updateCheckbox = this.updateCheckbox.bind(this);
		this.checkFilter = this.checkFilter.bind(this);
	}

	queryAnimals() {
		axios.get('https://nationalzoo.si.edu/pyd/views/animals?display_id=list') //CORS ERROR AGAIN!
			.then(response => console.log(response));
	}

	updateCheckbox(e) { //appends string of item checked into filters
		const filters = this.state.filters
		if(e.target.checked) {
			filters.push(e.target.value)
		} else {
			const index = filters.indexOf(e.target.value)
			filters.splice(index, 1)
		}
		this.setState({filters: filters})
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
				<p id='zooplanner'> ZOO PLANNER </p>
				<Filter updateCheckbox={this.updateCheckbox}/>
				{this.queryAnimals()}
				<div id='searchBox'>
					<p className='title'>SEARCH BOX HERE</p>
					<hr/>
					<br/>
					<br/>
				</div>
				<Categories/>
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
							<input type='checkbox' id='ammenities' name='filter' value='ammenities' onClick={this.props.updateCheckbox} />
							<label htmlFor='ammenities'>AMMENITIES</label>
						</div>
						<div className="col-6" id='filterlabel'>
							<input type='checkbox' id='exhibits' name='filter' value='exhibits' onClick={this.props.updateCheckbox} />
							<label htmlFor='exhibits'>EXHIBITS</label>
						</div>
					</div>

					<div className="row">
						<div className="col-6" id='filterlabel'>
							<input type='checkbox' id='attractions' name='filter' value='attractions' onClick={this.props.updateCheckbox} />
							<label htmlFor='attractions'>ATTRACTIONS</label>
						</div>
						<div className="col-6" id='filterlabel'>
							<input type='checkbox' id='food' name='filter' value='food' onClick={this.props.updateCheckbox} />
							<label htmlFor='food'>FOOD</label>
						</div>
				
					</div>
					<div className="row">
						<div className="col-6" id='filterlabel'>
							<input type='checkbox' id='dailyprogs' name='filter' value='dailyprogs' onClick={this.props.updateCheckbox} />
							<label htmlFor='dailyprogs'>DAILY&nbsp;PROGRAMS</label>
						</div>
						<div className="col-6" id='filterlabel'>
							<input type='checkbox' id='restrooms' name='filter' value='restrooms' onClick={this.props.updateCheckbox} />
							<label htmlFor='restrooms'>RESTROOMS</label>
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
				          AMMENITIES
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
				          ATTRACTIONS
				        </button>
				      </p>
				    </div>
				    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
				      <div className="card-body">
				        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus 
				      </div>
				    </div>
				  </div>

				  <div className="card">
				    <div className="card-header" id="headingFour">
				      <p className="mb-0">
				        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
				          DAILY PROGRAMS
				        </button>
				      </p>
				    </div>
				    <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordion">
				      <div className="card-body">
				        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus 
				      </div>
				    </div>
				  </div>

				  <div className="card">
				    <div className="card-header" id="headingFive">
				      <p className="mb-0">
				        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
				          EXHIBITS
				        </button>
				      </p>
				    </div>
				    <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordion">
				      <div className="card-body">
				        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus 
				      </div>
				    </div>
				  </div>
				  
				  <div className="card">
				    <div className="card-header" id="headingSix">
				      <p className="mb-0">
				        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
				          FOOD
				        </button>
				      </p>
				    </div>
				    <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#accordion">
				      <div className="card-body">
				        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus 
				      </div>
				    </div>
				  </div>
				  <div className="card">
				    <div className="card-header" id="headingSeven">
				      <p className="mb-0">
				        <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
				          RESTROOMS
				        </button>
				      </p>
				    </div>
				    <div id="collapseSeven" className="collapse" aria-labelledby="headingSeven" data-parent="#accordion">
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
		this.state = {overlay:'', tripDate:'', zooHours:''};
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
			    <div id='overlay'>
					{this.renderOverlay()}
			    </div>
			</div>
		);
	}
}

export default App;
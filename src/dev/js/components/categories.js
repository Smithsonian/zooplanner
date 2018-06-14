import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import SimpleItemsList from './simpleitemslist.js'
import {connect} from 'react-redux';

class Categories extends Component { //called in explorebar
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		var animals;
		var ammenities;
		var attractions;
		var dailyPrograms;
		var exhibits;
		var food;
		var restrooms;
		if (this.props.ammenities === false && 
			this.props.exhibits === false && 
			this.props.attractions === false && 
			this.props.restrooms === false && 
			this.props.food === false && 
			this.props.dailyPrograms === false) {
				animals = <div className="card">
										<div className="card-header" id="headingOne">
											<p className="mb-0">
												<button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
													ANIMALS
												</button>
											</p>
										</div>
										<div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
											<div className="card-body">
												<SimpleItemsList type="animal"/>
											</div>
										</div>
									</div>
			}

		if ((this.props.ammenities === false && 
			this.props.exhibits === false && 
			this.props.attractions === false && 
			this.props.restrooms === false && 
			this.props.food === false && 
			this.props.dailyPrograms === false) || 
			this.props.ammenities === true) {
				ammenities = <div className="card">
											<div className="card-header" id="headingTwo">
												<p className="mb-0">
													<button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
														AMMENITIES
													</button>
												</p>
											</div>
											<div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
												<div className="card-body">
													Coming soon...
												</div>
											</div>
										</div>

			}
		if ((this.props.ammenities === false && 
			this.props.exhibits === false && 
			this.props.attractions === false && 
			this.props.restrooms === false && 
			this.props.food === false && 
			this.props.dailyPrograms === false) || 
			this.props.exhibits === true) {
				exhibits = <div className="card">
											<div className="card-header" id="headingFive">
												<p className="mb-0">
													<button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
														EXHIBITS
													</button>
												</p>
											</div>
											<div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordion">
												<div className="card-body">
													<SimpleItemsList type="exhibit"/>
												</div>
											</div>
										</div>
			

			}
		if ((this.props.ammenities === false && 
			this.props.exhibits === false && 
			this.props.attractions === false && 
			this.props.restrooms === false && 
			this.props.food === false && 
			this.props.dailyPrograms === false) || 
			this.props.attractions === true) {
				attractions = <div className="card">
												<div className="card-header" id="headingThree">
													<p className="mb-0">
														<button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
															ATTRACTIONS
														</button>
													</p>
												</div>
												<div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
													<div className="card-body">
														<SimpleItemsList type="attraction"/>
													</div>
												</div>
											</div>
			}
		if ((this.props.ammenities === false && 
			this.props.exhibits === false && 
			this.props.attractions === false && 
			this.props.restrooms === false && 
			this.props.food === false && 
			this.props.dailyPrograms === false) || 
			this.props.restrooms === true) {
				restrooms = <div className="card">
											<div className="card-header" id="headingSeven">
												<p className="mb-0">
													<button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
														RESTROOMS
													</button>
												</p>
											</div>
											<div id="collapseSeven" className="collapse" aria-labelledby="headingSeven" data-parent="#accordion">
												<div className="card-body">
													<SimpleItemsList type="restroom"/>
												</div>
											</div>
										</div>
			}
		if ((this.props.ammenities === false && 
			this.props.exhibits === false && 
			this.props.attractions === false && 
			this.props.restrooms === false && 
			this.props.food === false && 
			this.props.dailyPrograms === false) || 
			this.props.food === true) {
				food = <div className="card">
									<div className="card-header" id="headingSix">
										<p className="mb-0">
											<button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
												FOOD
											</button>
										</p>
									</div>
									<div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#accordion">
										<div className="card-body">
											Coming soon...
										</div>
									</div>
								</div>
			}
		if ((this.props.ammenities === false && 
			this.props.exhibits === false && 
			this.props.attractions === false && 
			this.props.restrooms === false && 
			this.props.food === false && 
			this.props.dailyPrograms === false) || 
			this.props.dailyPrograms === true) {
				dailyPrograms = <div className="card">
													<div className="card-header" id="headingFour">
														<p className="mb-0">
															<button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
																DAILY PROGRAMS
															</button>
														</p>
													</div>
													<div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordion">
														<div className="card-body">
															<SimpleItemsList type="dailyProgram"/>
														</div>
													</div>
												</div>
			}

		return (
			<div id='categories'>
				<p className='title'>A-Z LIST</p>
				<hr/>
				<div id="accordion">
				  {animals}
				  {ammenities}
				  {attractions}
					{dailyPrograms}
					{exhibits}
				  {food}
				  {restrooms}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		attractions: state.filters.attractions,
		ammenities: state.filters.ammenities,
		dailyPrograms: state.filters.dailyPrograms,
		exhibits: state.filters.exhibits,
		food: state.filters.food,
		restrooms: state.filters.restrooms,

	};
}

export default connect(mapStateToProps)(Categories);
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import axios from 'axios';
import Categories from './categories.js';
import ExpandedItem from './expandeditem.js';
import Filter from './filter';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchAnimals} from "../actions/animalActions";
import {fetchExhibits} from '../actions/exhibitActions';

class ExploreBar extends Component { //filters in order of ammenities, attractions, daily programs, exhibits, food, restrooms
	constructor(props) {
		super(props);
		this.state = {filters:[], animals:[], exhibits:[], expandItem:false}
		this.updateCheckbox = this.updateCheckbox.bind(this);
		// this.checkFilter = this.checkFilter.bind(this);
		// this.queryAnimals = this.queryAnimals.bind(this);
		// this.getAnimals = this.getAnimals.bind(this);
		// this.expandItem = this.expandItem.bind(this);
		// this.unexpandItem = this.unexpandItem.bind(this);
	}

	// queryAnimals() {
	// 	axios.get('https://nationalzoo.si.edu/pyd/views/animals?display_id=list')
	// 		.then((response) => {
	// 			this.setState({animals: response['data']})
	// 		});
	// }
	// getAnimals() {
	// 	this.queryAnimals();
	// 	return this.state.animals;
	// }

	// queryExhibits() { //CORS ERROR
	// 	axios.get('https://nationalzoo.si.edu/pyd/views/exhibit_list?display_id=exhibits')
	// 		.then((response) => {
				
	// 		})
	// }

	// getExhibits() {
	// 	this.queryExhibits();
	// 	return this.state.exhibits;
	// }
	// expandItem() {
	// 	this.setState({expandItem: true});
	// }
	// unexpandItem() {
	// 	this.setState({expandItem: false});
	// }

	updateCheckbox(e) { //appends string of item checked into filters
		const filters = this.state.filters;
		if(e.target.checked) {
			filters.push(e.target.value)
		} else {
			const index = filters.indexOf(e.target.value)
			filters.splice(index, 1)
		}
		this.setState({filters: filters})
	}

	// checkFilter(index) {
	// 	switch(index) {
	// 		case 0: return this.state.filters[0];
	// 	}
	// }
	renderDisplay() {
		switch(this.props.animalExpanded) {
			case null: return <Categories/>
			default: return <ExpandedItem/>
		}
	}

	componentDidMount() {
		this.props.dispatch(fetchAnimals())
		this.props.dispatch(fetchExhibits())
	}

	render() {
		return (
			<div>
				<p id='zooplanner'> ZOO PLANNER </p>
				<Filter updateCheckbox={this.updateCheckbox}/>
				<div id='searchBox'>
					<p className='title'>SEARCH BOX HERE</p>
					<hr/>
					<br/>
					<br/>
				</div>
				{this.renderDisplay()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		animals: state.animals.animals,
		animalsFetched: state.animals.fetched,
		animalExpanded: state.animals.expandAnimal,
	};
}

export default connect(mapStateToProps)(ExploreBar);
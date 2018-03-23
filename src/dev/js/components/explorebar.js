import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import Categories from './categories.js';
import ExpandedItem from './expandeditem.js';
import Filter from './filter';
import {connect} from 'react-redux';

import {fetchAnimals} from "../actions/animalActions";
import {fetchExhibits} from '../actions/exhibitActions';
import {fetchAttractions} from '../actions/attractionActions';
// import {expandItem} from '../actions/exploreBarActions';


class ExploreBar extends Component { //filters in order of ammenities, attractions, daily programs, exhibits, food, restrooms
	constructor(props) {
		super(props);
		this.state = {filters:[], animals:[], exhibits:[], expandItem:false}
		this.updateCheckbox = this.updateCheckbox.bind(this);
	}

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
		if (this.props.itemInFocus) {
			return <ExpandedItem/>
		} else {
			return <Categories/>
		}
	}

	componentDidMount() {
		this.props.dispatch(fetchAnimals());
		this.props.dispatch(fetchExhibits());
		this.props.dispatch(fetchAttractions());
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
		itemInFocus: state.exploreBar.expanded,
	};
}

export default connect(mapStateToProps)(ExploreBar);
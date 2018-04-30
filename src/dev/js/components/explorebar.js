import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import Categories from './categories.js';
import ExpandedItem from './expandeditem.js';
import SearchBar from './searchbar.js';
import Filter from './filter';
import {connect} from 'react-redux';

import {fetchAnimals} from "../actions/animalActions";
import {fetchExhibits} from '../actions/exhibitActions';
import {fetchAttractions} from '../actions/attractionActions';
import { fetchDailyPrograms } from '../actions/dailyProgramActions';
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

	formatDate() {
		const date = this.props.date;
		var month = date.substring(0,3);
		switch (month) {
			case "Jan": {
				month = 1
				break;
			}case "Feb": {
				month = 2
				break;
			}case "Mar": {
				month = 3
				break;
			}case "Apr": {
				month = 4
				break;
			}case "May": {
				month = 5
				break;
			}case "Jun": {
				month = 6
				break;
			}case "Jul": {
				month = 7
				break;
			}case "Aug": {
				month = 8
				break;
			}case "Sep": {
				month = 9
				break;
			}case "Oct": {
				month = 10
				break;
			}case "Nov": {
				month = 11
				break;
			}case "Dec": {
				month = 12
				break;
			}default: return null
		}
		const day = date.substring(5,7);
		const year = date.substring(9);
		const string = year + month + day
		return string

	}

	componentDidMount() {
		this.props.dispatch(fetchAnimals());
		this.props.dispatch(fetchExhibits());
		this.props.dispatch(fetchAttractions());
		console.log("date", this.props.date);
		this.props.dispatch(fetchDailyPrograms(this.formatDate()));
	}

	render() {
		return (
			<div>
				<p id='zooplanner'> ZOO PLANNER </p>
				<Filter updateCheckbox={this.updateCheckbox}/>
				<div id='searchBox'>
					<p className='title'>SEARCH BOX HERE</p>
					<hr/>
					<SearchBar/>
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
		date: state.date.date,
	};
}

export default connect(mapStateToProps)(ExploreBar);
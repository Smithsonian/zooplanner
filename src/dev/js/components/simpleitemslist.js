import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import SimpleItem from './simpleitem.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchAnimals} from "../actions/animalActions"


class SimpleItemsList extends Component { //called in categories
	// constructor(props) {
	// 	super(props);
	// 	this.state = {}
	// }

	convertToArray(object) {
		var result = Object.keys(object).map(function(key) {
			return [Number(key), object[key]];
		});
		return result;
	}

	componentWillMount() {
		this.props.dispatch(fetchAnimals())
	}

	render() {
		if (this.props.animalsFetched == false) {
			var listItem = <p>loading...</p>
		} else {
			let passedList = this.convertToArray(this.props.animals);
			var listItem = passedList.map((item) => {
				return (
					<SimpleItem
						name={item[1].node_title}
						img={item[1].image}
						location={item[1].exhibit}
						type={this.props.type}
						expandItem={this.props.expandItem}
						element={item[1]}/>
				);
			});
		}
		
		// if (this.props.type === 'exhibit') {
		// 	listItem = passedList.map((item) => {
		// 		return (
		// 			<SimpleItem
		// 				name={item[1].node_title}
		// 				img={item[1].image}
		// 				location={item[1].exhibit}
		// 				type={this.props.type}
		// 				expandItem={this.props.expandItem}
		// 				element={item[1]}/>
		// 		);
		// 	});
		// } else {
		// 	const listItem = <p>hi</p>
		// }
		return (
			<div className='SimpleItemsList'>
				{listItem}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		animals: state.animals.animals,
		animalsFetched: state.animals.fetched,
	};
}
export default connect(mapStateToProps)(SimpleItemsList);
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import SimpleItem from './simpleitem.js'
import {connect} from 'react-redux';


class SimpleItemsList extends Component { //called in categories
	constructor(props) {
		super(props);
		this.state = {}
	}

	convertToArray(object) {
		var result = Object.keys(object).map(function(key) {
			return [Number(key), object[key]];
		});
		return result;
	}

	render() {
		let passedList = this.convertToArray(this.props.query);
		var listItem = <p>hi</p>
		if (this.props.type === 'animal') {
			listItem = passedList.map((item) => {
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
		} if (this.props.type === 'exhibit') {
			listItem = passedList.map((item) => {
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
		} else {
			const listItem = <p>hi</p>
		}
		return (
			<div className='SimpleItemsList'>
				{listItem}
			</div>
		);
	}
}

export default SimpleItemsList;
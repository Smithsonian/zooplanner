import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import SimpleItem from './simpleitem.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class SimpleItemsList extends Component { //called in categories

	convertToArray(object) {
		var result = Object.keys(object).map(function(key) {
			return [Number(key), object[key]];
		});
		return result;
	}

	render() {
		var listItem;
		if (this.props.type === 'animal') {
			if (this.props.animalsFetched === false) {
				listItem = <p>loading...</p>
			} else {
				let passedList = this.convertToArray(this.props.animals);
				listItem = passedList.map((item) => {
					return (
						<SimpleItem
							key = {item[1].title}
							name={item[1].title}
							img={item[1].image}
							location={item[1].exhibit_name}
							type={this.props.type}
							item={item}/>
					);
				});
			}
		} else if (this.props.type === 'exhibit') {
			if (this.props.exhibitsFetched === false) {
				listItem = <p>loading...</p>
			} else {
				let passedList = this.convertToArray(this.props.exhibits);
				listItem = passedList.map((item) => {
					return (
						<SimpleItem
							key = {item[1].title}
							name={item[1].title}
							img={item[1].image}
							location={null}
							type={this.props.type}
							item={item}/>
					);
				});
			}
		} else {
			listItem = <p>ERROR</p>
		}
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
		exhibits: state.exhibits.exhibits,
		exhibitsFetched: state.exhibits.fetched,
	};
}
export default connect(mapStateToProps)(SimpleItemsList);
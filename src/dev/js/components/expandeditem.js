import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {unexpandAnimal} from '../actions/animalActions';
import {unexpandItem} from '../actions/exploreBarActions';

class ExpandedItem extends Component { //called in explorebar
	unexpand() {
		this.props.unexpandItem();
	}

	render() {
		console.log(this.props.item);
		return (
			<div className="expandedItem">
				<button onClick={() => {this.unexpand()}}>x</button>
				<div className="row">
					<p id="expandedItemTitle">{this.props.item.title}</p>
					<hr/>
				</div>
				<div className="row">
					<div className="col-6" id='expandedItemImage'>
						<img src={this.props.item.image}/>
					</div>
					<div className="col-6" id='expandedItemDetails'>
						<p>{this.props.item.exhibit_name}</p>
					</div>
				</div>
				<div className="row">
					<p>{this.props.item.description}</p>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		animal: state.animals.expandAnimal,
		item: state.exploreBar.focusedItem,
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		unexpandAnimal: unexpandAnimal,
		unexpandItem: unexpandItem,
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ExpandedItem);
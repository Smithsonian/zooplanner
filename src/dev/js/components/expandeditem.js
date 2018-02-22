import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {unexpandAnimal} from '../actions/animalActions'

class ExpandedItem extends Component { //called in explorebar
	unexpand() {
		this.props.unexpandAnimal();
	}

	render() {
		console.log(this.props.animal)
		const htmlImg = "https://nationalzoo.si.edu" + this.props.animal.image
		return (
			<div className="expandedItem">
				<button onClick={() => {this.unexpand()}}>x</button>
				<h5>{this.props.animal.node_title}</h5>
				<div id='expandedItemImage'>
					<img src={htmlImg}/>
				</div>
				<p>{this.props.animal.exhibit}</p>
				<p>{this.props.animal.description}</p>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		animal: state.animals.expandAnimal
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({unexpandAnimal: unexpandAnimal}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ExpandedItem);
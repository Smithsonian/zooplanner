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
		// const htmlImg = "https://nationalzoo.si.edu" + this.props.animal.image
		return (
			<div className="expandedItem">
				<button onClick={() => {this.unexpand()}}>x</button>
				<div className="row">
					<p id="expandedItemTitle">{this.props.animal.title}</p>
					<hr/>
				</div>
				<div className="row">
					<div className="col-6" id='expandedItemImage'>
						<img src={this.props.animal.image}/>
					</div>
					<div className="col-6" id='expandedItemDetails'>
						<p>{this.props.animal.exhibit_name}</p>
					</div>
				</div>
				<div className="row">
					<p>{this.props.animal.description}</p>
				</div>
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
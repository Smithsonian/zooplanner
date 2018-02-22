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
		return (
			<div className="expandedItem">
				<button onClick={() => {this.unexpand()}}>x</button>
				
			</div>
		);
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({unexpandAnimal: unexpandAnimal}, dispatch);
}

export default connect(null, matchDispatchToProps)(ExpandedItem);
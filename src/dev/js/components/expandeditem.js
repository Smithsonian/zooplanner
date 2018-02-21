import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';

class ExpandedItem extends Component { //called in explorebar
	render() {
		return (
			<div className="expandedItem">
				<button onClick={this.props.unexpandItem}>x</button>
			</div>
		);
	}
}

export default ExpandedItem;
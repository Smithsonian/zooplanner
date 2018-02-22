import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {expandAnimal} from '../actions/animalActions'

class SimpleItem extends Component { //called in simpleitemslist
	expandItem(type, item) {
		if (type === 'animal') {
			this.props.expandAnimal(item);
		}
	}

	render() {
		const htmlImg = "https://nationalzoo.si.edu" + this.props.img;
		return (
			<div className='simpleItem'>
				<div className="row">
					<div className="col-3" id="itemImage">
						<a href="#" alt={this.props.name} onClick={() => {this.expandItem(this.props.type, this.props.item)}}><img src={htmlImg}/></a>
					</div>
					<div className='col-8' id="itemInfo">
						<a id='itemName' alt={this.props.name} href="#" title={this.props.name} onClick={() => {this.expandItem(this.props.type, this.props.item)}}>{this.props.name}</a>
						<p id="itemLocation">{this.props.location}</p>
					</div>
				</div>
			</div>
		);
	}

}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({expandAnimal: expandAnimal}, dispatch);
}

export default connect(null, matchDispatchToProps)(SimpleItem);
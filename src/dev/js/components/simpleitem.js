import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {expandAnimal} from '../actions/animalActions';
import {addToTrip} from '../actions/tripActions';

class SimpleItem extends Component { //called in simpleitemslist
	expandItem(type, item) {
		if (type === 'animal') {
			this.props.expandAnimal(item);
		}
	}

	addToTrip(item){
		this.props.addToTrip(item);
	}

	render() { //props here are normal react props grabbed from simpleitemslist
		const htmlImg = "https://nationalzoo.si.edu" + this.props.img;
		return (
			<div className='simpleItem'>
				<div className="row">
					<div className="col-3" id="itemImage">
						<a href="#" alt={this.props.name} onClick={() => {this.expandItem(this.props.type, this.props.item)}}><img src={htmlImg}/></a>
					</div>
					<div className='col-8' id="itemInfo">
						<a id='itemName' alt={this.props.name} href="#" title={this.props.name} onClick={() => {this.expandItem(this.props.type, this.props.item)}}>{this.props.name}</a>
						<br/>
						<p id="itemLocation">{this.props.location}</p>
						<button type="button" title='ADD TO TRIP' className="btn btn-add" onClick={() => this.addToTrip(this.props.item)}><i className="glyphicon glyphicon-plus"></i></button>
					</div>
				</div>
			</div>
		);
	}

}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		expandAnimal: expandAnimal,
		addToTrip: addToTrip
	}, dispatch);
}

export default connect(null, matchDispatchToProps)(SimpleItem);
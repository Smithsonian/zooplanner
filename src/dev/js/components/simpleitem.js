import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToTrip, removeFromTrip} from '../actions/tripActions';
import {expandItem} from '../actions/exploreBarActions';
import {fetchAnimalsInExhibit} from "../actions/exhibitActions";

class SimpleItem extends Component { //called in simpleitemslist
	expandItem(item) {
		this.props.expandItem(item);
		if (item.type === "Exhibit") {
			this.props.fetchAnimalsInExhibit(item.nid);
		} else if (item.type === "Animal") {
			var nid = item.exhibit_nid;
			if (nid.length > 4) {
				nid = nid.substring(0,4);
			}
			this.props.fetchAnimalsInExhibit(nid)
		}
	}

	addToTrip(item){
		this.props.addToTrip(item);
	}

	removeFromTrip(item) {
		this.props.removeFromTrip(item);
	}
	

	render() { //props here are normal react props grabbed from simpleitemslist
		var details;
		if (this.props.type === "attraction") {
			details = <p id="itemLocation">Cost: {this.props.cost}</p>
		} else if (this.props.type === "animal") {
			details = <p id="itemLocation">{this.props.location.replace(/&#039;/g, "'")}</p>
		} else if (this.props.type === "dailyProgram") {
			details = <p id="itemLocation">Time: {this.props.cost}</p>
		}

		var addOrRemoveBtn;
		if (this.props.trip.includes(this.props.item) || this.props.tripFromHash.includes(this.props.item.title)) {
			addOrRemoveBtn = <button type="button" title='REMOVE' className="btn btn-remove" onClick={() => this.removeFromTrip(this.props.item)}><i className="glyphicon glyphicon-remove"></i></button>
		} else {
			addOrRemoveBtn = <button type="button" title='ADD TO TRIP' className="btn btn-add" onClick={() => this.addToTrip(this.props.item)}><i className="glyphicon glyphicon-plus"></i></button>
		}

		var element;
		if (this.props.origin === "exploreBar") {
			element = 
				<div className='simpleItem'>
					<div className="row">
						<div className="col-3" id="itemImage">
							<a href={window.location.hash} alt={this.props.name} onClick={() => {this.expandItem(this.props.item)}}><img alt={this.props.name} src={this.props.img}/></a>
						</div>
						<div className='col-8' id="itemInfo">
							{addOrRemoveBtn}
							<a id='itemName' alt={this.props.name} href={window.location.hash} title={this.props.name} onClick={() => {this.expandItem(this.props.item)}}>{this.props.name.replace(/&#039;/g, "'").replace(/&#39;/g, "'")}</a>
							<br/>
							{details}
							<p>{this.props.type}</p>
						</div>
					</div>
				</div>
		} else {
			element = 
				<div>
					<div className="row" id="mapItemName">
						<a alt={this.props.name} href={window.location.hash} title={this.props.name} onClick={() => {this.expandItem(this.props.item)}}>{this.props.name}</a>
						&nbsp; &nbsp; &nbsp;
						{addOrRemoveBtn}
					</div>
					<div className="row" id="mapItemImage">
						<a href={window.location.hash} alt={this.props.name} onClick={() => {this.expandItem(this.props.item)}}><img alt={this.props.name} src={this.props.img}/></a>
					</div>
					
				</div>
		}
		return (
			<div>
				{element}
			</div>
		);
	}

}

function mapStatesToProps(state) {
	return {
		trip: state.trip.trip,
		tripFromHash: state.trip.tripFromHash,
		currTripItems: state.trip.currTripItems,
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		addToTrip: addToTrip,
		removeFromTrip: removeFromTrip,
		expandItem: expandItem,
		fetchAnimalsInExhibit: fetchAnimalsInExhibit,
	}, dispatch);
}

export default connect(mapStatesToProps, matchDispatchToProps)(SimpleItem);
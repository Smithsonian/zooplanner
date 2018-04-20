import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../../css/Main.css";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addToTrip, removeFromTrip} from '../actions/tripActions';
import {unexpandItem, expandItem} from "../actions/exploreBarActions";
import {fetchAnimalsInExhibit, unfetch} from "../actions/exhibitActions";

class ExpandedItem extends Component { //called in explorebar
	unexpand() {
		this.props.unexpandItem();
		this.props.unfetch();
	}

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

	convertToArray(object) {
		var result = Object.keys(object).map(function(key) {
			return [Number(key), object[key]];
		});
		return result;
	}


	render() {
		var animals = <p></p>
		var relatedAnimals = <p></p>
		var addOrRemoveBtn;
		var description = <p></p>
		var image = null;
		var extraDetails;
		var exhibit_name = null;
		if (this.props.trip.includes(this.props.item)) { //to change button type
			addOrRemoveBtn = <button type="button" title='REMOVE' className="btn btn-remove-lrg" onClick={() => this.removeFromTrip(this.props.item)}><i className="glyphicon glyphicon-remove"></i> REMOVE FROM TRIP</button>
		} else {
			addOrRemoveBtn = <button type="button" title='ADD TO TRIP' className="btn btn-add-lrg" onClick={() => this.addToTrip(this.props.item)}><i className="glyphicon glyphicon-plus"></i> ADD TO TRIP </button>
		}
		if (this.props.item.type === "Exhibit" || this.props.item.type === "Animal") {
			relatedAnimals = <p id="itemLocation">Related Animals</p>
			if (this.props.fetchedAnimals) {
				let passedList = this.convertToArray(this.props.exhibitAnimals);
				animals = passedList.map((item) => {
					item = item[1]
					return (
						<div key={item.title}>
							<div className="smallImage">
								<img alt={item.title.replace(/&#039;/g, "'")} src={item.image_small}/>
								<a href={window.location} title={item.title.replace(/&#039;/g, "'").replace(/&#39;/g, "'")} alt={item.title} className="smallImageTitle" onClick={() => this.expandItem(item)}>{item.title.replace(/&#039;/g, "'").replace(/&#39;/g, "'")}</a>
							</div>
						</div>
					)
				});
			} else {
				animals = <p>loading...</p>
			}
		}
		if (this.props.item.description !== undefined) {
			description = <div className="row" id="expandedItemDescription">
							<p>{this.props.item.description.replace(/&#039;/g, "'").replace(/&#39;/g, "'")}</p>
						</div>
		}
		switch (this.props.item.type) { //to change image variable
			case "Exhibit": {
				image = this.props.item.image_large
				break;
			} case "Attraction": {
				image = this.props.item.image_large
				break;
			} case "Animal": {
				image = this.props.item.image_large
				exhibit_name = <div className="row">
								<p id="expandedItemExhibit">{this.props.item.exhibit_name.replace(/&#039;/g, "'").replace(/&#39;/g, "'")}</p>
							</div>
				break;
			} case undefined: {
				if (this.props.item.eventImage !== undefined){
					image = this.props.item.eventImage.url
				}
				break;
			} default: break;
		}

		if (this.props.item.type === undefined) {
			var time;
			if (this.props.item.startDateTime === undefined) {
				time = null;
			} else {
				time = this.props.item.startDateTime.substring(11,16) + " to " + this.props.item.endDateTime.substring(11,16);
			}
			extraDetails = <div className="row" id="expandedItemDetails">
							<p>Program is at {time}.</p>
							<p>More information and sign ups <a href={this.props.item.signUpUrl} target="_blank" >HERE!</a></p>
						</div>
		}

		return (
			<div className="expandedItem">
				<button className="btn btn-link" onClick={() => {this.unexpand()}}> &larr; BACK</button>
				<br/>
				<br/>
				<div className="row">
					<p id="expandedItemTitle"><a name="top">{this.props.item.title.replace(/&#039;/g, "'").replace(/&#39;/g, "'")}</a></p>
				</div>
				{exhibit_name}
				<br/>
				<div className="row">
					<div className="col-6" id="expandedItemImage">
						<img alt={this.props.item.title.replace(/&#039;/g, "'").replace(/&#39;/g, "'")} src={image}/>
					</div>
				</div>
				<div id="btn-add-lrgContainer">
					{addOrRemoveBtn}
				</div>
				{extraDetails}
				{description}
				{relatedAnimals}
				{animals}
				<br/>
				
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		trip: state.trip.trip,
		animal: state.animals.expandAnimal,
		item: state.exploreBar.focusedItem,
		exhibitAnimals: state.exhibits.animals,
		fetchedAnimals: state.exhibits.animalsFetched,
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		addToTrip: addToTrip,
		removeFromTrip: removeFromTrip,
		unexpandItem: unexpandItem,
		expandItem: expandItem,
		fetchAnimalsInExhibit: fetchAnimalsInExhibit,
		unfetch : unfetch,
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ExpandedItem);
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
		if (this.props.trip.includes(this.props.item)) {
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
								<img alt={item.title.replace(/&#039;/g, "'")} src={item.image}/>
								<a href="#topper" title={item.title.replace(/&#039;/g, "'")} alt={item.title} className="smallImageTitle" onClick={() => this.expandItem(item)}>{item.title.replace(/&#039;/g, "'")}</a>
							</div>
						</div>
					)
				});
			} else {
				animals = <p>loading...</p>
			}
		}
		return (
			<div className="expandedItem">
  				<p id="topper"></p>
				<button className="btn btn-link" onClick={() => {this.unexpand()}}> &larr; BACK</button>
				<br/>
				<br/>
				<div className="row">
					<p id="expandedItemTitle">{this.props.item.title.replace(/&#039;/g, "'")}</p>
				</div>
				<div className="row">
					<p id="expandedItemDetails">{this.props.item.exhibit_name}</p>
				</div>
				<br/>
				<div className="row">
					<div className="col-6" id="expandedItemImage">
						<img alt={this.props.item.title.replace(/&#039;/g, "'")} src={this.props.item.image}/>
					</div>
				</div>
				<div id="btn-add-lrgContainer">
					{addOrRemoveBtn}
				</div>
				<div className="row" id="expandedItemDescription">
					<p>{this.props.item.description}</p>
				</div>
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
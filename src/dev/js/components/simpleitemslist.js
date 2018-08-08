import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import SimpleItem from './simpleitem.js'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToTrip} from '../actions/tripActions'
import ReactLoading from 'react-loading';


class SimpleItemsList extends Component { //called in categories

	convertToArray(object) {
		var result = Object.keys(object).map(function(key) {
			return [Number(key), object[key]];
		});
		return result;
	}

	render() {
		var listItem;
		if (this.props.type === "animal") {
			if (this.props.animalsFetched === false) {
				listItem = <ReactLoading type={"bubbles"} color={"#00C5AB"}/>
			} else {
				let passedList = this.convertToArray(this.props.animals);
				listItem = passedList.map((item) => {
					return (
						<SimpleItem
							key = {item[1].title}
							origin="exploreBar"
							name={item[1].title}
							img={item[1].image_small}
							imgLrg={item[1].image_large}
							location={item[1].exhibit_name}
							coordinates={item[1].location[0]}
							type={this.props.type}
							item={item[1]}/>
					);
				});
			}
		} else if (this.props.type === "exhibit") {
			if (this.props.exhibitsFetched === false) {
				listItem = <ReactLoading type={"bubbles"} color={"#00C5AB"}/>
			} else {
				let passedList = this.convertToArray(this.props.exhibits);
				listItem = passedList.map((item) => {
					return (
						<SimpleItem
							key = {item[1].title}
							origin="exploreBar"
							name={item[1].title}
							img={item[1].image_small}
							imgLrg={item[1].image_large}
							location={null}
							coordinates={item[1].coordinates}
							type={this.props.type}
							item={item[1]}/>
					);
				});
			}
		} else if (this.props.type === "attraction") {
			if (this.props.attractionsFetched === false) {
				listItem = <ReactLoading type={"bubbles"} color={"#00C5AB"}/>
			} else {
				let passedList = this.convertToArray(this.props.attractions);
				listItem = passedList.map((item) => {
					return (
						<SimpleItem
							key = {item[1].title}
							origin="exploreBar"
							name={item[1].title}
							img={item[1].image_small}
							imgLrg={item[1].image_large}
							location={null}
							cost={item[1].cost}
							coordinates={item[1].coordinates}
							type={this.props.type}
							item={item[1]}/>
					)

				});
			}
		} else if (this.props.type === "restroom") {
			let passedList = this.props.restrooms;
			listItem = passedList.map((item) => {
				return(
					<SimpleItem
						key= {item.title}
						origin="exploreBar"
						name={item.title}
						img={item.image}
						location={item.location}
						coordinates={item.coordinates}
						type={this.props.type}
						item={item}/>
				);
			});
		} else if (this.props.type === "dailyProgram") {
			if (this.props.dailyProgramsFetched === false) {
				listItem = <ReactLoading type={"bubbles"} color={"#00C5AB"}/>
			} else {
				let passedList = this.convertToArray(this.props.dailyPrograms);
				listItem = passedList.map((item) => {
					var image;
					if (item[1].eventImage === undefined) {
						image = null;
					} else {
						image = item[1].eventImage.url;
					}
					var time;
				 	if (item[1].startDateTime === undefined) {
						time = null;
					 } else {
						time = item[1].startDateTime.substring(11,16) + " to " + item[1].endDateTime.substring(11,16);
					 }
					return (
						<SimpleItem
							key = {item[1].eventID}
							origin="exploreBar"
							name={item[1].title}
							img={"http://i245.photobucket.com/albums/gg45/peachberryaili/demo-icon_3.png"}
							location={item[1].location}
							cost={time}
							type="dailyProgram"
							item={item[1]}/>
					)

				});
			}
		}
		
		else {
			listItem = <p>ERROR</p>
		}
		return (
			<div className='SimpleItemsList'>
				{listItem}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		animals: state.animals.animals,
		animalsFetched: state.animals.fetched,
		exhibits: state.exhibits.exhibits,
		exhibitsFetched: state.exhibits.fetched,
		attractions: state.attractions.attractions,
		attractionsFetched: state.attractions.fetched,
		currTripItems: state.trip.currTripItems,
		restrooms: state.restrooms.restrooms,
		dailyPrograms: state.dailyPrograms.dailyPrograms,
		dailyProgramsFetched: state.dailyPrograms.fetched,
	};
}
function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		addToTrip: addToTrip,
	}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(SimpleItemsList);
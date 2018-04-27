import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {removeFromTrip, updateTrip, addToTrip, optimizeTrip} from '../actions/tripActions'
import Reorder, { reorder } from 'react-reorder';

class Trip extends Component {

    convertToArray(object) {
		var result = Object.keys(object).map(function(key) {
			return [Number(key), object[key]];
		});
		return result;
    }
    removeFromTrip(item) {
        this.props.removeFromTrip(item);
    }

    onReorder (event, previousIndex, nextIndex, fromId, toId) {
        const newTrip = reorder(this.props.trip, previousIndex, nextIndex);
        this.props.updateTrip(newTrip);
    }

    dragAlert() {
        alert("you can now drag to move around")
    }

    render() {
        var listItem = <p></p>
        var optimizeButton;
        
        if (this.props.importAnimalsPending || this.props.importExhibitsPending) {
            listItem= (
                <div className='row' id='emptyTripContainer'>
                    <p id='emptyTripText'>loading...</p>
                </div>
            );   
        }
        else {
            if (this.props.trip.length === 0) {
                listItem= (
                    <div className='row' id='emptyTripContainer'>
                        <p id='emptyTripText'>You have not added anything yet <br/><br/><br/> Need help planning?<br/> See pre-planned trips</p>
                    </div>
                );   
            } else if (this.props.trip.length < 2) {
                let passedList = this.convertToArray(this.props.trip);
                listItem = passedList.map((item) => {
                    item = item[1];
                    var itemLocation;
                    if (item.exhibit_name == null) {
                        itemLocation = <p id="itemLocation"></p>
                    } else {
                        itemLocation = <p id="itemLocation">{item.exhibit_name.replace(/&#039;/g, "'")}</p>
                    }
                    var image;
                    switch (item.type) { //to change image variable
                        case "Exhibit": {
                            image = item.image_small
                            break;
                        } case "Attraction": {
                            image = item.image_small
                            break;
                        } case "Animal": {
                            image = item.image_small
                            break;
                        } case undefined: {
                            if (item.eventImage !== undefined){
                                image = item.eventImage.url
                            }
                            break;
                        } default: break;
                    }        
                    return (
                        <div className='simpleItem' key={item.title}>
                            <div className="row">
                                <div className="col-3" id="itemImage">
                                    <a href={window.location.hash} alt={item.title}><img alt={item.title} src={image}/></a>
                                </div>
                                <div className='col-8' id="itemInfo">
                                    <button type="button" title='REMOVE' className="btn btn-remove" onClick={() => this.removeFromTrip(item)}><i className="glyphicon glyphicon-remove"></i></button>
                                    <a id='itemName' alt={item.title} href={window.location.hash} title={item.title}>{item.title.replace(/&#039;/g, "'")}</a>
                                    <br/>
                                    {itemLocation}
                                </div>
                            </div>
                        </div>
                    )
                });
            } else {
                if (this.props.trip.length > 2) {
                    if (this.props.optimized === true) {
                        optimizeButton = <div className='row'>
                                        <button type='submit' className='btn btn-default' id='unOptimizeButton' onClick={() => this.props.optimizeTrip()}>UNOPTIMIZE</button>
                                    </div>
                    }
                    else {
                        optimizeButton = <div className='row'>
                                        <button type='submit' className='btn btn-default' id='optimizeButton' onClick={() => this.props.optimizeTrip()}>OPTIMIZE</button>
                                    </div>
                    }
            }
                let passedList = this.convertToArray(this.props.trip);

                listItem = <Reorder
                                reorderId="my-list" 
                                placeholderClassName="placeholder"
                                draggedClassName="dragged"
                                lock="horizontal"
                                onReorder={this.onReorder.bind(this)} // Callback when an item is dropped (you will need this to update your state)
                                autoScroll={true}
                                placeholder={
                                    <div className="simpleItemShadow" /> // Custom placeholder element (optional), defaults to clone of dragged element
                                }
                            >
                                
                                {passedList.map((item) => {
                                    item = item[1];
                                    var itemLocation;
                                    if (item.exhibit_name == null) {
                                        itemLocation = <p id="itemLocation"></p>
                                    } else {
                                        itemLocation = <p id="itemLocation">{item.exhibit_name.replace(/&#039;/g, "'")}</p>
                                    }
                                    var image;
                                    switch (item.type) { //to change image variable
                                        case "Exhibit": {
                                            image = item.image_small
                                            break;
                                        } case "Attraction": {
                                            image = item.image_small
                                            break;
                                        } case "Animal": {
                                            image = item.image_small
                                            break;
                                        } case undefined: {
                                            if (item.eventImage !== undefined){
                                                image = item.eventImage.url
                                            }
                                            break;
                                        } default: break;
                                    }
                                    
                                    return (
                                        <div className='simpleItemTrip' key={item.title}>
                                            <div className="row">
                                                <div className="col-3" id="itemImage">
                                                    <a href={window.location.hash} alt={item.title}><img alt={item.title} src={image}/></a>
                                                </div>
                                                <div className='col-8' id="itemInfo">
                                                    <button type="button" title='REMOVE' className="btn btn-remove" onClick={() => this.removeFromTrip(item)}><i className="glyphicon glyphicon-remove"></i></button>
                                                    <a id='itemName' alt={item.title} href={window.location.hash} title={item.title}>{item.title.replace(/&#039;/g, "'")}</a>
                                                    <br/>
                                                    {itemLocation}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </Reorder>
            }
        }
        return (
            <div id="tripList">
                {listItem}
                {optimizeButton}
            </div>   
        )
    }
}

function mapStateToProps(state) {
    return {
        trip: state.trip.trip,
        importAnimalsPending: state.trip.importAnimalsPending,
        importExhibitsPending: state.trip.importExhibitsPending,
        optimized: state.trip.optimized,
    }
}
function matchDispatchToProps(dispatch) {
	return bindActionCreators({
        // expandAnimal: expandAnimal,
        removeFromTrip: removeFromTrip,
        updateTrip: updateTrip,
        addToTrip: addToTrip,
        optimizeTrip: optimizeTrip,
	}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Trip);
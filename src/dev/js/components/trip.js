import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {removeFromTrip} from '../actions/tripActions'

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
    
    render() {
        var listItem = <p></p>
        console.log(this.props.trip, "MY TRIP")
        if (this.props.trip.length === 0) {
            listItem= (
                <div className='row' id='emptyTripContainer'>
                    <p id='emptyTripText'>You have not added anything yet <br/><br/><br/> Need help planning?<br/> See pre-planned trips</p>
                </div>
            );   
        } else {
            let passedList = this.convertToArray(this.props.trip);
            listItem = passedList.map((item) => {
                item = item[1];
                return (
                    <div className='simpleItem'>
                        <div className="row">
                            <div className="col-3" id="itemImage">
                                <a href="#" alt={item.title}><img src={item.image}/></a>
                            </div>
                            <div className='col-8' id="itemInfo">
                                <button type="button" title='REMOVE' className="btn btn-remove" onClick={() => this.removeFromTrip(item)}><i className="glyphicon glyphicon-remove"></i></button>
                                <a id='itemName' alt={item.title} href="#" title={item.title}>{item.title}</a>
                                <br/>
                                <p id="itemLocation">{item.exhibit_name}</p>
                            </div>
                        </div>
                    </div>
                )
            });
        }
        return (
            <div id="tripList">
                {listItem}
            </div>
            
        )
    }
}

function mapStateToProps(state) {
    return {
        trip: state.trip.trip
    }
}
function matchDispatchToProps(dispatch) {
	return bindActionCreators({
        // expandAnimal: expandAnimal,
        removeFromTrip: removeFromTrip
	}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(Trip);
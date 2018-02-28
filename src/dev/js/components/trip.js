import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {expandAnimal} from '../actions/animalActions'

class Trip extends Component {

    convertToArray(object) {
		var result = Object.keys(object).map(function(key) {
			return [Number(key), object[key]];
		});
		return result;
    }
    
    render() {
        var listItem = <p></p>
        console.log(this.props.trip.length, "trip Length")
        console.log(this.props.trip, "trip item")
        if (this.props.trip.length === 0) {
            listItem= (
                <div className='row' id='emptyTripContainer'>
                    <p id='emptyTripText'>You have not added anything yet <br/><br/><br/> Need help planning?<br/> See pre-planned trips</p>
                </div>
            );   
        } else {
            let passedList = this.convertToArray(this.props.trip);
            listItem = passedList.map((item) => {
                item = item[1]
                const htmlImg = "https://nationalzoo.si.edu" + item.image;
                console.log(item)
                return (
                    <div className='simpleItem'>
                        <div className="row">
                            <div className="col-3" id="itemImage">
                                <a href="#" alt={item.title}><img src={htmlImg}/></a>
                            </div>
                            <div className='col-8' id="itemInfo">
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
            <div>
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
// function matchDispatchToProps(dispatch) {
// 	return bindActionCreators({
// 		expandAnimal: expandAnimal,
// 	}, dispatch);
// }
export default connect(mapStateToProps)(Trip);
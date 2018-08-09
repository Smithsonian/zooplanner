import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {removeFromTrip, updateTrip, addToTrip, optimizeTrip} from '../actions/tripActions'
import Reorder, { reorder } from 'react-reorder';
import Snackbar from 'material-ui/Snackbar';
import Toggle from 'material-ui/Toggle';
import ReactLoading from 'react-loading';

class Trip extends Component {
    constructor(props) {
		super(props);
        this.state = {snackBar: false};
        this.dragAlert = this.dragAlert.bind(this);
    }
    
    convertToArray(object) {
		var result = Object.keys(object).map(function(key) {
			return [Number(key), object[key]].filter(item => item !== undefined);
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
        this.setState({snackBar: true});
    }

    calculateDistance(distances) {
        var total = 0;
        var feet = 0;
        var mi = 0;
        for (var i = 0; i < distances.length; i++) {
            if (distances[i].includes("mi")) {
                mi += parseFloat(distances[i]);
            } else if (distances[i].includes("ft")) {
                feet += parseFloat(distances[i]);
            }
        }
        feet += mi * 5280;
        if (feet < 1000) {
            total = feet + " feet"
        } else {
            total = (feet * 0.000189394).toFixed(3);
            total += " mi";
        }
        return total;
    }

    calculateDuration(durations) {
        var total = 0;
        for (var i = 0; i < durations.length; i++) {
            total += parseInt(durations[i]);
        }
        return total;
    }

    componentDidUpdate(){
        if(this.props.trip.length === 2 && this.state.snackBar === false && this.props.optimized === false) {
            this.dragAlert();
        } else if (this.props.trip.length > 2 && this.state.snackBar === true) {
            this.setState({snackBar: false});
        }
    }

    retrieveAlphabet(index) {
        switch (index) {
            case 1: {return "A"}
            case 2: {return "B"}
            case 3: {return "C"}
            case 4: {return "D"}
            case 5: {return "E"}
            case 6: {return "F"}
            case 7: {return "G"}
            case 8: {return "H"}
            case 9: {return "I"}
            case 10: {return "J"}
            case 11: {return "K"}
            case 12: {return "L"}
            case 13: {return "M"}
            case 14: {return "N"}
            case 15: {return "O"}
            case 16: {return "P"}
            case 17: {return "Q"}
            case 18: {return "R"}
            case 19: {return "S"}
            case 20: {return "T"}
            case 21: {return "U"}
            case 22: {return "V"}
            case 23: {return "W"}
            case 24: {return "X"}
            case 25: {return "Y"}
            case 26: {return "Z"}
        }
    }

    render() {
        var listItem = <p></p>
        var optimizeButton;
        var tripStats;
        var totalDistance = this.calculateDistance(this.props.distances);
        var totalDuration = this.calculateDuration(this.props.durations);
        var tripToAlphabet = {}
        var alphabetCounter = 1;
        
        if (this.props.importAnimalsPending || this.props.importExhibitsPending) {
            listItem= (
                <div className='row' id='emptyTripContainer'>
                    <ReactLoading type={"spinningBubbles"} color={"#00C5AB"}/>
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
            } else if (this.props.trip.length === 1) {
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
                            image = item.image_small;
                            break;
                        } case "Attraction": {
                            image = item.image_small;
                            break;
                        } case "Animal": {
                            image = item.image_small;
                            break;
                        } case "Restroom": {
                            image = item.image;
                            break;
                        } case undefined: {
                            image = "https://farm1.staticflickr.com/956/27940952588_0296bce9a3_m.jpg"
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
                // if (this.props.trip.length > 2) {
                //     if (this.props.optimized === true) {
                //         optimizeButton = <div className='row'>
                //                         <button type='submit' className='btn btn-default' id='unOptimizeButton' onClick={() => this.props.optimizeTrip()}>UNOPTIMIZE</button>
                //                     </div>
                //     }
                //     else {
                //         optimizeButton = <div className='row'>
                //                         <button type='submit' className='btn btn-default' id='optimizeButton' onClick={() => this.props.optimizeTrip()}>OPTIMIZE</button>
                //                     </div>
                //     }
                // }
                tripStats = <div className="row" id="tripStats">
                                <p id="dateHoursText">TOTAL DISTANCE: {totalDistance} <br/> TOTAL DURATION: {totalDuration} mins</p>
                            </div>
                const styles = {
                    block: {
                      maxWidth: 200,
                    },
                    toggle: {
                      marginBottom: 16,
                    },
                    thumbOff: {
                      backgroundColor: '#d3dae8',
                    },
                    trackOff: {
                      backgroundColor: '#BAC4D6',
                    },
                    thumbSwitched: {
                      backgroundColor: '#bfe45f',
                    },
                    trackSwitched: {
                      backgroundColor: '#e6f2c6',
                    },
                    labelStyle: {
                      color: '#27708F',
                    },
                  };
                optimizeButton = <div id="optimize" style={styles.block}> 
                                        <Toggle
                                            label="OPTIMIZE TRIP"
                                            thumbStyle={styles.thumbOff}
                                            trackStyle={styles.trackOff}
                                            thumbSwitchedStyle={styles.thumbSwitched}
                                            trackSwitchedStyle={styles.trackSwitched}
                                            labelStyle={styles.labelStyle}
                                            onToggle={() => this.props.optimizeTrip()}
                                        />
                                    </div>
                
                let passedList = this.convertToArray(this.props.trip);


                passedList.forEach((item) => {
                    var coordinates;
                    item = item[1];
                    if (item.type == "Animal") {
                        coordinates = item.location[0];
                    } else {
                        coordinates = item.coordinates.replace(/\s+/g, '');
                    }
                    const letter = this.retrieveAlphabet(alphabetCounter);
                    tripToAlphabet[coordinates] = letter;
                    alphabetCounter += 1;
                })

                var counter = -1;
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
                                    counter += 1;
                                    var itemLocation;
                                    if (item.exhibit_name == null) {
                                        itemLocation = <br/>
                                    } else {
                                        itemLocation = <p id="itemLocation">{item.exhibit_name.replace(/&#039;/g, "'")}</p>
                                    }

                                    var coordinates;
                                    if (item.type == "Animal") {
                                        coordinates = item.location[0];
                                    } else {
                                        coordinates = item.coordinates.replace(/\s+/g, '');
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
                                        } case "Restroom": {
                                            image = item.image
                                            break;
                                        } case undefined: {
                                            image = "https://farm1.staticflickr.com/956/27940952588_0296bce9a3_m.jpg"
                                            break;
                                        } default: break;
                                    }
                                    var distance = <div></div>
                                    if (counter < this.props.distances.length) {
                                        distance = <div className="tripDistance">
                                                    <i class="material-icons md-18">directions_walk</i> &nbsp;
                                                    {this.props.distances[counter]}
                                                    &nbsp;&nbsp;&nbsp;
                                                    <i class="material-icons md-18">access_time</i> &nbsp;
                                                    {this.props.durations[counter]}
                                                </div>
                                    }
                                    
                                    return (
                                        <div key={item.title}>
                                            <div className='simpleItemTrip'>
                                                <div className="row">
                                                    <div className="col-3" id="itemImage">
                                                        <a href={window.location.hash} alt={item.title}><img alt={item.title} src={image}/></a>
                                                    </div>
                                                    <div className='col-8' id="itemInfo">
                                                        <button type="button" title='REMOVE' className="btn btn-remove" onClick={() => this.removeFromTrip(item)}><i className="glyphicon glyphicon-remove"></i></button>
                                                        <a id='itemName' alt={item.title} href={window.location.hash} title={item.title}>{item.title.replace(/&#039;/g, "'")}</a>
                                                        <br/>
                                                        {itemLocation}
                                                        <div className="itemPin">{tripToAlphabet[coordinates]}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {distance}
                                        </div>
                                    )
                                })}
                            </Reorder>
            }
        }
        return (
            <div id="tripList">
                {optimizeButton}
                {listItem}
                {tripStats}
                <Snackbar open={this.state.snackBar} message="You can now drag items in YOUR TRIP to reorder them" autoHideDuration={4000}/>
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
        distances: state.trip.waypointDistances,
        durations: state.trip.waypointDurations,
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
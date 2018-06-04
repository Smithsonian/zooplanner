import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import {expandItem} from '../actions/exploreBarActions';


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {source: []}
    }
     
    // componentDidMount() {
    //     console.log("Animalz", this.props.trip);
    //     var items = [];
    //     for (var i = 0; i < this.props.animalsImport.length; i++) {
    //         items.push(this.props.animalsImport[i].title);
    //     }
    //     for (i = 0; i < this.props.exhibitsImport.length; i++) {
    //         items.push(this.props.exhibitsImport[i].title);
    //     }
    //     for (var i = 0; i < this.props.attractionsImport.length; i++) {
    //         items.push(this.props.attractionsImport[i].title);
    //     }
    //     for (var i = 0; i < this.props.dailyProgramsImport.length; i++) {
    //         items.push(this.props.dailyProgramsImport[i].title);
    //     }
    //     this.setState({source: items});
    // }
    handleNewRequest = (chosenRequest) => {
        console.log(chosenRequest);
        switch(chosenRequest.type) {
            case "Animal": {
                for (var i = 0; i < this.props.animalsImport.length; i++) {
                    if (this.props.animalsImport[i].title === chosenRequest.text) {
                        this.props.expandItem(this.props.animalsImport[i]);
                        break;
                    }
                }
                break;
            }
            case "Exhibit": {
                for (var i = 0; i < this.props.exhibitsImport.length; i++) {
                    if (this.props.exhibitsImport[i].title === chosenRequest.text) {
                        this.props.expandItem(this.props.exhibitsImport[i]);
                        break;
                    }
                }
                break;
            }
            case "DailyProgram": {
                for (var i = 0; i < this.props.dailyProgramsImport.length; i++) {
                    if (this.props.dailyProgramsImport[i].title === chosenRequest.text) {
                        this.props.expandItem(this.props.dailyProgramsImport[i]);
                        break;
                    }
                }
                break;
            }
            case "Attraction": {
                for (var i = 0; i < this.props.attractionsImport.length; i++) {
                    if (this.props.attractionsImport[i].title === chosenRequest.text) {
                        this.props.expandItem(this.props.attractionsImport[i]);
                        break;
                    }
                }
                break;
            }
            case "Restroom": {
                for (var i = 0; i < this.props.restroomsImport.length; i++) {
                    if (this.props.restroomsImport[i].title === chosenRequest.text) {
                        this.props.expandItem(this.props.restroomsImport[i]);
                        break;
                    }
                }
                break;
            }
            default: {
                return;
            }
        }
    }

    render() {
        const dataSource2 = ['12345', '23456', '34567'];
          
        return (
        <div>
            <AutoComplete
            hintText="Type anything"
            openOnFocus={true}
            dataSource={this.props.source}
            filter= {function filter(searchText, key) {
                return key.toLowerCase().includes(searchText.toLowerCase());
              }
            }
            onNewRequest={this.handleNewRequest}
            />
        </div>
        );
    }
  }


function mapStateToProps(state) {
	return {
        animalsImport: state.trip.animalsImport,
        exhibitsImport: state.trip.exhibitImport,
        attractionsImport: state.trip.attractionsImport,
        dailyProgramsImport: state.trip.dailyProgramsImport,
        restroomsImport: state.restrooms.restrooms,
        trip: state.trip.trip,
        source: state.trip.searchBarSource,
	};
}
function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		expandItem: expandItem,
	}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(SearchBar);
import React, {Component} from 'react';
import {connect} from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';

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
        trip: state.trip.trip,
        source: state.trip.searchBarSource,
	};
}
// function matchDispatchToProps(dispatch) {
// 	return bindActionCreators({
// 		clearTrip: clearTrip,
// 		fetchHours: fetchHours,
// 	}, dispatch);
// }
export default connect(mapStateToProps)(SearchBar);
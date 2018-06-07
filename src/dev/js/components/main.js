import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import ExploreBar from './explorebar.js'
import TripBar from './tripbar.js'
import MyMapComponent from './map.js'

class Main extends Component { //called in App
	render() {
		return (
			<div id="content">
		    	<div className='container-fluid'>
			    	<div className='row'>
			    		<div className='col-sm clearfix' id='exploreBar'>
							<ExploreBar/>
						</div>

						<div className='col-sm-7 clearfix' id='mapContainer'>
							<MyMapComponent />
						</div>

						<div className='col-sm clearfix' id='tripBar'>
							<TripBar getDate={this.props.getDate} getHours={this.props.getHours}/>
						</div>
			    	</div> 
			    </div>
		    </div> 
		);

	}
}

export default Main;
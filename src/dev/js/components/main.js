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
			    		<aside className='col' id='exploreBar'>
							<ExploreBar/>
						</aside>

						<div className='col-7' id='mapContainer'>
							<MyMapComponent />
						</div>

						<aside className='col' id='tripBar'>
							<TripBar getDate={this.props.getDate} getHours={this.props.getHours}/>
						</aside>
			    	</div> 
			    </div>
		    </div> 
		);

	}
}

export default Main;
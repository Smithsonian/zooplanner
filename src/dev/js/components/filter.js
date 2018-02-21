import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';

class Filter extends Component {
	render() {
		return (
			<div id='filter'>
				<p className='title'>FILTER</p>
				<hr/>
				<form>
					<div className="row">
						<div className="col-6" id='filterlabel'>
							<input type='checkbox' id='ammenities' name='filter' value='ammenities' onClick={this.props.updateCheckbox} />
							<label htmlFor='ammenities'>AMMENITIES</label>
						</div>
						<div className="col-6" id='filterlabel'>
							<input type='checkbox' id='exhibits' name='filter' value='exhibits' onClick={this.props.updateCheckbox} />
							<label htmlFor='exhibits'>EXHIBITS</label>
						</div>
					</div>

					<div className="row">
						<div className="col-6" id='filterlabel'>
							<input type='checkbox' id='attractions' name='filter' value='attractions' onClick={this.props.updateCheckbox} />
							<label htmlFor='attractions'>ATTRACTIONS</label>
						</div>
						<div className="col-6" id='filterlabel'>
							<input type='checkbox' id='food' name='filter' value='food' onClick={this.props.updateCheckbox} />
							<label htmlFor='food'>FOOD</label>
						</div>
				
					</div>
					<div className="row">
						<div className="col-6" id='filterlabel'>
							<input type='checkbox' id='dailyprogs' name='filter' value='dailyprogs' onClick={this.props.updateCheckbox} />
							<label htmlFor='dailyprogs'>DAILY&nbsp;PROGRAMS</label>
						</div>
						<div className="col-6" id='filterlabel'>
							<input type='checkbox' id='restrooms' name='filter' value='restrooms' onClick={this.props.updateCheckbox} />
							<label htmlFor='restrooms'>RESTROOMS</label>
						</div>
						
					</div>
				</form>
			</div>
		);
	}
}

export default Filter;
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../css/Main.css';
import {connect} from 'react-redux';

class SimpleItem extends Component { //called in simpleitemslist
	render() {
		const htmlImg = "https://nationalzoo.si.edu" + this.props.img;
		return (
			<div className='simpleItem'>
				<div className="row">
					<div className="col-3" id="itemImage">
						<a href="#" alt={this.props.name} onClick={this.props.expandItem}><img src={htmlImg}/></a>
					</div>
					<div className='col-8' id="itemInfo">
						<a id='itemName' alt={this.props.name} href="#" title={this.props.name} onClick={this.props.expandItem}>{this.props.name}</a>
						<p id="itemLocation">{this.props.location}</p>
					</div>
				</div>
			</div>
		);
	}

}

export default SimpleItem;
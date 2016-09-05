import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router"
import Tab from './Tab';

export default class TabBar extends React.Component {
	constructor(props, context){
		super(props, context);
		this.router = context.router;
		this.location = context.location;
	}
	/**
	Render tab bar using 
	*/
	render () {
		return (
			<ul class="nav nav-tabs">
			{ this.props.sections.map((tab,i)=>{
				return ( <Tab url={ tab.url } title={tab.title} key={i}/> ); })
			}
			</ul>
		)
	}
}

TabBar.contextTypes = {
  router: React.PropTypes.object.isRequired,
  location: React.PropTypes.object
};


 

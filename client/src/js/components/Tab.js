import React from 'react';
import ReactDOM from 'react-dom';
import { Link, History } from "react-router"
export default class Tab extends React.Component {
	constructor(props, context){
		super(props, context)
		this.router = context.router;
	}

	render () {
		const isActive = (this.router.isActive(this.props.url)) ? "active" : " "  ;
		let classes = `nav-link ${isActive}`;
		return (
			<li class="nav-item"><Link class={classes} to={this.props.url}>{this.props.title}</Link></li>
		);
	}
}

Tab.contextTypes = {
  router: React.PropTypes.object.isRequired
};

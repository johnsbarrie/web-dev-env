import React from 'react';
import ReactDOM from 'react-dom';

export default class Header extends React.Component {
	
	handleChange (e) {
		this.props.changeTitle(e.target.value);
	}

	render () {
		var isActive=this.props.active;
		return (
			<div>
				<div>{ this.props.title }</div>
				<input onChange={this.handleChange.bind(this)} value={ this.props.title } />
			</div>
		)
	}
}

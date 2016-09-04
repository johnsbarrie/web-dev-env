import React from 'react';
import ReactDOM from 'react-dom';

export default class LabeledInput extends React.Component {
	onChanged (e) {		
		if (this.props.onChanged) {
			this.props.onChanged(this.props.id, this.refs.urlInput.value);
		}
	}

	render () {
		return (
	               <input class="form-control" ref="urlInput" type="text" value={ this.props.value } onChange={this.onChanged.bind(this)} placeholder={ this.props.label }></input>
		)
	}
}

import React from 'react';
import ReactSpinner from 'react-spin';
import dispatcher from '../Dispatcher'
import AppModelConst from '../const/AppModelConst'
import AppModel from '../stores/AppModel'
export default class Spinner extends React.Component {
	componentWillMount () {
		this.opts = {
			lines: 13 // The number of lines to draw
			, length: 28 // The length of each line
			, width: 4 // The line thickness
			, radius: 22 // The radius of the inner circle
			, scale: 1 // Scales overall size of the spinner
			, corners: 1 // Corner roundness (0..1)
			, color: '#FFF' // #rgb or #rrggbb or array of colors
			, opacity: 0.25 // Opacity of the lines
			, rotate: 0 // The rotation offset
			, direction: 1 // 1: clockwise, -1: counterclockwise
			, speed: 1 // Rounds per second
			, trail: 60 // Afterglow percentage
			, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
			, zIndex: 2e9 // The z-index (defaults to 2000000000)
			, className: 'spinner' // The CSS class to assign to the spinner
			, top: '50%' // Top position relative to parent
			, left: '50%' // Left position relative to parent
			, shadow: true // Whether to render a shadow
			, hwaccel: true // Whether to use hardware acceleration
			, position: 'absolute' // Element positioning
		}

		this.state=AppModel.getSpinnerState();
		this.setSpinnerState=this.setSpinnerState.bind(this);
		AppModel.on(AppModelConst.spinnerStateChanged, this.setSpinnerState);
	}

	componentWillUnmount() {
		AppModel.removeListener(AppModelConst.spinnerStateChanged, this.setSpinnerState)
	}

	setSpinnerState(){
		this.setState(AppModel.getSpinnerState());
	}

	render () {
		return (
			<div >
				<ReactSpinner config={this.opts} stopped={ !this.state.spinnerStateSpinning}/>
			</div>
		)
	}
}



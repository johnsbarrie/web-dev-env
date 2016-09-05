import React from 'react';
import dispatcher from '../../Dispatcher'
import AppModelConst from '../../const/AppModelConst'
import AppModel from '../../stores/AppModel'
export default class SpinnerControlPage extends React.Component {
	/** Setup page with spinner state
	 listen tfor spinner state change
	*/
	componentWillMount() {
		this.state=AppModel.spinnerState;
		this.setSpinnerState=this.setSpinnerState.bind(this);
		AppModel.on(AppModelConst.spinnerStateChanged, this.setSpinnerState);
	}
	/**
	 Remove listen on AppModel
	*/
	componentWillUnmount() {
		AppModel.removeListener(AppModelConst.spinnerStateChanged, this.setSpinnerState)
	}
	/**
	 triggered by state change on Appmodel
	*/
	setSpinnerState(){
		this.setState(AppModel.spinnerState);
	}
	/**
	 triggered by click on button
	*/
	clicked(){
		dispatcher.dispatch({ "action":AppModelConst.toggleSpinner});
	}

	render () {
		return (
			<div class="bd-example">
				<div class="card">
					<div class="card-block">
					<p  class="card-text">A basic React/Flux example. Press on the button to show the spinner !</p>
					<button class="btn btn-info" onClick={ ()=>this.clicked()}>{this.state.text}</button>
					</div>
				</div>
			</div>
		)
	}
}




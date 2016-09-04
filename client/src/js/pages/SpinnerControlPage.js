import React from 'react';
import dispatcher from '../Dispatcher'
import AppModelConst from '../const/AppModelConst'
import AppModel from '../stores/AppModel'
export default class SpinnerControlPage extends React.Component {
	componentWillMount() {
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

	clicked(){
		dispatcher.dispatch("toggleSpinner");
	}

	render () {
		return (
			<div class="bd-example">
				<div class="card">
					<div class="card-block">
					<p  class="card-text">Press on the button to show the spinner !</p>
					<button class="btn btn-info" onClick={ ()=>this.clicked()}>{this.state.text}</button>
					</div>
				</div>
			</div>
		)
	}
}




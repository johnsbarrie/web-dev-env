import React from 'react';
import dispatcher from '../../Dispatcher'
import AppModelConst from '../../const/AppModelConst'
import AppModel from '../../stores/AppModel'
export default class SpinnerControlPage extends React.Component {
	/** 
	 Setup page with spinner state
	 listen tfor spinner state change
	*/
	componentWillMount() {
		this.setJson = this.setJson.bind(this);
		AppModel.on(AppModelConst.jsonLoaded, this.setJson);
		dispatcher.dispatch ({ "action" : AppModelConst.loadJson });
	}
	/**
	 Remove listen on AppModel
	*/
	componentWillUnmount() {
		AppModel.removeListener(AppModelConst.jsonLoaded, this.setJson)
	}
	/**
	 triggered by state change on Appmodel
	*/
	setJson(){
		console.log("Loaded");
		// this.setState(AppModel.spinnerState);
	}
	/**
	 triggered by click on button
	*/
	render () {
		return (
			<div >
				Server Connect
			</div>
		)
	}
}




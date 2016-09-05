import { EventEmitter } from 'events';
import _ from "lodash";
import axios from "axios"
import dispatcher from "../Dispatcher";
import AppModelConst from '../const/AppModelConst'
/**
	AppModel to stock application state and emit changes
*/
class AppModel extends EventEmitter {
	
	constructor(){
		super();
		//spinner state
		this._spinnerStateSpinning=false;
		this._qrcodeUrl="gamesyscorporate.com";
	}

	// toggle spinner state
	toggleSpinner(){

		this._spinnerStateSpinning=!this._spinnerStateSpinning;
		
		this.emit(AppModelConst.spinnerStateChanged);
	}

	// actual state of the spinner
	get spinnerState(){
		var spinState = {spinnerStateSpinning:this._spinnerStateSpinning}
		spinState.text = this._spinnerStateSpinning ? "Stop Spinner" : "Start Spinner";
		return spinState;
	}

	//stock the url
	qrcodeUrlChanging(url){
		this._qrcodeUrl=url;
		this.emit(AppModelConst.qrcodeUrlChanged);
	}

	get qrcodeState(){
		return {url:this._qrcodeUrl};
	}

	// handle flux emitions 
	handleAction(e){
		switch(e.action){
			case AppModelConst.toggleSpinner:
				this.toggleSpinner();
				break;
			case AppModelConst.qrcodeUrlChanging:
				this.qrcodeUrlChanging(e.data); 
				break;
			default :
				console.log("action "+ action +" not handled")
		}
	}
}

const appModel = new AppModel;
export default appModel;

dispatcher.register(appModel.handleAction.bind(appModel))

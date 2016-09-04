import { EventEmitter } from 'events';
import _ from "lodash";
import axios from "axios"
import dispatcher from "../Dispatcher";
import AppModelConst from '../const/AppModelConst'

class AppModel extends EventEmitter {
	
	constructor(){
		super();

		this.spinnerStateSpinning=false;
		/*
		axios.get("/students.json")
  			.then((response)=> {
  				try{
  					this.students=JSON.parse(JSON.stringify(response.data));
  					this.emit("change");
  				}catch(e){
  					console.log("student json erreur",e);
  				}
  			})
		*/
	}

	toggleSpinner(){
		this.spinnerStateSpinning=!this.spinnerStateSpinning;
		this.emit(AppModelConst.spinnerStateChanged);
	}

	getSpinnerState(){
		var spinState={spinnerStateSpinning:this.spinnerStateSpinning}
		spinState.text= this.spinnerStateSpinning ? "Stop Spinner" : "Start Spinner";
		return spinState;
	}

	handleAction(action){
		switch(action){
			case "toggleSpinner":
				this.toggleSpinner();
				break;
			default :
				console.log("action "+ action +" not handled")
		}
	}
}

const appModel = new AppModel;
export default appModel;

dispatcher.register(appModel.handleAction.bind(appModel))

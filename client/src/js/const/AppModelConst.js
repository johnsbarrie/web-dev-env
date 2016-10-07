/**
 constant for flux and model emitters
*/
export default class AppModelConstants {
	// spinner
	static get spinnerStateChanged(){ return "spinnerStateChanged"; };
	static get toggleSpinner(){ return "spinnerStateChanged"; };

	// qrcode 
	static get qrcodeUrlChanging(){ return "qrcodeUrlChanging"; };	
	static get qrcodeUrlChanged(){ return "qrcodeUrlChanged"; };	

	// qrcode 
	static get loadJson(){ return "loadJson"; };	
	static get jsonLoaded(){ return "jsonLoaded"; };	
}
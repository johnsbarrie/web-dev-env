import React from 'react';
import ReactDOM from 'react-dom';
import QRCodeVisual from "../../pixi/QRCodeVisual";
import Pixi from "../components/Pixi"
import QRCode from 'qrcode-npm'
import LabeledInput from "../components/LabeledInput"
import dispatcher from '../../Dispatcher'
import AppModelConst from '../../const/AppModelConst'
import AppModel from '../../stores/AppModel'
/**
 A little qrcode generator to show the interact between react pixi. 
*/
export default class QRcode extends React.Component {
	/**
	Make qrcode Pixi generator object
	Listen for  changes on app model 
	*/
	componentWillMount () {
		this.urlChanged=this.urlChanged.bind(this);
		AppModel.on(AppModelConst.qrcodeUrlChanged, this.urlChanged);

		this.pixiStageController=new QRCodeVisual();
		this.state=AppModel.qrcodeState;
	}
	/**
	Generate qrcode when pixi stage is ready
	Listen for key changes
	*/
	componentDidMount() {
		this.generateStructure(this.state.url);
		document.onkeydown = this.keyDown.bind(this)
	}
	/**
	Clean unmount
	*/
	componentUnmount() {
		document.onkeydown = null;
		AppModel.removeListener(AppModelConst.qrcodeUrlChanged, this.urlChanged);
	}
	/**
	Detect whether key touched is the ENTER
	*/
	keyDown(e){
		e = e || window.event;
		if (e.keyCode == 13) {
			this.onClick();
		}
	}
	/**
	Generate 
	*/
	onClick(){
		this.generateStructure(this.state.url)
	}

	onUrlChanging (id, value){
		dispatcher.dispatch({ "action":AppModelConst.qrcodeUrlChanging, data:value});
	}
	/**
	Url on model has changed trigger refresh
	*/
	urlChanged(){
		this.setState(AppModel.qrcodeState);
	}
	/**
	Generate a qrcode structure from text value
	Pass the qrcode to the pixi module
	*/
	generateStructure(text){
		// do nothing if there is no text 
		if(text=="" || text==null){return;}

		this.qr = QRCode.qrcode(4, 'M');
		this.qr.addData(text);
		this.qr.make();

		var qrstructure=[]
		for (var r = 0; r < this.qr.getModuleCount(); r ++) {
			qrstructure[r]=[];
			for (var c = 0; c < this.qr.getModuleCount(); c ++) {
				qrstructure[r][c]=this.qr.isDark(r, c)? 0 : 1;
			}
		}
		this.pixiStageController.addStructure (qrstructure);
	}

	render () {
		return (
			<div>
				<div><Pixi ref='qrcode' gameId="qrcode" game={ this.pixiStageController } width="400" height="400"  /> </div>
				<div class="row">
					<div class="col-sm-4">
						<LabeledInput  id="url" label="URL" required={true} onChanged={this.onUrlChanging.bind(this)} value={ this.state.url }/>
					</div>
					<div class="col-sm-2"> 
						<button class="btn btn-info" onClick={ this.onClick.bind(this)} >generate</button>
					</div>
				</div>
			</div>
		)
	}
}


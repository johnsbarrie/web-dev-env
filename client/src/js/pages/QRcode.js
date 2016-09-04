import React from 'react';
import ReactDOM from 'react-dom';
import Pixi from "../components/Pixi"
import QRCode from 'qrcode-npm'
import LabeledInput from "../components/LabeledInput"
export default class QRcode extends React.Component {
	componentWillMount () {
		this.game= new QRCodeVisual();
		this.state={url:"gamesyscorporate.com"};
		this.generateStructure(this.state.url);
	}

	generateStructure(text){
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
		this.game.addStructure (qrstructure);
	}

	onClick(){
		this.generateStructure(this.state.url)
	}

	onChanged (id, value){
		this.setState({url:value});
	}

	onDownload (id, value){
		var img = new Image();
		img.src=this.refs.qrcode.refs.qrcode.firstChild.toDataURL("image/png", 1)
		console.log(img);
		document.body.appendChild(img);
	}

	render () {
		return (
			<div>
				<div><Pixi ref='qrcode' gameId="qrcode" game={ this.game } width="400" height="400"  /> </div>
				<div class="row">
					<div class="col-sm-4">
						<LabeledInput id="url" label="URL" required={true} onChanged={this.onChanged.bind(this)} value={ this.state.url }/>
					</div>
					<div class="col-sm-2"> 
						<button class="btn btn-info" onClick={ this.onClick.bind(this)} >generate</button>
					</div>
					{/**
					<div class="col-sm-2">
						<button class="btn btn-primary" onClick={ this.onDownload.bind(this)} >download</button>
						</div>
					*/}
				</div>
			</div>
		)
	}
}

class QRCodeVisual {

	constructor(){
		this.stage = new PIXI.Stage();
		var bg = new PIXI.Sprite(PIXI.Texture.fromImage("assets/bg.png"));
		this.stage.interactive=true;
		this.stage.addChild(bg);
		bg.scale.x = 1024;
		bg.scale.y = 768;
		this.qrSize=320;
	}

	removeAllSprites(){
		for(var sprite in this.oldSprites){
			this.stage.removeChild(this.oldSprites[sprite]);
		}
	}

	addStructure(structure){
		this.oldSprites=this.sprites;
		for(var sprite in this.sprites){
			//
			createjs.Tween.get(this.sprites[sprite])
		        .wait(200)
		        .to({x: Math.random()*this.qrSize, y:Math.random()*this.qrSize, alpha:0, visible:true }, 500)
		        .call(()=>{
		        	this.removeOldClips 
		        });
	        createjs.Tween.get(this.sprites[sprite].scale)
	        .wait(200)
	        .to({ x:1, y:1  }, 400)
		    
		}

		this.structure=structure;
		this.sprites=[]
		for(var i in this.structure){
			for(var j in this.structure[i]){
				var s=new PIXI.Sprite(PIXI.Texture.fromImage("assets/bg.png"));
				s.scale.x=1;
				s.scale.y=1;
				s.tint=(this.structure[i][j]==0)? 0x000000 : 0xFFFFFF;
				
				s.x=Math.random()*this.qrSize;
				s.y=Math.random()*this.qrSize;
				this.sprites.push(s);
				this.stage.addChild(s)

				s.alpha = 0;
    			createjs.Tween.get(s)
		        .wait(200)
		        .to({ x:j*10, y:i*10 , alpha:1, visible:true }, 500)

		        createjs.Tween.get(s.scale)
		        .wait(500)
		        .to({ x:10, y:10  }, 400)
			}
		}
	}

	tick(){

	}
}
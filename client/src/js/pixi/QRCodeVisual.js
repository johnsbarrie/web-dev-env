/**
 A class to control the generation of a qrcode with Pixi
*/
export default class QRCodeVisual {
	/**
	Create stage and background
	*/
	constructor(){
		this.stage = new PIXI.Stage();
		this.bgImagePath = "assets/img/bg.png"
		var bg = new PIXI.Sprite(PIXI.Texture.fromImage(this.bgImagePath));
		this.stage.addChild(bg);
		bg.scale.x = 1024;
		bg.scale.y = 768;
		this.qrSize=320;
	}
	/**
	Create a series of squares from the qrcode structure
	and animate them onto the screen.
	If there are existing square animate them out and remove them. 
	*/
	addStructure(structure){

		this.oldSprites=this.sprites;
		for(var sprite in this.sprites){
			createjs.Tween.get(this.sprites[sprite])
		        .wait(200)
		        .to({x: Math.random()*this.qrSize, y:Math.random()*this.qrSize, alpha:0, visible:true }, 500)
		        .call(()=>{
		         setTimeout(()=> {this.removeAllSprites()}, 10);	
		        });
	        createjs.Tween.get(this.sprites[sprite].scale)
	        .wait(200)
	        .to({ x:1, y:1  }, 400);
		}

		this.structure=structure;
		this.sprites=[]
		for(var i in this.structure){
			for(var j in this.structure[i]){
				var s=new PIXI.Sprite(PIXI.Texture.fromImage(this.bgImagePath));
				s.scale.x=1;
				s.scale.y=1;
				s.tint=(this.structure[i][j]==0)? 0x000077 : 0xFFFFFF;
				
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
	/**
	Remove Sprites from the stage and delete reference to them.
	*/
	removeAllSprites(){
		for(var sprite in this.oldSprites){
			this.stage.removeChild(this.oldSprites[sprite]);
		}
		this.oldSprites=null;
	}

	tick(){

	}
}
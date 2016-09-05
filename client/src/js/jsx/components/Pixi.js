import React from 'react';
import ReactDOM from 'react-dom';

export default class Pixi extends React.Component {	
	/**
	Basic Pixi render		
	*/
	componentWillMount () {
		this.onChanged= this.props.onChanged;
		this.scale=window.devicePixelRatio
		this.renderer = PIXI.autoDetectRenderer(this.props.width, this.props.height, { transparent: true });
	}
	/**
	Attach the PIXI render to the DOM and start the animate render loop
	*/
	componentDidMount () {
		var el = document.getElementById(this.props.gameId);
		el.appendChild(this.renderer.view);
		this.renderer.view.style.width=this.props.width+"px";
		this.renderer.view.style.height=this.props.height+"px";
		this.animate();
		this.now= Date.now();
		this.then = Date.now();
		this.interval = 1000/400;
		this.delta;
	}
	/**
	Render Pixi game using requestAnimationFrame to loop
	*/
	animate() {
		this.now = Date.now();
    	this.delta = this.now - this.then;
		requestAnimationFrame(()=>{ this.animate()});
    	if (this.delta > this.interval) {
    		this.then = Date.now();
			this.renderer.render(this.props.game.stage);
    		this.props.game.tick();
    	}
   	}

	render () {
		return (
	        <div ref={this.props.gameId} id={this.props.gameId}></div>
		)
	}
}

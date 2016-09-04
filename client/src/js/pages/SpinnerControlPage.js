import React from 'react';
import dispatcher from '../Dispatcher'
export default class SpinnerControlPage extends React.Component {
	componentWillMount () {
		this.state={loaderstate:"showloader", loaderText:"Start Spin"}
	}

	clicked(){
		dispatcher.dispatch({type:this.state.loaderstate});
		
		if(this.state.loaderstate=="showloader"){
			var loaderstate="hideloader";
			this.setState({loaderstate:loaderstate, loaderText:"Stop Spin"})
		}else{
			this.setState({loaderstate:"showloader", loaderText:"Start Spin"})
		}

	}

	render () {
		
		return (
			<div class="bd-example">
				<div class="card">
					<div class="card-block">
					<p  class="card-text">Press on the button to show the spinner !</p>
					<button class="btn btn-info" onClick={ ()=>this.clicked()}>{this.state.loaderText}</button>
					</div>
				</div>
			
			</div>
			
		)
	}
}




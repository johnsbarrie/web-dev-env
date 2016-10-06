import React from 'react';
import dispatcher from '../../Dispatcher'
export default class SpinnerControlPage extends React.Component {
	render () {
		return (
			<div class="bd-example">
				<div class="card ">
					<div class=" card-header card-info">ReactJS - Flux Development environment</div>
					<div class="card-block ">
						<p  class="card-text ">Hello, </p>
						<p  class="card-text ">There are two examples in this client : </p>
						<ul>
							<li><i>[Spinner tab]</i> shows a basic <i>React-Flux</i> interaction </li>
							<li><i>[QRcode panel]</i> has React interacting with a Pixi stage</li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}




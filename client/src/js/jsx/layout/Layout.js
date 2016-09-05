import React from 'react';
import ReactDOM from 'react-dom';
import TabBar from '../components/TabBar';
import Header from './Header';
import Foot from './Footer';
import Spinner from '../components/Spinner';

export default class Layout extends React.Component {
	/**
		basic layout with dynamic tab generated from a object. 
		This is not necessary good practice but it shows how to dynamic React views from an object.
	*/
	constructor(){
		super();
		this.state={
			title: "Welcome",
			sections:[ 
						{  title:"Welcome", url:"home"  },
						{  title:"Spinner", url:"spinner" },
						{  title:"QRcode", url:"qrcode"  },
					]
		}
	}

	render (){
		return (
			<div>
				<TabBar sections={this.state.sections }/>
				{this.props.children}
				<Spinner spin={false} showloaderconstant="showloader" hideloaderconstant="hideloader"/>
				<Foot/>
			</div>
		)
	}
}
import React from 'react';
import ReactDOM from 'react-dom';
import TabBar from '../components/TabBar';
import Header from './Header';
import Foot from './Footer';
import Spinner from '../components/Spinner';

export default class Layout extends React.Component {
	constructor(){
		super();
		this.state={
			title: "Welcome",
			sections:[ 
						{  title:"Welcome", url:"home"  },
						{  title:"QRcode", url:"qrcode"  },
						{  title:"Spinner", url:"spinner" }
					]
		}
	}

	changeTitle(title){
		this.setState({title})
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
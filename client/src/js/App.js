import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route , IndexRoute, hashHistory, IndexRedirect } from 'react-router';

import Layout from './layout/Layout';
import Home from './pages/Home';
import QRCode from './pages/QRCode';
import SpinnerControl from './pages/SpinnerControlPage';

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>	
			<IndexRedirect to="/home" />
			<Route path="home" component={Home}></Route>
			<Route path="qrcode" component={QRCode}></Route>
			<Route path="spinner" component={SpinnerControl}></Route>
		</Route>
	</Router>, document.getElementById("app")
);
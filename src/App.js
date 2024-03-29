import React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import Router from './router/index';
import store from '@/redux/store';
import './assets/css/app';
import './assets/css/common';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Router />
			</Provider>
		);
	}
}

export default hot(App);

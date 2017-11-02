'use strict';

import { createStore } from 'redux';
import React, {PropTypes } from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './configureStore';
import ShoppingCart from './ShoppingCart';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store=configureStore({items: [], total: 0});

render(
	<Provider store={store}>
		<ShoppingCart />
	</Provider>,
	document.getElementById('app')
);

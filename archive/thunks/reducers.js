'use strict';

import { combineReducers } from 'redux';

const items = (state = [] , action) => {
	switch(action.type){
		case 'ADD_ITEMS':
			return [...state,
				Object.assign({}, action.item)
			];
		case 'CLEAR_CART':
			return [];
		default:
			return state;
	}
};

const total = (state = 0 , action) => {
	switch(action.type){
		case 'UPDATE_TOTAL':
			return state + action.price;
		case 'CLEAR_TOTAL':
			return 0;
		default:
			return state;
	}
};

const orderStatus = (state = null , action) => {
	switch(action.type){
		case 'ORDER_STATUS':
			return Object.assign({}, state, {stsCde:action.status.stsCde, stsMsg: action.status.stsMsg});
		case 'CLEAR_STATUS':
			return null;
		default:
			return state;
	}
};

const rootReducer=combineReducers({
	items,
	total,
	orderStatus
});

export {items, total, orderStatus}

export default rootReducer;

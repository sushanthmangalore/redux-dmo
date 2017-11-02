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

const rootReducer=combineReducers({
	items,
	total
});

export default rootReducer;

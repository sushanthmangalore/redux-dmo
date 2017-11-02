'use strict';

import { placeOrderApi } from './orderAPI';

export function addItemToCart(item) {
	return { type: "ADD_ITEMS", item };
}

export function updateTotal(price) {
	return { type: "UPDATE_TOTAL", price };
}

export function clearCart() {
	return { type: "CLEAR_CART" };
}

export function clearTotal() {
	return { type: "CLEAR_TOTAL" };
}

export function clearStatus() {
	return { type: "CLEAR_STATUS" };
}

export function updateStatus(status) {
	return { type: "ORDER_STATUS", status };
}


export function placeOrder() {
	return (dispatch, getState) => {
		const state = getState();
		const promise = placeOrderApi(state.items);
		promise.then(data => {
			dispatch(updateStatus(data));
		}).catch(err => {
			dispatch(updateStatus(err));
		});
	};
}

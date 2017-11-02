'use strict';

export function addItemToCart(item){
	return {type: "ADD_ITEMS", item};
}

export function updateTotal(price){
	return {type: "UPDATE_TOTAL", price};
}

export function clearCart(){
	return {type: "CLEAR_CART"};
}

export function clearTotal(){
	return {type: "CLEAR_TOTAL"};
}



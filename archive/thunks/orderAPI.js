'use strict';

const placeOrderApi = function (items){
	if(items.length < 1){
		return Promise.reject({stsCde:1, stsMsg: "There must be at least one item in the cart."})
	}else{
		return Promise.resolve({stsCde:0, stsMsg: "Order placed successfully."})
	}
}

export { placeOrderApi };

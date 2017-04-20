'use strict';

jest.unmock('../orderAPI');

import * as api from '../orderAPI';

describe("orderAPI tests", () => {

		it("will test placeOrderApi success scenario", () => {
			const result = api.placeOrderApi([{name: "Eggs", price: "$3"}]);
			result.then(data => {
				expect(data).toEqual({stsCde:0, stsMsg: "Order placed successfully."});
			});
		});

		it("will test placeOrderApi failure scenario", () => {
			const result = api.placeOrderApi([]);
			result.then(null, data => {
				expect(data).toEqual({stsCde:1, stsMsg: "There must be at least one item in the cart."});
			});
		});

});

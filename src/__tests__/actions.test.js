'use strict';
jest.unmock('../actions');

import { placeOrderApi } from '../orderAPI';
import * as actions from '../actions';

describe("actions file tests", () => {

	describe("action creator tests", () => {

		beforeAll(() =>{
			//	jest.resetAllMocks();
		});

		it("will test addItemToCart", () => {
			const item= {name: "Eggs", price: "$3"};
			const actionStub= {type: "ADD_ITEMS", item:{name: "Eggs", price: "$3"}};
			const result = actions.addItemToCart(item);
			expect(result).toEqual(actionStub);
		});

		it("will test updateTotal", () => {
			const actionStub= {type: "UPDATE_TOTAL", price:3};
			const result = actions.updateTotal(3);
			expect(result).toEqual(actionStub);
		});

		it("will test clearCart", () => {
			const actionStub= {type: "CLEAR_CART"};
			const result = actions.clearCart();
			expect(result).toEqual(actionStub);
		});

		it("will test clearTotal", () => {
			const actionStub= {type: "CLEAR_TOTAL"};
			const result = actions.clearTotal();
			expect(result).toEqual(actionStub);
		});

		it("will test clearStatus", () => {
			const actionStub= {type: "CLEAR_STATUS"};
			const result = actions.clearStatus();
			expect(result).toEqual(actionStub);
		});

		it("will test updateStatus", () => {
			const status = {stsCde:1, stsMsg: "There must be at least one item in the cart."}
			const actionStub= {type: "ORDER_STATUS", status:{stsCde:1, stsMsg: "There must be at least one item in the cart."}};
			const result = actions.updateStatus(status);
			expect(result).toEqual(actionStub);
		});
	});

	describe("thunk tests", () => {
		beforeAll(() =>{
			jest.resetAllMocks();
		});

		it("will test placeOrder thunk happy path", () => {
			placeOrderApi.mockImplementation(() => Promise.resolve({stsCde:0, stsMsg: "Order placed successfully."}));
			const result = actions.placeOrder();
			const dispatch = jest.fn();
			const getState = jest.fn().mockImplementation(() => { return {items:[{name: "Eggs", price: "$3"}]} });
			result(jest.fn(), getState);
		});

		it("will test placeOrder thunk empty cart case", () => {
			placeOrderApi.mockImplementation(() => Promise.reject({stsCde:1, stsMsg: "There must be at least one item in the cart."}));
			const result = actions.placeOrder();
			const dispatch = jest.fn();
			const getState = jest.fn().mockImplementation(() => { return {items:[]} });
			result(jest.fn(), getState);
		});

	});
});

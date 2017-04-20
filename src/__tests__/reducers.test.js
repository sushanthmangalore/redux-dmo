'use strict';

jest.unmock('../reducers');

import { combineReducers } from 'redux';
import * as reducers from '../reducers';

describe("reducers file tests", () => {

	describe("reducers tests", () => {

		it("will test items reducer for ADD_ITEMS action", () => {
			const stateStub= [{name: "Eggs", price: "$3"}];
			const action= {type: "ADD_ITEMS", item:{name: "Eggs", price: "$3"}};
			const result = reducers.items([], action);
			expect(result).toEqual(stateStub);
		});

		it("will test items reducer for CLEAR_CART action", () => {
			const stateStub= [];
			const action= {type: "CLEAR_CART"};
			const result = reducers.items([], action);
			expect(result).toEqual(stateStub);
		});

		it("will test items reducer for default case", () => {
			const stateStub= [];
			const action = {type: "RANDOM"};
			const result = reducers.items([], action);
			expect(result).toEqual(stateStub);
		});

		it("will test total reducer for UPDATE_TOTAL action", () => {
			const stateStub = 3;
			const action= {type: "UPDATE_TOTAL", price:3};
			const result = reducers.total(0, action);
			expect(result).toEqual(stateStub);
		});

		it("will test total reducer for CLEAR_TOTAL action", () => {
			const stateStub= 0;
			const action= {type: "CLEAR_TOTAL"};
			const result = reducers.total(0, action);
			expect(result).toEqual(stateStub);
		});

		it("will test total reducer for default case", () => {
			const stateStub= 0;
			const action= {type: "RANDOM"};
			const result = reducers.total(0, action);
			expect(result).toEqual(stateStub);
		});

		it("will test orderStatus reducer for ORDER_STATUS action", () => {
			const stateStub = {stsCde:0, stsMsg: "Order Placed successfully."};
			const action= {type: "ORDER_STATUS", status: {stsCde:0, stsMsg: "Order Placed successfully."}};
			const result = reducers.orderStatus(null, action);
			expect(result).toEqual(stateStub);
		});

		it("will test orderStatus reducer for CLEAR_STATUS action", () => {
			const stateStub= null;
			const action= {type: "CLEAR_STATUS"};
			const result = reducers.orderStatus(null, action);
			expect(result).toEqual(stateStub);
		});

		it("will test orderStatus reducer for default case", () => {
			const stateStub= null;
			const action= {type: "RANDOM"};
			const result = reducers.orderStatus(null, action);
			expect(result).toEqual(stateStub);
		});

	});

});

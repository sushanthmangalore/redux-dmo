jest.unmock('../actions');
import * as actions from '../actions';
import { placeOrderApi } from '../orderAPI';

describe("Tests for all the functions in the actions.js file", () => {

    it("will verify addItemToCart function", () => {
        const testInput = {name: "Eggs", price: "$3.00"};
        const responseExpected = {type: "ADD_ITEMS", item: testInput};
        const responseActual = actions.addItemToCart(testInput);
        expect(responseActual.type).toEqual(responseExpected.type);
        expect(responseActual.item).toEqual(responseExpected.item);
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
			const status = {stsCde:1, stsMsg: "There must be at least one item in the cart."};
			const actionStub= {type: "ORDER_STATUS", status:{stsCde:1, stsMsg: "There must be at least one item in the cart."}};
			const result = actions.updateStatus(status);
			expect(result).toEqual(actionStub);
		});

     it("will verify placeOrder function success scenario", () => {
        const testState = {items: [{name: "Eggs", price: "$3.00"}]};
        const innerFunction = actions.placeOrder();
        const dispatch = jest.fn();
        const getState = jest.fn();
        //eslint-disable-next-line import/namespace
        actions.updateStatus=jest.fn();
        getState.mockReturnValue(testState);
        placeOrderApi.mockReturnValue(Promise.resolve({stsCde:0, stsMsg: "Order placed successfully."}));
        innerFunction(dispatch, getState);
        //expect(dispatch).toBeCalled();
        //expect(updateStatus).toBeCalled();
    });

    it("will verify placeOrder function failure scenario", () => {
        const testState = {items: [{name: "Eggs", price: "$3.00"}]};
        const innerFunction = actions.placeOrder();
        const dispatch = jest.fn();
        const getState = jest.fn();
        //eslint-disable-next-line import/namespace
        actions.updateStatus=jest.fn();
        getState.mockReturnValue(testState);
        placeOrderApi.mockReturnValue(Promise.reject({stsCde:1, stsMsg: "There must be at least one item in the cart."}));
        innerFunction(dispatch, getState);
        //expect(dispatch).toBeCalled();
        //expect(updateStatus).toBeCalled();
    });
});
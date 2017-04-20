'use strict';
jest.unmock('../ShoppingCart');

import { shallow } from 'enzyme';
import React from 'react';
import * as actions from '../actions';
import ShoppingCart, {mapStateToProps, mapDispatchToProps } from '../ShoppingCart';

describe("Shopping Cart tests", () => {

	describe("Shopping Cart DOM tests", () => {

		it("will verify the component", () => {
			const wrapper = shallow(<ShoppingCart.WrappedComponent items={[{name: "Eggs", price: "$3"}]} />);
			expect(wrapper).toBeDefined();
		});

		it("will verify the addToCart function for Eggs", () => {
			const wrapper = shallow(<ShoppingCart.WrappedComponent items={[{name: "Eggs", price: "$3"}]} actions={{addItemToCart:jest.fn(), updateTotal: jest.fn()}} />);
			wrapper.find("#addToCartEggs").simulate('click');
			expect(wrapper.instance().props.actions.addItemToCart).toBeCalled();
			expect(wrapper.instance().props.actions.updateTotal).toBeCalled();
		});

		it("will verify the addToCart function for Milk", () => {
			const wrapper = shallow(<ShoppingCart.WrappedComponent items={[{name: "Milk", price: "$4"}]} actions={{addItemToCart:jest.fn(), updateTotal: jest.fn()}} />);
			wrapper.find("#addToCartMilk").simulate('click');
			expect(wrapper.instance().props.actions.addItemToCart).toBeCalled();
			expect(wrapper.instance().props.actions.updateTotal).toBeCalled();
		});

		it("will verify the clear function", () => {
			const wrapper = shallow(<ShoppingCart.WrappedComponent items={[{name: "Milk", price: "$4"}]} actions={{clearCart:jest.fn(), clearTotal: jest.fn(), clearStatus: jest.fn()}} />);
			wrapper.find("#clearCart").simulate('click');
			expect(wrapper.instance().props.actions.clearCart).toBeCalled();
			expect(wrapper.instance().props.actions.clearTotal).toBeCalled();
			expect(wrapper.instance().props.actions.clearStatus).toBeCalled();
		});
});

	describe("react-redux tests", () => {

		it("will test mapStateToProps", () => {
			const propsStub = {items: [{name: "Eggs", price: "$3"}], total: 3, orderStatus: {stsCde:0, stsMsg: "Order placed successfully."}};
			const state={items: [{name: "Eggs", price: "$3"}], total: 3, orderStatus: {stsCde:0, stsMsg: "Order placed successfully."}};
			const props = mapStateToProps(state);
			expect(props).toEqual(propsStub);
		});

		it("will test mapDispatchToProps", () => {
			const result = mapDispatchToProps(jest.fn());
			result.actions.addItemToCart();
			result.actions.updateTotal();
			result.actions.clearCart();
			result.actions.clearTotal();
			result.actions.clearStatus();
			result.actions.updateStatus();
			result.actions.placeOrder();
			expect(actions.addItemToCart).toBeCalled();
			expect(actions.updateTotal).toBeCalled();
			expect(actions.clearCart).toBeCalled();
			expect(actions.clearTotal).toBeCalled();
			expect(actions.clearStatus).toBeCalled();
			expect(actions.updateStatus).toBeCalled();
			expect(actions.placeOrder).toBeCalled();
		});

	});
});

jest.unmock('../ShoppingCart');
import ShoppingCart, {mapDispatchToProps, mapStateToProps} from '../ShoppingCart';
import React from 'react';
import { shallow } from 'enzyme';
import * as actionsMock from '../actions';

describe("Tests for Shopping Cart component", () => {

    it("will test the rendering of the component", () => {
        const tree = shallow(<ShoppingCart.WrappedComponent total={0} orderStatus={{}} actions={actionsMock} 
items={[{name: "Eggs", price: "$3.00"}]} />);
        expect(tree).toBeDefined();
    });

    it("will test the click of the Add to Cart Button for Milk", () => {
        const tree = shallow(<ShoppingCart.WrappedComponent total={0} orderStatus={{}} actions={actionsMock} 
        items={[{name: "Eggs", price: "$3.00"}]} />);
        tree.instance().addToCart=jest.fn();
        tree.find('#addToCartMilk').simulate('click');
        expect(tree.instance().addToCart).toBeCalled();
    });

    it("will test the click of the Add to Cart Button for Eggs", () => {
        const tree = shallow(<ShoppingCart.WrappedComponent total={0} orderStatus={{}} actions={actionsMock} 
        items={[{name: "Eggs", price: "$3.00"}]} />);
        tree.instance().addToCart=jest.fn();
        tree.find('#addToCartEggs').simulate('click');
        expect(tree.instance().addToCart).toBeCalled();
    });

    it("will test the logic within addToCart function for Eggs", () => {
        const tree = shallow(<ShoppingCart.WrappedComponent total={0} orderStatus={{}} actions={actionsMock} 
        items={[{name: "Eggs", price: "$3.00"}]} />);
        tree.instance().addToCart("Eggs");
        expect(actionsMock.addItemToCart).toBeCalled();
        expect(actionsMock.updateTotal).toBeCalled();
    });

     it("will test the logic within addToCart function for Milk", () => {
        const tree = shallow(<ShoppingCart.WrappedComponent total={0} orderStatus={{}} actions={actionsMock} 
        items={[{name: "Eggs", price: "$3.00"}]} />);
        tree.instance().addToCart("Milk");
        expect(tree.instance().props.actions.addItemToCart).toBeCalled();
        expect(tree.instance().props.actions.updateTotal).toBeCalled();
        expect(actionsMock.addItemToCart).toBeCalled();
        expect(actionsMock.updateTotal).toBeCalled();
    });

     it("will test the logic within displayCartItems function", () => {
        const tree = shallow(<ShoppingCart.WrappedComponent total={0} orderStatus={{}} actions={actionsMock} 
        items={[{name: "Eggs", price: "$3.00"}]} />);
        const result = tree.instance().displayCartItems();
        expect(result.props.children[0].props.children[0]).toMatch(/Eggs/);
    });

     it("will test the logic within clear function", () => {
        const tree = shallow(<ShoppingCart.WrappedComponent total={0} orderStatus={{}} actions={actionsMock} 
items={[{name: "Eggs", price: "$3.00"}]} />);
        expect(tree.state('clear')).toBe(false);
        const result = tree.instance().clear();
        expect(tree.state('clear')).toBe(true);
    });
});

describe("Tests for mapStateToProps", () => {

    it("will test the mapStateToProps function", () => {
        const stateInput = {items: {name: "Eggs", price: "$3.00"}, total:0, orderStatus:null};
        const propsOutput = mapStateToProps(stateInput);
        expect(propsOutput).toEqual(stateInput);
    });
});

describe("Tests for mapDispatchToProps", () => {

    it("will test the rendering of the component", () => {
        const props = mapDispatchToProps(jest.fn());
        props.actions.addItemToCart();
        props.actions.updateTotal();
        expect(actionsMock.addItemToCart).toBeCalled();
        expect(actionsMock.updateTotal).toBeCalled();
    });
});
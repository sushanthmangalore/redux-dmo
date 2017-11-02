jest.unmock('../reducers');
import * as reducers from '../reducers';

describe("Tests for all the functions in the reducers.js file", () => {

    it("will verify items function with action ADD_ITEMS", () => {
        const testState = [];
        const testAction = { type: "ADD_ITEMS", item: {name: "Eggs", price: "$3.00"}};
        const responseExpected = [{name: "Eggs", price: "$3.00"}];
        const responseActual = reducers.items(testState, testAction);
        expect(responseActual).toEqual(responseExpected);
    });

    it("will verify items function with action CLEAR_CART", () => {
        const testState = [{name: "Eggs", price: "$3.00"}];
        const testAction = { type: "CLEAR_CART" };
        const responseExpected = [];
        const responseActual = reducers.items(testState, testAction);
        expect(responseActual).toEqual(responseExpected);
    });

    it("will verify items function with unknown action", () => {
        const testState = [];
        const testAction = { type: "DUMMY" };
        const responseActual = reducers.items(testState, testAction);
        expect(responseActual).toEqual(testState);
    });
});
import { Selector } from 'testcafe';
fixture `Smoke test`
    .page `http://ec2-52-66-194-198.ap-south-1.compute.amazonaws.com:9080/`;
	//.page `http://localhost:9080/`;
test('Test order button label', async t => {
   await t.expect(Selector('#placeOrder').innerText).eql('Confirm Order', 'check element text', { timeout: 500 });
});

test('Test clear button label', async t => {
   await t.expect(Selector('#clearCart').innerText).eql('Clear Cart', 'check element text', { timeout: 500 });
});

test('Test click order button without adding to cart', async t => {
	await t
        .click(Selector('#placeOrder'))
        .expect(Selector('#orderStatus').innerText).eql('There must be at least one item in the cart.');
});
'use strict';

import { createStore, combineReducers } from 'redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; 


const items = (state = [] , action) => {
	switch(action.type){
		case 'ADD_ITEMS':
			return [...state,
				Object.assign({}, action.item)
			];
		case 'CLEAR_CART':
			return [];
		default:
			return state;
	}
};

const total = (state = 0 , action) => {
	switch(action.type){
		case 'UPDATE_TOTAL':
			return state + action.price;
		case 'CLEAR_TOTAL':
			return 0;
		default:
			return state;
	}
};

const rootReducer=combineReducers({
	items,
	total
});

const store=createStore( 
		rootReducer
);

const render = () => {
	let cartContents="<ul>";
	store.getState().items.forEach(elem => {
		cartContents+="<li>"+elem.name+"&nbsp;"+elem.price+"</li>";
	});
	cartContents+="</ul>";
	document.getElementById("cartContents").innerHTML=cartContents;
	document.getElementById("totalAmt").innerHTML="Total: "+store.getState().total;
	console.log(store.getState());
}

document.addEventListener('DOMContentLoaded', function () {
    
	document.body.innerHTML=getDOM();
							
	document.getElementById("addToCartEggs").addEventListener("click", () => {
		store.dispatch({type:"ADD_ITEMS", item:{name: "Eggs, 1/2 Dozen", price: "$3" }});
		store.dispatch({type:"UPDATE_TOTAL", price:3});
	});


	document.getElementById("addToCartMilk").addEventListener("click", () => {
		store.dispatch({type:"ADD_ITEMS", item:{name: "Milk, 1 Gallon", price: "$4" }});
		store.dispatch({type:"UPDATE_TOTAL", price:4});
	});	
	
	document.getElementById("clearCart").addEventListener("click", () => {
		store.dispatch({type:"CLEAR_CART"});
		store.dispatch({type:"CLEAR_TOTAL"});
	});

});

store.subscribe(render);


function getDOM(){
 return `<div class="col-12 col-md-9 pull-md-3">
								<table class="table">
								<thead>
									<tr>
										<th>Item</th>
										<th>Price</th>
										<th></th>
									<tr>
								</thead>
								<tbody>
									<tr>
										<td>Milk</td>
										<td>$4</td>
										<td><input id="addToCartMilk" type="button" class="btn btn-primary" value="Add to Cart" /></td>
									<tr>
									<tr>
										<td>Eggs</td>
										<td>$3</td>
										<td><input id="addToCartEggs" type="button" class="btn btn-primary" value="Add to Cart" /></td>
									<tr>
								</tbody>
							</table>
							<div class="panel panel-default">
								<div class="panel-heading">
									<h3 class="panel-title">Shopping Cart</h3>
								</div>
								<div id="cartContents" class="panel-body">
								</div>
								<div class="panel-footer">
									<h3 id="totalAmt"></h3>
									<a id="clearCart" href="#" class="btn btn-primary">Clear Cart</a>
								</div>
							</div>
							</div>`;
}


























import * as actions from './actions';
import {connect} from 'react-redux';
import React,{PropTypes} from 'react';
import { bindActionCreators } from 'redux';









class ShoppingCart extends React.Component{

	constructor(props){
		super(props);
		this.addToCart=this.addToCart.bind(this);
		this.clear=this.clear.bind(this);
		this.displayCartItems=this.displayCartItems.bind(this);
	}

	addToCart(itemName){
		if("Eggs"===itemName){
			this.props.actions.addItemToCart({name: "Eggs, 1/2 Dozen", price: "$3"});
			this.props.actions.updateTotal(3);
		}else if("Milk"===itemName){
			this.props.actions.addItemToCart({name: "Milk, 1 gallon", price: "$4"});
			this.props.actions.updateTotal(4);
		}
	}

	clear(){
		this.props.actions.clearCart();
		this.props.actions.clearTotal();
		this.props.actions.clearStatus();
	}

	displayCartItems(){
		let items=this.props.items.map(item => {
			return <li key={`item-${Math.random()}`}>{item.name}  {item.price} </li>;
		});
		return (<ul>{items}</ul>);
	}

	render(){
		return (
			<div className="col-12 col-md-9 pull-md-3">
								<table className="table">
								<thead>
									<tr>
										<th>Item</th>
										<th>Price</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Milk, 1 gallon</td>
										<td>$4</td>
										<td><input id="addToCartMilk" type="button" className="btn btn-primary" value="Add to Cart" onClick={() => this.addToCart('Milk')} /></td>
									</tr>
									<tr>
										<td>Eggs, 1/2 Dozen</td>
										<td>$3</td>
										<td><input id="addToCartEggs" type="button" className="btn btn-primary" value="Add to Cart" onClick={() => this.addToCart('Eggs')} /></td>
									</tr>
								</tbody>
							</table>
							<div className="panel panel-default">
								<div className="panel-heading">
									<h3 className="panel-title">Shopping Cart</h3>
								</div>
								<div id="cartContents" className="panel-body">
									{this.displayCartItems()}
								</div>
								<div className="panel-footer">
										<h3 id="totalAmt">Total: {this.props.total}</h3>
										{this.props.orderStatus && <p>{this.props.orderStatus.stsMsg}</p>}
										<a id="placeOrder" href="#" className="btn btn-primary" onClick={() => this.props.actions.placeOrder()}>Place Order</a>
										&nbsp;<a id="clearCart" href="#" className="btn btn-warning" onClick={() => this.clear()}>Clear Cart</a>
								</div>
							</div>
							</div>
		);
	}
}

ShoppingCart.propTypes = {
	actions: PropTypes.object,
	items: PropTypes.array,
	total: PropTypes.number,
	orderStatus: PropTypes.object
};





export function mapStateToProps(state){
	const {items, total, orderStatus} = state;
	return {items, total, orderStatus};
}





/* istanbul ignore else */
export function mapDispatchToProps(dispatch){
	return{
		actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingCart);

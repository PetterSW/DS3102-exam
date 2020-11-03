

export class ShoppingCart{
	static shoppingCartItems = [];
	static container = document.getElementById('checkout-container');
	static table = document.getElementById('cart-table');

	static getCart = () => JSON.parse(localStorage.getItem('shoppingCart')) || [];

	//Function to render shoppingcart at checkout
	static renderShoppingCart(){
		
		//Varible to store total qty and price
		let totalQty = 0;
		let totalPrice = 0;
		let productList = JSON.parse(localStorage.getItem('productList')) || [];

		//Finding product based on id in shoppingcart
		ShoppingCart.getCart().forEach( cartItem => {
			const product = productList.find( product => product.id == cartItem.id );
			totalQty += cartItem.qty;
			totalPrice += product.price * cartItem.qty;

			//Print table row into table body
			document.querySelector('#cart-table tbody').innerHTML += 
			`<tr>
				<td>${product.name}</td>
				<td>${cartItem.qty}</td>
				<td>${product.price * cartItem.qty}Kr</td>
			</tr>`;
		});

		//Printing total qty and total price in table foot
		document.querySelector('#cart-table tfoot').innerHTML = 
		`<tr>
			<td>Totalt</td>
			<td>${totalQty}</td>
			<td>${totalPrice}Kr</td>
		</tr>`;

	}

}




if(ShoppingCart.container){
	ShoppingCart.renderShoppingCart();
}


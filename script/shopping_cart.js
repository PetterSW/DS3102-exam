export class ShoppingCart{
	static shoppingCartItems = [];
	static container = document.getElementById('checkout-container');
	static table = document.getElementById('cart-table');

	static getCart = () => JSON.parse(localStorage.getItem('shoppingCartItems')) || [];

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
			/*document.querySelector('#cart-table tbody').innerHTML += 
			`<tr>
				<td>${product.name}</td>
				<td>${cartItem.qty}</td>
				<td>${product.price * cartItem.qty}Kr</td>
			</tr>`;*/

			let tableRow = document.createElement('tr');
			document.querySelector('#cart-table tbody').appendChild(tableRow);

			let tableData = document.createElement('td');
			tableData.textContent = product.name;
			tableRow.appendChild(tableData);

			let tableData1 = document.createElement('td');
			tableData1.textContent = cartItem.qty;
			tableRow.appendChild(tableData1);

			let tableData2 = document.createElement('td');
			tableData2.textContent = product.price * cartItem.qty + "Kr";
			tableRow.appendChild(tableData2);

			let tableData3 = document.createElement('td');
			tableRow.appendChild(tableData3);

			let removeBtn = document.createElement('button');
			removeBtn.textContent = "x";
			tableData3.appendChild(removeBtn);
			removeBtn.addEventListener('click', () => ShoppingCart.removeFromCart(cartItem.id));

		});

		//Printing total qty and total price in table foot
		document.querySelector('#cart-table tfoot').innerHTML = 
		`<tr>
			<td>Totalt</td>
			<td>${totalQty}</td>
			<td>${totalPrice}Kr</td>
		</tr>`;

	}
	
	static removeFromCart(id){
		let shoppingCartItems = ShoppingCart.getCart()
		shoppingCartItems.filter( cartItem =>  cartItem.id != id);
		window.localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
		ShoppingCart.renderShoppingCart();
	}

	static clearCart() {
		localStorage.removeItem('shoppingCartItems');
		ShoppingCart.renderShoppingCart();
	}

}

export function deliveryMethodChanged() {
	let method = document.querySelector('input[name="delivery-method"]:checked').value;
	if (method == "sushiToHome") {
		document.getElementById("input-address-container").style.visibility = "visible";
		document.getElementById("input-address").required = true;
	}
	if (method == "pickup") {
		document.getElementById("input-address-container").style.visibility = "hidden";
	}
}

export function placeOrder() {
	event.preventDefault();
	ShoppingCart.clearCart();
	document.getElementById("confirm-order-text").innerHTML = "Takk for din bestilling! Din ordre er klar om 15 minutter";
	event.target.reset;
}

if(ShoppingCart.container){
	ShoppingCart.renderShoppingCart();
	document.getElementById("delivery-method").addEventListener("click", deliveryMethodChanged);
	document.querySelector("[name='form-place-order']").addEventListener("submit", placeOrder); 
}
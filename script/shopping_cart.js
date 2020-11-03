export class ShoppingCart{
	static shoppingCartItems = [];
	static container = document.getElementById('checkout-container');
	static table = document.getElementById('cart-table');

	static getCart = () => JSON.parse(localStorage.getItem('shoppingCartItems')) || [];

	//Function to render shoppingcart at checkout
	static renderShoppingCart(){

		//Remove previusly rendered items
		document.querySelector('#cart-table tbody').innerHTML = "";
		document.querySelector('#cart-table tfoot').innerHTML = "";


		//Varible to store total qty and price
		let totalQty = 0;
		let totalPrice = 0;
		let productList = JSON.parse(localStorage.getItem('productList')) || [];
		//Finding product based on id in shoppingcart
		ShoppingCart.getCart().forEach( cartItem => {
			const product = productList.find( product => product.id == cartItem.id );
			totalQty += parseInt(cartItem.qty);
			totalPrice += parseInt(product.price) * parseInt(cartItem.qty);


			//Creating, appending and setting content for table body elements
			let tableRow = document.createElement('tr');
			document.querySelector('#cart-table tbody').appendChild(tableRow);

			let tableDataName = document.createElement('td');
			tableDataName.textContent = product.name;
			tableRow.appendChild(tableDataName);

			let tableDataQuantity = document.createElement('td');
			tableRow.appendChild(tableDataQuantity);

			//Input to change qty
			let qtyInput = document.createElement('input');
			qtyInput.setAttribute('type', 'number');
			qtyInput.setAttribute('class', 'cart-qty-input');
			qtyInput.value = cartItem.qty;
			tableDataQuantity.appendChild(qtyInput);
			qtyInput.addEventListener('change', () => ShoppingCart.changeQuantity(cartItem.id, qtyInput.value));
			

			let tableDataPrice = document.createElement('td');
			tableDataPrice.textContent = product.price * cartItem.qty + "Kr";
			tableRow.appendChild(tableDataPrice);

			let tableDataRemove = document.createElement('td');
			tableRow.appendChild(tableDataRemove);

			//Remove button for removeing items from cart
			let removeBtn = document.createElement('button');
			removeBtn.setAttribute('class', 'cart-remove-btn');
			removeBtn.textContent = "x";
			tableDataRemove.appendChild(removeBtn);
			removeBtn.addEventListener('click', () => ShoppingCart.removeFromCart(cartItem.id));

		});

		//Printing total qty and total price in table foot
		//Creating, appending and setting content for table footer elements
		let tableRow = document.createElement('tr');
			document.querySelector('#cart-table tfoot').appendChild(tableRow);

			let tableData = document.createElement('td');
			tableData.textContent = "Totalt";
			tableRow.appendChild(tableData);

			let tableData1 = document.createElement('td');
			tableData1.textContent = totalQty;
			tableRow.appendChild(tableData1);

			let tableData2 = document.createElement('td');
			tableData2.textContent = totalPrice + "Kr";
			tableRow.appendChild(tableData2);
	}


	//Removing item from cart
	static removeFromCart(itemId){
		let itemRemoved = ShoppingCart.getCart().filter( cartItem =>  cartItem.id != itemId);
		window.localStorage.setItem('shoppingCartItems', JSON.stringify(itemRemoved));
		ShoppingCart.renderShoppingCart();
	}

	//Changing quantity at checkout
	static changeQuantity(itemId, newQty){
		if(newQty == 0){ ShoppingCart.removeFromCart(itemId); }
		else{
			ShoppingCart.shoppingCartItems = ShoppingCart.getCart();
			ShoppingCart.shoppingCartItems.forEach( cartItem => cartItem.id === itemId ? cartItem.qty = newQty : cartItem.qty );
			window.localStorage.setItem('shoppingCartItems', JSON.stringify(ShoppingCart.shoppingCartItems));
			ShoppingCart.renderShoppingCart();
		}		
	}
	//Clearing shoppingcart localStorage
	static clearCart() {
		localStorage.removeItem('shoppingCartItems');
		ShoppingCart.renderShoppingCart();
	}

}

//View address input if the user want the sushi home
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
//Place the selected order
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
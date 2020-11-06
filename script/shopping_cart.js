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

			/*Table cell and p tag for product name*/
			let tableDataName = document.createElement('td');
			tableDataName.setAttribute('class', 'cart-table__name');
			tableRow.appendChild(tableDataName);

			let nameP = document.createElement('p');
			nameP.textContent = product.name;
			tableDataName.appendChild(nameP);


			/*Table cell, p tag, input and increas/decreas-icons for quantity*/
			let tableDataQuantity = document.createElement('td');
			tableDataQuantity.setAttribute('class', 'cart-table__qty');
			tableRow.appendChild(tableDataQuantity);

			//Button to increas quantity
			let plussIcon = document.createElement('i');
			plussIcon.setAttribute('class', 'fas fa-plus-circle');
			tableDataQuantity.appendChild(plussIcon);
			plussIcon.addEventListener('click', () => ShoppingCart.changeQuantity(cartItem.id, parseInt(qtyInput.value) + 1));

			//Input to change qty
			let qtyInput = document.createElement('input');
			qtyInput.setAttribute('type', 'number');
			qtyInput.setAttribute('max', 99);
			qtyInput.setAttribute('class', 'cart-qty-input');
			qtyInput.value = cartItem.qty;
			tableDataQuantity.appendChild(qtyInput);
			qtyInput.addEventListener('change', () => ShoppingCart.changeQuantity(cartItem.id, qtyInput.value));
			
			//Button to decreas quantity
			let minusIcon = document.createElement('i');
			minusIcon.setAttribute('class', 'fas fa-minus-circle');
			tableDataQuantity.appendChild(minusIcon);
			minusIcon.addEventListener('click', () => ShoppingCart.changeQuantity(cartItem.id, parseInt(qtyInput.value) - 1));


			/*Table cell, p tag and remove icon for product price*/
			let tableDataPrice = document.createElement('td');
			tableDataPrice.setAttribute('class', 'cart-table__price');
			tableRow.appendChild(tableDataPrice);

			let priceP = document.createElement('p');
			priceP.textContent = product.price * cartItem.qty + "Kr";
			tableDataPrice.appendChild(priceP);

			//Remove button for removeing items from cart
			let removeBtn = document.createElement('i');
			removeBtn.setAttribute('class', 'fas fa-times cart-remove-btn');
			tableDataPrice.appendChild(removeBtn);
			removeBtn.addEventListener('click', () => ShoppingCart.removeFromCart(cartItem.id));

		});

		//Printing total qty and total price in table foot
		//Creating, appending and setting content for table footer elements
		let tableRow = document.createElement('tr');
			document.querySelector('#cart-table tfoot').appendChild(tableRow);

			let tableDataTotal = document.createElement('td');
			tableDataTotal.setAttribute('class', 'cart-table__tfoot__name');
			tableRow.appendChild(tableDataTotal);

			let totalB = document.createElement('strong');
			totalB.textContent = "Totalt";
			tableDataTotal.appendChild(totalB);

			let tableDataQuantity = document.createElement('td');
			tableDataQuantity.setAttribute('class', 'cart-table__tfoot__qty');
			tableRow.appendChild(tableDataQuantity);

			let quantityB = document.createElement('strong');
			quantityB.textContent = totalQty;
			tableDataQuantity.appendChild(quantityB);

			let tableDataPrice = document.createElement('td');
			tableDataPrice.setAttribute('class', 'cart-table__tfoot__price');
			tableRow.appendChild(tableDataPrice);

			let priceP = document.createElement('strong');
			priceP.textContent = totalPrice + "Kr";
			tableDataPrice.appendChild(priceP);

			//Render navbar quantity
			ShoppingCart.setMenuBarQty();
	}

	static setMenuBarQty() {
		let qty = 0;
		let productList = JSON.parse(localStorage.getItem('productList')) || [];
		ShoppingCart.getCart().forEach( cartItem => {
			const product = productList.find( product => product.id == cartItem.id );
			qty += parseInt(cartItem.qty);
		})
		document.getElementById("menubar-shoppingcart-qty").innerHTML = qty;
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
		else if(newQty < 100){
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
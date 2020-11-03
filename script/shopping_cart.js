

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
			totalQty += cartItem.qty;
			totalPrice += product.price * cartItem.qty;


			//Creating, appending and setting content for table body elements
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

			//Remove button for removeing items from cart
			let removeBtn = document.createElement('button');
			removeBtn.textContent = "x";
			tableData3.appendChild(removeBtn);
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

}




if(ShoppingCart.container){
	ShoppingCart.renderShoppingCart();
}


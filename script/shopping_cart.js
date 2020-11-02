

export class ShoppingCart{
	static shoppingCartItems = [];
	static getCart = () => JSON.parse(localStorage.getItem('shoppingCart')) || [];

	static renderShoppingCart(){
		let products = JSON.parse(localStorage.getItem('productList')) || [];

	}

}


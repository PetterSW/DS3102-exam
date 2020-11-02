//Product class
//Product varibles: name, img source, description og id
export class Product{
	constructor(name, img, description, price){
		this.name = name;
		this.img = img;
		this.description = description;
		this.price = price + "Kr";
		this.id = Product.getProductList().length;
		this.addProduct();
	}

	//Declaring array for objects and function to get objects from localstorage
	static productContainer = document.getElementById('product-container');
	static productList = [];
	static getProductList = () => JSON.parse(localStorage.getItem('productList')) || [];

	//Function for storing object array in localstorage
	addProduct(){
		Product.productList = Product.getProductList();
		Product.productList.push(this);
		window.localStorage.setItem('productList', JSON.stringify(Product.productList));
	}

	//Render product using product web component
	static renderProducts() {
		let productHTML = "";
		Product.getProductList().forEach( product => {
			productHTML += 
			`<product-list-item
			name="${product.name}"
			data-product-id="${product.id}"
			img="${product.img}"
			description="${product.description}"
			price="${product.price}"
			></product-list-item>`
		});
		Product.productContainer.innerHTML = productHTML;
	}

}




//HTML syntax for produkt element:

	/*<product-list-item
	name=""
	data-product-id=""
	img="../images/food/<filnavn>"
	description=""
	price=""
	></product-list-item>*/

//Custom web-component for product list element
export class ProductListElement extends HTMLElement{
	constructor(){
		super();

		//creating elements and setting attribute, content and parent element
		let product = document.createElement('article');
		product.setAttribute('class', 'product');
		this.appendChild(product);

		let name = document.createElement('h3');
		name.setAttribute('class', 'product-name');
		name.textContent = this.getAttribute('name');
		product.appendChild(name);

		let img = document.createElement('img');
		img.setAttribute('alt', 'Product image.');
		img.setAttribute('class', 'product-image');
		img.setAttribute('src', this.getAttribute('img'));
		product.appendChild(img);

		let description = document.createElement('p');
		description.setAttribute('class', 'product-description');
		description.textContent = this.getAttribute('description');
		product.appendChild(description);

		let price = document.createElement('b');
		price.setAttribute('class', 'product-price');
		price.textContent = this.getAttribute('price');
		product.appendChild(price);

		let addToCartBtn = document.createElement('button');
		addToCartBtn.setAttribute('type', 'button');
		addToCartBtn.setAttribute('class', 'add-to-cart-btn');
		addToCartBtn.textContent = "Legg til handlekurven!";
		product.appendChild(addToCartBtn);

		//Eventlisentner on button
		addToCartBtn.addEventListener('click', () => this.addToCart(this.getAttribute('data-product-id')));
	}

	//Adding product to cart
	addToCart(productId){
		var shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

		//Adding or increas qty in local storage
		if(AlreadyInCart(productId) === false){
			let cartItem = {id: productId, qty: 1};
			shoppingCart.push(cartItem);
		}else{
			shoppingCart[AlreadyInCart(productId)].qty += 1;
		}

		window.localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));

		//Returns false if item dont exist in array or index if item exists
		function AlreadyInCart(productId){
			let index = false;
			for(var i = 0; shoppingCart.length > i; i++){
				if(shoppingCart[i].id === productId){ index = i;}
			}
			return index;
		}
	}
}

window.customElements.define("product-list-item", ProductListElement);


//Adding event lisentner only if element is loaded
if(Product.productContainer){
	window.localStorage.setItem('productList', JSON.stringify([]));
	new Product("Flyfish sushi", "../images/food/flyfish-sushi.jpg", "Denne fisken kan fly!", "149");
	new Product("Dry Fish", "../images/food/dry-fish.jpg", "Tørr fisk!", "149");
	new Product("Salmon maki", "../images/food/Salmon-maki.jpg", "Laks!", "149");
	new Product("Stor sushi", "../images/food/Sushi-Big.jpg", "Stor sushi!", "149");
	new Product("Sushi plate", "../images/food/Sushi-Plate.jpg", "Sushi tallerken", "149");
	new Product("Tempura plate", "../images/food/Tempura-Plate.jpg", "Tempura tallerken", "149");
	new Product("Tempura prawnn", "../images/food/Tempura-Prawn.jpg", "Tempura Prawn", "149");
	new Product("Sushi Wrap", "../images/food/wrap.jpg", "Sushi i wrap", "149");
	Product.productContainer.addEventListener('load', Product.renderProducts() );
}
	


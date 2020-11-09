import { ShoppingCart } from '../script/shopping_cart.js';
//Product class
//Product varibles: name, img source, description og id
export class Product{
	constructor(name, img, description, price){
		this.name = name;
		this.img = img;
		this.description = description;
		this.price = price;
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
			name="${product.name} "
			data-product-id="${product.id}"
			img="${product.img}"
			description="${product.description}"
			price="${product.price},-"
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
		img.setAttribute('draggable', 'true');
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
		addToCartBtn.textContent = "KJØP";
		product.appendChild(addToCartBtn);

		//Eventlisentner on button
		addToCartBtn.addEventListener('click', () => ProductListElement.addToCart(this.getAttribute('data-product-id')));
		//Drag and drop; Dragstart
		img.addEventListener('dragstart', () => {
			ProductListElement.drag(event, this.getAttribute('data-product-id') );
		} );
	}
	//From https://www.w3schools.com/html/html5_draganddrop.asp

	//Drag and drop products
	static allowDrop(ev) {
		ev.preventDefault();
  	}
  
	static drag(ev, productId) {
		ev.dataTransfer.setData("text/plain", productId);
	}
  
	static drop(ev) {
		ev.preventDefault();
		let productId = ev.dataTransfer.getData("text/plain");
		ProductListElement.addToCart(productId);
	}

	//Adding product to cart
	static addToCart(productId){
		var shoppingCartItems = JSON.parse(localStorage.getItem('shoppingCartItems')) || [];

		//Adding or increas qty in local storage
		if(AlreadyInCart(productId) === false){
			let cartItem = {id: productId, qty: 1};
			shoppingCartItems.push(cartItem);
		}else{
			shoppingCartItems[AlreadyInCart(productId)].qty += 1;
		}
		
		window.localStorage.setItem('shoppingCartItems', JSON.stringify(shoppingCartItems));

		//Returns false if item dont exist in array or index if item exists
		function AlreadyInCart(productId){
			let index = false;
			for(var i = 0; shoppingCartItems.length > i; i++){
				if(shoppingCartItems[i].id === productId){ index = i;}
			}
			return index;
		}

		//Display and insert product name and image in feedback box
		let product = Product.getProductList().find( product => product.id == productId );
		document.getElementById('cart-feedback__name').innerHTML = product.name;

		document.getElementById('cart-feedback__img-wrap').innerHTML = "";
		let img = document.createElement('img');
		img.setAttribute('alt', 'Ordered product.');
		img.setAttribute('class', 'cart-feedback__img');
		img.setAttribute('src', product.img);
		document.getElementById('cart-feedback__img-wrap').appendChild(img);

		document.getElementById('cart-feedback').style.display = "block";


		ShoppingCart.setMenuBarQty();
	}
}

window.customElements.define("product-list-item", ProductListElement);


	


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
			name="${product.name}"
			data-product-id="${product.id}"
			img="${product.img}"
			description="${product.description}"
			price="${product.price}Kr"
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

		//Display and insert product name in feedback box
		let product = Product.getProductList().find( product => product.id == productId );
		document.getElementById('cart-feedback__text').innerHTML = `${product.name} <br> Lagt til i handlekurven`;
		document.getElementById('cart-feedback').style.display = "block";


		ShoppingCart.setMenuBarQty();
	}
}

window.customElements.define("product-list-item", ProductListElement);


//Adding event lisentner only if element is loaded
if(Product.productContainer){

	//Close feedback window
	document.getElementById('cart-feedback__exit').addEventListener('click', () => 
		document.getElementById('cart-feedback').style.display = "none" );

	document.getElementById('cart-feedback__continue__btn').addEventListener('click', () => 
		document.getElementById('cart-feedback').style.display = "none" );

	//Creating products
	window.localStorage.setItem('productList', JSON.stringify([]));
	new Product("Liten Tallerken", "../images/food/Liten-tallerken.jpg", "Perfekt som en porsjon.", "89");
	new Product("Stor Tallerken", "../images/food/Stor-tallerken.jpg", "Ekstra sulten eller på deling?", "149");
	new Product("Lakse-Maki", "../images/food/Maki-salmon.jpg", "Vår klassiske Maki med laks.", "109");
	new Product("Vegetar-Maki", "../images/food/Maki-vegetar.jpg", "Kutte ned på kjøttinntak? Vegetar-Maki!", "99");
	new Product("Tempura-Reker", "../images/food/Tempura-Reke.jpg", "Store, friterte reker.", "149");
	new Product("Sushi-Skål", "../images/food/Sushi-bowl.jpg", "Vår anerkjente Sushi-skål.", "119");
	new Product("Sushi-Burrito", "../images/food/Sushi-Wrap.jpg", "Prøve noe nytt? Sushi i burrito-form!", "99");
	new Product("Sushi for eventer", "../images/food/Event-tallerken.jpg", "Utrolig stor tallerken, perfekt for eventer!", "999");
	Product.productContainer.addEventListener('load', Product.renderProducts() );
}
	


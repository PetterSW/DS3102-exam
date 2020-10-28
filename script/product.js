
//Product class
//Product varibles: name, img source, description og id
export class Product{
	constructor(name, img, description){
		this.name = name;
		this.img = img;
		this.description = description;
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
			img="${product.img}"
			description="${product.description}"
			></product-list-item>`
		});
		Product.productContainer.innerHTML = productHTML;
	}

}




//HTML syntax for produkt element:

	/*<product-list-item
	name=""
	img="../images/food/<filnavn>"
	description=""
	></product-list-item>*/

//Custom web-component for product list element
export class ProductListElement extends HTMLElement{
	constructor(){
		super();

		//creating elements and setting attribute, content and parent element
		let name = document.createElement('h3');
		name.setAttribute('class', 'product-name');
		name.textContent = this.getAttribute('name');
		this.appendChild(name);

		let img = document.createElement('img');
		img.setAttribute('alt', 'Product image.');
		img.setAttribute('class', 'product-image');
		img.setAttribute('src', this.getAttribute('img'));
		this.appendChild(img);

		let description = document.createElement('p');
		description.setAttribute('class', 'product-description');
		description.textContent = this.getAttribute('description');
		this.appendChild(description);

		let addToCartBtn = document.createElement('button');
		addToCartBtn.setAttribute('type', 'button');
		addToCartBtn.setAttribute('class', 'add-to-cart-btn');
		addToCartBtn.textContent = "Legg til handlekurven!";
		this.appendChild(addToCartBtn);
	}
}

window.customElements.define("product-list-item", ProductListElement);


//Adding event lisentner only if element is loaded
if(Product.productContainer){
	window.localStorage.setItem('productList', JSON.stringify([]));
	new Product("Flyfish sushi", "../images/food/flyfish-sushi.jpg", "Denne fisken kan fly!");
	new Product("Dry Fish", "../images/food/dry-fish.jpg", "Tørr fisk!");
	new Product("Salmon maki", "../images/food/Salmon-maki.jpg", "Laks!");
	new Product("Stor sushi", "../images/food/Sushi-Big.jpg", "Stor sushi!");
	new Product("Sushi plate", "../images/food/Sushi-Plate.jpg", "Sushi tallerken");
	new Product("Tempura plate", "../images/food/Tempura-Plate.jpg", "Tempura tallerken");
	new Product("Tempura prawnn", "../images/food/Tempura-Prawn.jpg", "Tempura Prawn");
	Product.productContainer.addEventListener('load', Product.renderProducts() );
}
	


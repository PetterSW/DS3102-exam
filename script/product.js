

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
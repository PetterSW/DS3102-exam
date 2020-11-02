export class UUElement extends HTMLElement{
	constructor(){
		super();

		//creating elements and setting attribute, content and parent element
		let section = document.createElement('section');
		product.setAttribute('class', 'unieversell-utforming-container');
		this.appendChild(section);

		let name = document.createElement('h3');
		name.setAttribute('class', 'uu-title');
		name.textContent = this.getAttribute('name');
		product.appendChild(section);

		let description = document.createElement('p');
		description.setAttribute('class', 'uu-description');
		description.textContent = this.getAttribute('description');
		product.appendChild(section);
	}
}

window.customElements.define("uu-section", ProductListElement);
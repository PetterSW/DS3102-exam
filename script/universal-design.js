export class UUElement extends HTMLElement {
	constructor(){
		super();
        //this.appendChild( template.content.cloneNode(true) );
		//creating elements and setting attribute, content and parent element
		let article = document.createElement('article');
		article.setAttribute('class', 'universal-design-article');
		this.appendChild(article);

		let name = document.createElement('h3');
		name.setAttribute('class', 'uu-title');
		name.textContent = this.getAttribute('name');
		article.appendChild(name);

		let description = document.createElement('p');
		description.setAttribute('class', 'uu-description');
		description.textContent = this.getAttribute('description');
        article.appendChild(description);
        
    }
}

window.customElements.define("universal-design", UUElement);
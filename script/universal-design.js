export class UUElement extends HTMLElement {
    static order = 0;

	constructor(){
        super();
		//creating elements and setting attribute, content and parent element
		let article = document.createElement('article');
        article.setAttribute('class', 'universal-design-article');
        article.setAttribute('id', UUElement.order)
        article.setAttribute('draggable', 'true');
		this.appendChild(article);

		let name = document.createElement('h3');
		name.setAttribute('class', 'uu-title');
		name.textContent = this.getAttribute('name');
		article.appendChild(name);

		let description = document.createElement('p');
		description.setAttribute('class', 'uu-description');
		description.textContent = this.getAttribute('description');
        article.appendChild(description);
        //Drag and drop eventlisteners
        article.addEventListener('dragstart', () => {
            UUElement.drag(event, this.firstChild.id);
        } );
        
        article.addEventListener('drop', () => {
			UUElement.drop(event, this.firstChild.id);
        } );

        article.addEventListener('dragover', () => {
			UUElement.allowDrop(event);
        } );
        //
        UUElement.order++;
        
        
    }
    //Drag and drop elements

    static dragged;
    static draggedID;

	static allowDrop(ev) {
		ev.preventDefault();
  	}
  
	static drag(ev, dragID) {
        UUElement.dragged = document.getElementById(dragID).outerHTML;
        UUElement.draggedID = dragID;
        console.log(document.getElementById(dragID).outerHTML);
	}
  
	static drop(ev, dropID) {
        
        
        /*let dropHTML = document.getElementById(dropID).outerHTML;
        console.log(dropHTML);
        document.getElementById(dropID).outerHTML = UUElement.dragged;
        document.getElementById(UUElement.draggedID).outerHTML = dropHTML;

        */
    }
    
}

window.customElements.define("universal-design", UUElement);


//Selects all 7 information boxes
let UUArtikkel = document.querySelectorAll(".universal-design-article");

//For-loop that applies event-listener that triggers an anime.js animation on entering and leaving the boxes
for(let i = 0; i < UUArtikkel.length; i++) {
    UUArtikkel[i].addEventListener('mouseenter', () => {
        animateButton(1.1, 1200, 800, i);
    });
    UUArtikkel[i].addEventListener('mouseleave', () => {
        animateButton(1, 300, 300, i);
    });
}

//Function that declares what the for-loop values applies to
function animateButton(scale, duration, elasticity, index) {
    anime.remove(UUArtikkel[index]);
    anime({
        targets: UUArtikkel[index],
        scale: scale,
        duration: duration,
        elasticity: elasticity
    });
}
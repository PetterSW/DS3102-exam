export class UUElement extends HTMLElement {
    static articleID = 0;
	constructor(){
		super();
		//creating elements and setting attribute, content and parent element
		let article = document.createElement('article');
        article.setAttribute('class', 'universal-design-article');
        this.setAttribute('draggable', 'true');
        article.setAttribute('id', UUElement.articleID)
		this.appendChild(article);

		let name = document.createElement('h3');
        name.setAttribute('class', 'uu-title');
        name.setAttribute('draggable', 'false');
		name.textContent = this.getAttribute('name');
		article.appendChild(name);

		let description = document.createElement('p');
		description.setAttribute('class', 'uu-description');
		description.textContent = this.getAttribute('description');
        article.appendChild(description);

        this.addEventListener('dragstart', () => {
            UUElement.drag(event, this.getAttribute("id"));
        } );
        
        this.addEventListener('drop', () => {
            UUElement.drop(event, this.querySelector("article").id);
        } );
    
        this.addEventListener('dragover', () => {
            UUElement.allowDrop(event);
        } );
        UUElement.articleID++;
        
    }

    static draggedID;

    static allowDrop(ev) {
		ev.preventDefault();
      }
      
    static drag(ev, id) {
        console.log(id);
        UUElement.draggedID = id;
    }
    static drop(ev, id) {
        UUElement.dragAndDrop(UUElement.draggedID, id);
    }

    static dragAndDrop(draggedID, dropID) {
        let UUList = UUArticle.getUUArticles();
        let draggedItem = UUList[draggedID];
        let droppedItem = UUList[dropID];
        UUList.splice(dropID, 1, draggedItem);
        UUList.splice(draggedID, 1, droppedItem);
        window.localStorage.setItem('UUArticles', JSON.stringify(UUList));
        UUArticle.renderArticles();
    }
    

}

window.customElements.define("universal-design", UUElement);

export class UUArticle {
    static getUUArticles = () => JSON.parse(localStorage.getItem('UUArticles')) || [];
    static UUList;

    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.addArticle();
    }

    addArticle() {
        UUArticle.UUList = UUArticle.getUUArticles();
		UUArticle.UUList.push(this);
		window.localStorage.setItem('UUArticles', JSON.stringify(UUArticle.UUList));
    }

    static renderArticles() {
        let articleHTML = "";
        UUElement.articleID = 0;

        UUArticle.getUUArticles().forEach( article => {
            articleHTML += `<universal-design 
            name="${article.title}"
            description="${article.description}">
            </universal-design>`
            
        });
        document.getElementById("universal-styling-container").innerHTML = articleHTML;
    }


}
UUArticle.renderArticles();

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
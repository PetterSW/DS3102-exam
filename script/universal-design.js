export class UUElement extends HTMLElement {
	constructor(){
		super();
		//creating elements and setting attribute, content and parent element
		let article = document.createElement('article');
        article.setAttribute('class', 'universal-design-article');
        this.setAttribute('draggable', 'true');
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
            UUElement.drag(event, parseInt(this.getAttribute("data-sort-index")));
        } );
        
        this.addEventListener('drop', () => {
            UUElement.drop(event, parseInt(this.getAttribute("data-sort-index")));
        } );
    
        this.addEventListener('dragover', () => {
            UUElement.allowDrop(event);
        } );
        
    }

    static draggedIndex;
    static droppedIndex;

    static allowDrop(ev) {
		ev.preventDefault();
      }
      
    static drag(ev, draggedIndex) {
        UUElement.draggedIndex = draggedIndex;
    }
    static drop(ev, dropIndex) {
        UUElement.droppedIndex = dropIndex;
        UUElement.dragAndDrop();
    }
    static dragAndDrop() {
        var UUList = UUArticle.getUUArticles();

        //Find the index of the dragged and dropped item
        let dragIndex = UUElement.draggedIndex;
        let dropIndex = UUElement.droppedIndex;

        //Tempoery store items
        let dragItem = UUList[dragIndex];
        let dropItem = UUList[dropIndex];
        
        //Switch positions of arrays in UUList
        
        if(dragIndex > dropIndex) {
            UUList.splice(dropIndex, 0, dragItem);
            UUList.splice(dragIndex+1, 1);
            console.table(UUList);
        }
        
        else {
            UUList.splice(dropIndex, 0, dragItem);
            UUList.splice(dropIndex, 0, dropItem);
            UUList.splice(dragIndex, 1);
            UUList.splice(dropIndex+1, 1);
            console.table(UUList);
        }
        
        window.localStorage.setItem('UUArticles', JSON.stringify(UUList));
        UUArticle.renderArticles();
        
    }

}

window.customElements.define("universal-design", UUElement);

export class UUArticle {
    static getUUArticles = () => JSON.parse(localStorage.getItem('UUArticles')) || [];
    static UUList;

    constructor(title, description, sortIndex) {
        this.title = title;
        this.description = description;
        this.sortIndex = sortIndex;
        this.addArticle();
    }

    addArticle() {
        UUArticle.UUList = UUArticle.getUUArticles();
		UUArticle.UUList.push(this);
		window.localStorage.setItem('UUArticles', JSON.stringify(UUArticle.UUList));
    }

    static renderArticles() {
        let articleHTML = "";
        let UUList = UUArticle.getUUArticles();
        //UUList.sort((a,b) => a.sortIndex - b.sortIndex);

        UUList.forEach( article => {
            articleHTML += `<universal-design 
            name="${article.title}"
            description="${article.description}"
            data-sort-index="${UUList.findIndex(a => a.title === article.title)}">
            </universal-design>`
            
        });
        document.getElementById("universal-styling-container").innerHTML = articleHTML;
    }

}

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
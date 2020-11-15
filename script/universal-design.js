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

        //Eventlisteners for drag and drop

        this.addEventListener('dragstart', () => {
            UUElement.drag(event, parseInt(this.getAttribute("data-sort-index")));
        } );
        
        this.addEventListener('drop', () => {
            UUElement.drop(event, parseInt(this.getAttribute("data-sort-index")));
        } );
    
        this.addEventListener('dragover', () => {
            UUElement.allowDrop(event);
        } );

        this.addEventListener('mouseenter', () => {
            console.log("YES!");
            UUElement.animateElement(1.1, 1200, 800, parseInt(this.getAttribute("data-sort-index")));
        } );
        this.addEventListener('mouseleave', () => {
            UUElement.animateElement(1, 300, 300, parseInt(this.getAttribute("data-sort-index")));
        } );
        
    }
    //Drag and drop
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
    static animateElement(scale, duration, elasticity, index) {
        let UUArticles = document.querySelectorAll(".universal-design-article");
        anime.remove(UUArticles[index]);
        anime({
            targets: UUArticles[index],
            scale: scale,
            duration: duration,
            elasticity: elasticity
        });
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
/*
//Selects all 7 information boxes
let UUArticles = document.querySelectorAll(".universal-styling-container");
console.log(UUArticles);

//For-loop that applies event-listener that triggers an anime.js animation on entering and leaving the boxes
for(let i = 0; i < UUArticles.length; i++) {
    UUArticles[i].addEventListener('mouseenter', () => {
        animateButton(1.1, 1200, 800, i);
    });
    UUArticles[i].addEventListener('mouseleave', () => {
        animateButton(1, 300, 300, i);
    });
}
/*

//Function that declares what the for-loop values applies to
function animateButton(scale, duration, elasticity, index) {
    anime.remove(UUArticles[index]);
    anime({
        targets: UUArticles[index],
        scale: scale,
        duration: duration,
        elasticity: elasticity
    });
}*/
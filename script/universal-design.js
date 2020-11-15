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

    }

}
window.customElements.define('universal-design', UUElement);

//customElements.get('the-element') || customElements.define('the-element', HTMLTheElement);

export class UUArticle {
    static getWCAGArticles = () => JSON.parse(localStorage.getItem('UUWCAG')) || [];
    static getUUArticles = () => JSON.parse(localStorage.getItem('UUArticles')) || [];
    static UUList;
    static WCAGList;

    constructor(title, description, sortIndex, type) {
        this.title = title;
        this.description = description;
        this.sortIndex = sortIndex;
        this.type = type;
        this.addArticle();
    }

    addArticle() {
        console.log("Add");
        if(this.type === "UU") {
            UUArticle.UUList = UUArticle.getUUArticles();
		    UUArticle.UUList.push(this);
		    window.localStorage.setItem('UUArticles', JSON.stringify(UUArticle.UUList));
        }
        else if (this.type === "WCAG") {
            UUArticle.WCAGList = UUArticle.getWCAGArticles();
            UUArticle.WCAGList.push(this);
            window.localStorage.setItem('UUWCAG', JSON.stringify(UUArticle.WCAGList));
        }
    }

    static renderArticles() {
        let UUhtml = "";
        let WCAGhtml = ""
        let UUList = UUArticle.getUUArticles();
        let WCAGList = UUArticle.getWCAGArticles();

        UUList.forEach( article => {
            UUhtml += `<universal-design 
            name="${article.title}"
            description="${article.description}"
            data-sort-index="${UUList.findIndex(a => a.title === article.title)}"
            data-type="UU">
            </universal-design>`
            
        });
        WCAGList.forEach( article => {
            WCAGhtml += `<universal-design
            name="${article.title}"
            description="${article.description}"
            data-sort-index="${WCAGList.findIndex(a => a.title === article.title)}"
            data-type="WCAG">
            </universal-design>`
            
        });
        document.getElementById("wcag-styling-container").innerHTML = WCAGhtml;
        document.getElementById("universal-styling-container").innerHTML = UUhtml;
    }
}
/*
export class WCAGArticle {
    static getWCAGArticles = () => JSON.parse(localStorage.getItem('UUWCAG')) || [];
    static list;

    constructor(title, description, sortIndex) {
        this.title = title;
        this.description = description;
        this.sortIndex = sortIndex;
        this.addArticle();
    }

    addArticle() {
        WCAGArticle.list = WCAGArticle.getWCAGArticles();
		WCAGArticle.list.push(this);
		window.localStorage.setItem('UUWCAG', JSON.stringify(WCAGArticle.list));
    }

    static renderArticles() {
        let articleHTML = "";
        let list = WCAGArticle.getWCAGArticles();

        list.forEach( article => {
            articleHTML += `<universal-design 
            name="${article.title}"
            description="${article.description}"
            data-sort-index="${list.findIndex(a => a.title === article.title)}">
            </universal-design>`
            
        });
        document.getElementById("wcag-styling-container").innerHTML = articleHTML;
    }
}*/
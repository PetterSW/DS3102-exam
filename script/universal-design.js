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
            UUElement.drag(event, parseInt(this.getAttribute("data-sort-index")), this.getAttribute('data-article-type'));
        } );
        
        this.addEventListener('drop', () => {
            UUElement.drop(event, parseInt(this.getAttribute("data-sort-index")), this.getAttribute('data-article-type'));
        } );
    
        this.addEventListener('dragover', () => {
            UUElement.allowDrop(event);
        } );

        //Calls animation on articles

        this.addEventListener('mouseenter', () => {
            UUElement.animateElement(1.1, 1200, 800, parseInt(this.getAttribute("data-sort-index")), this.getAttribute('data-article-type'));
        } );
        this.addEventListener('mouseleave', () => {
            UUElement.animateElement(1, 300, 300, parseInt(this.getAttribute("data-sort-index")), this.getAttribute('data-article-type'));
        } );
        
    }
    //Drag and drop
    static draggedIndex;
    static droppedIndex;
    static articleType;

    static allowDrop(ev) {
		ev.preventDefault();
      }
      
    static drag(ev, draggedIndex, articleType) {
        UUElement.articleType = articleType;
        UUElement.draggedIndex = draggedIndex;
    }
    static drop(ev, dropIndex, articleType) {
        UUElement.droppedIndex = dropIndex;
        if (UUElement.articleType === articleType) {
            UUElement.dragAndDrop(articleType);
        }
    }

    //Scale animation on UUElements
    static animateElement(scale, duration, elasticity, index, articleType) {
        let UUArticles = document.querySelectorAll(".universal-design-article");
        //Addition to index if the user has the pointer on WCAG facts
        if(articleType === "UUWCAG") {
            index+=7;
        }
        anime.remove(UUArticles[index]);
        anime({
            targets: UUArticles[index],
            scale: scale,
            duration: duration,
            elasticity: elasticity
        });
    }

    static dragAndDrop(articleType) {
        var UUList;
        //Retrieving correct localstorage object
        if(articleType === "UUArticles") {
            UUList = UUArticle.getUUArticles();
        }
        else if (articleType === "UUWCAG") {
            UUList = UUArticle.getWCAGArticles();
        }

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
        }
        
        else {
            UUList.splice(dropIndex, 0, dragItem);
            UUList.splice(dropIndex, 0, dropItem);
            UUList.splice(dragIndex, 1);
            UUList.splice(dropIndex+1, 1);
    }
      
    window.localStorage.setItem(articleType, JSON.stringify(UUList));
    UUArticle.renderArticles();

    }

}
window.customElements.define('universal-design', UUElement);

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
        //Adds UUArticles to correct LocalStorage
        if(this.type === "UUArticles") {
            UUArticle.UUList = UUArticle.getUUArticles();
		    UUArticle.UUList.push(this);
		    window.localStorage.setItem('UUArticles', JSON.stringify(UUArticle.UUList));
        }
        else if (this.type === "UUWCAG") {
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

        //Render UU articles
        UUList.forEach( article => {
            UUhtml += `<universal-design 
            name="${article.title}"
            description="${article.description}"
            data-sort-index="${UUList.findIndex(a => a.title === article.title)}"
            data-article-type="${article.type}">
            </universal-design>`
            
        });

        //Render WCAG articles
        WCAGList.forEach( article => {
            WCAGhtml += `<universal-design
            name="${article.title}"
            description="${article.description}"
            data-sort-index="${WCAGList.findIndex(a => a.title === article.title)}"
            data-article-type="${article.type}">
            </universal-design>`
            
        });
        document.getElementById("wcag-styling-container").innerHTML = WCAGhtml;
        document.getElementById("universal-styling-container").innerHTML = UUhtml;
    }
}
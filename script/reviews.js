export default class Review extends HTMLElement {
    constructor() {
        super();
        
        let name = document.createElement('h3');
        name.textContent = this.getAttribute("name");
        name.setAttribute('class', 'reviewName');
        this.appendChild(name);

        let text = document.createElement('p');
        text.textContent = this.getAttribute("text");
        text.setAttribute('class', 'ReviewText');
        this.appendChild(text);

        let date = document.createElement('p');
        date.textContent = this.getAttribute("date");
        date.setAttribute('class', 'reviewDate');
        this.appendChild(date);
    }
}

window.customElements.define("resturante-review", Review);

let getReviews = () => JSON.parse(localStorage.getItem('reviews')) || [];

document.querySelector('[name="review-form"').addEventListener("submit", () => {
    let reviewList = getReviews();

    let name = document.querySelector('[name="review-name"]').value;
    let reviewDescription = document.querySelector('[name="review-text"]').value;
    
    let date = new Date();
    let today = `Dato: ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

    const newReview = [name, reviewDescription, today];
    reviewList.push(newReview);
    window.localStorage.setItem('reviews', JSON.stringify(reviewList));
    event.target.reset();
});
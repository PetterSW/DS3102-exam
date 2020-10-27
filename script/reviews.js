export class ReviewElement extends HTMLElement {
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

window.customElements.define("resturante-review", ReviewElement);

let getReviews = () => JSON.parse(localStorage.getItem('reviews')) || [];

export class Review {
    static reviewList = [];
    constructor(name, reviewText, reviewDate) {
        this.name = name;
        this.reviewText = reviewText;
        this.reviewDate = reviewDate;

        this.addReview();
    }

    addReview() {
        Review.reviewList = getReviews();
        Review.reviewList.push(this);
        window.localStorage.setItem('reviews', JSON.stringify(Review.reviewList));
        Review.renderReviews();
    }

    static renderReviews() {
        let reviewHTML = "";
        getReviews().forEach(review => {
            reviewHTML += `
            <resturante-review
                name="${review.name}"
                text="${review.reviewText}"
                date="${review.reviewDate}">
            </resturante-review>`;
        });
        document.querySelector('[name="reviews-container"').innerHTML = reviewHTML;

    }
}
let reviewContainer = document.querySelector('[name="reviews-container"');

document.querySelector('[name="review-form"').addEventListener("submit", () => {
    let reviewName = document.querySelector('[name="review-name"]').value;
    let reviewDescription = document.querySelector('[name="review-text"]').value;
    
    let date = new Date();
    let today = `Dato: ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

    const newReview = new Review(reviewName, reviewDescription, today);

    event.target.reset();
});

(function(){
    Review.renderReviews();
})();
export class ReviewElement extends HTMLElement {
    constructor() {
        super();
        //Creating HTML elements to reviews 
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

        let stars = document.createElement('div');
        stars.innerHTML = this.getAttribute("stars");
        stars.setAttribute('class', 'review-star-element');
        this.appendChild(stars);
    }

}

window.customElements.define("resturante-review", ReviewElement);

let getReviews = () => JSON.parse(localStorage.getItem('reviews')) || [];

//Review class for adding and rendering
export class Review {
    static reviewList = [];
    constructor(name, reviewText, reviewDate, reviewStars) {
        this.name = name;
        this.reviewText = reviewText;
        this.reviewDate = reviewDate;
        this.reviewStars = reviewStars;

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
                date="${review.reviewDate}"
                stars="${renderReviewStars(review.reviewStars)}
            </resturante-review>`;
        });
        document.querySelector('[name="reviews-container"').innerHTML = reviewHTML;
    }
}
//Rendering the amount of stars per review per review
function renderReviewStars(stars) {
    var html = ``;
    for(var i = 0; i <= stars; i++) {
        html += `<i class="fas fa-star"></i>`;
    };
    for(var r = stars+1; r <= 5; r++) {
        html += `<i class="far fa-star"></i>`;
    }
    return html;  
}

let reviewContainer = document.querySelector('[name="reviews-container"');

//Let the user set the amount of stars.
var isClicked = false;
var amountOfStars; 
document.querySelector("star-review").addEventListener("mouseover", () => {
    var star = document.querySelectorAll('.star');
    for(var i = 0; i < star.length; i++) {
        // If the amount not has been set yes
        if(!isClicked) {
            (function(index) {
                //Event mouseover, "gold stars" from star number one to the users pointer
                star[index].addEventListener("mouseover", function() {
                    for(var r = 0; r <= index; r++) {
                        star[r].style.color = "gold";
                    }
                })
               //If the user not choose any stars, the stars will reset. 
                star[index].addEventListener("mouseout", function() {
                    if (!isClicked) {
                        for(var r = 0; r <= index; r++) {
                            star[r].style.color = "black";
                        }
                    }
                })
                //Event click, when the user clickes one of the stars.
                star[index].addEventListener("click", function() {
                    isClicked = true;
                    amountOfStars = index+1;
                    for(var r = 0; r <= index; r++) {
                        star[r].style.color = "gold";
                    }     
                })
            })(i);
        }
        //If the amout of stars has already been choosen, and the user want to change it. 
        else {(function(index) {
            star[index].addEventListener("click", function() {
                isClicked = true;
                amountOfStars = index+1;
                for(var r = index+1; r <= 4; r++) {
                    star[r].style.color = "black";
                }
            })
        })(i);}
    }
})

//Click event for submit-butten to add an review.
document.querySelector('[name="review-form"').addEventListener("submit", () => {
    let reviewName = document.querySelector('[name="review-name"]').value;
    let reviewDescription = document.querySelector('[name="review-text"]').value;
    
    let date = new Date();
    let today = `Dato: ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;

    const newReview = new Review(reviewName, reviewDescription, today, amountOfStars);

    event.target.reset();
});

(function(){
    Review.renderReviews();
})();
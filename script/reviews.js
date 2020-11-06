export class ReviewElement extends HTMLElement {
    constructor() {
        super();
        //Creating HTML elements to reviews 
        let article = document.createElement('article');
        article.setAttribute('class', 'review-article');
        this.appendChild(article);

        let name = document.createElement('h3');
        name.textContent = this.getAttribute("name");
        name.setAttribute('class', 'review-name');
        article.appendChild(name);

        let text = document.createElement('p');
        text.textContent = this.getAttribute("text");
        text.setAttribute('class', 'review-text');
        article.appendChild(text);

        let stars = document.createElement('div');
        stars.innerHTML = this.getAttribute("stars");
        stars.setAttribute('class', 'review-star-element');
        article.appendChild(stars);
    }

}

window.customElements.define("restaurant-review", ReviewElement);

//Review class for adding and rendering
export class Review {
    static reviewList = [];
    static getSortOrder = () => document.querySelector("[name='review-sort']").value;
    static getReviews = () => JSON.parse(localStorage.getItem('reviews')) || [];

    constructor(name, reviewText, reviewDate, reviewStars) {
        this.name = name;
        this.reviewText = reviewText;
        this.reviewDate = reviewDate;
        this.reviewStars = reviewStars;

        this.addReview();
    }

    addReview() {
        Review.reviewList = Review.getReviews();
        Review.reviewList.push(this);
        window.localStorage.setItem('reviews', JSON.stringify(Review.reviewList));
        Review.renderReviews();
    }

    static renderReviewStars(stars) {
        var html = ``;
        for(var i = 1; i <= stars; i++) {
            html += `<i class='fas fa-star'></i>`;
        };
        for(var r = stars+1; r <= 5; r++) {
            html += `<i class='far fa-star'></i>`;
        }
        return html;  
    }
    
    static renderReviews() {
        let reviewHTML = "";
        let sortReview = reviewList => {
            switch(Review.getSortOrder()) {
                case "date-new-first":
                    return reviewList.sort( (a,b) => new Date(b.reviewDate) - new Date(a.reviewDate));
                    break;
                case "date-old-first":
                    return reviewList.sort( (a,b) => new Date(a.reviewDate) - new Date(b.reviewDate));;
                    break;
                case "review-best-first":
                    return reviewList.sort((a,b) => a.reviewStars < b.reviewStars ? 1 : -1);
                    break;
                case "review-bad-first":
                    return reviewList.sort((a,b) => a.reviewStars > b.reviewStars ? 1 : -1);;
                    break;
            }
        }
        sortReview(Review.getReviews())
        .forEach(review => {
            reviewHTML += `
            <restaurant-review
                name="${review.name} (Publisert: ${review.reviewDate})"
                text="${review.reviewText}"
                stars="${Review.renderReviewStars(review.reviewStars)}">
            </restaurant-review>`;
        });
        document.getElementById("reviews-container").innerHTML = reviewHTML;
    }
}
//Rendering the amount of stars per review per review




//Let the user set the amount of stars.
var isClicked = false;
var amountOfStars; 
function setAmountOfStars () {
    var star = document.querySelectorAll('.input-star');
    for(var i = 0; i < star.length; i++) {
        // If the amount not has been set yes
        if(!isClicked) {
            (function(index) {
                //Event mouseover, "gold stars" from star number one to the users pointer
                star[index].addEventListener("mouseover", function() {
                    if(!isClicked) {
                        for(var r = 0; r <= index; r++) {
                            star[r].style.color = "#FF1801";
                        }
                }
                })
               //If the user not choose any stars, the stars will reset. 
                star[index].addEventListener("mouseout", function() {
                    if (!isClicked) {
                        for(var r = 0; r <= index; r++) {
                            star[r].style.color = "#ffffff";
                        }
                    }
                })
                //Event click, when the user clickes one of the stars.
                star[index].addEventListener("click", function() {
                    isClicked = true;
                    amountOfStars = index+1;
                    for(var r = 0; r <= index; r++) {
                        star[r].style.color = "#FF1801";
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
                    star[r].style.color = "#ffffff";
                }
            })
        })(i);}
    }
}

//Click event for submit-butten to add an review.
function addReview() {
    let reviewName = document.querySelector('[name="review-name"]').value;
    let reviewDescription = document.querySelector('[name="review-text"]').value;
    
    let date = new Date();
    let today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    const newReview = new Review(reviewName, reviewDescription, today, amountOfStars);

    event.target.reset()
    ;};

if(document.getElementById("reviews-container")) {
    Review.renderReviews();
    document.querySelector(`[name="review-sort"]`).addEventListener( "change", () => {
        Review.renderReviews()
    } );
    document.querySelector("star-review").addEventListener("mouseover", () => {
        setAmountOfStars();
    } );
    document.querySelector('[name="review-form"').addEventListener("submit", () => {
        addReview();
    } );
}

//Sets default reviews in localStorage
if (localStorage.getItem("reviews") === null) {
    let review1 = new Review("Petter Wibstad", "Total opplevelsen 5/5 - dette er best 🏆🥇skal du ha en fantastisk sushi opplevelse, så er dette stedet,Mat 5/5 - beste sushi og en bra vinmeny Service 5/5 - bra service og presentasjon av maten", "2010-10-10", 5);
    let review2 = new Review("Magnus Om", "Bestilte Sushi middag til hele familien men fikk feil leveranse. Vi ga beskjed og tilbakemeldingen fra Maki Sushi var at vi skulle gi beskjed neste gang vi bestilte så skulle de ordne opp. Når vi så bestilte neste gang fikk vi beskjed om dette skulle vært ordnet med en gang, noe som er stikk motsatt av den første beskjeden", "2020-03-20", 1);
    let review3 = new Review("Martin Tordal", "Jeg gir dette stedet 3 stjerner fordi kvaliteten sto til prisen. 210 kr for 20 biter er på ingen måte en stiv pris. Passer perfekt hvis man vil spise en stor porsjon uten å bruke mye penger", "2011-09-30", 3);
}

/*Importing js modules*/
import {UUElement} from '../script/universal-design.js';
import { Product, ProductListElement } from '../script/product.js';
import { ShoppingCart, deliveryMethodChanged, placeOrder } from '../script/shopping_cart.js';
import { Review, ReviewElement } from '../script/reviews.js';

export {
    UUElement, Product, ProductListElement, Review, ShoppingCart, ReviewElement, deliveryMethodChanged, placeOrder
}
/*
export function shoppingCartQty() {
    document.getElementById("menubar-shoppingcart-qty").innerHTML = ShoppingCart.getQty();

*/
(function(){
    ShoppingCart.setMenuBarQty();
})(); 

/* Slideshow */



let slideIndex = 1;
let getSlideIndex = () => slideIndex;


//Declear auto slide timer and function to start timer
let autoSlide;
let startSlideShow = () => autoSlide = setInterval(() => changeBanner(slideIndex,slideIndex += 1), 5000 );   



/* Change banner */

function changeBanner(currentIndex, newIndex) {
    let slide = document.getElementsByClassName("slideshow");
    
    /*If user clickes next on the last banner, start on new*/
    if (newIndex > slide.length) {
        slideIndex = 1;
    }
    /*If user clickes previous on the first banner, */
    if (newIndex < 1) {
        slideIndex = slide.length;
    }
    /*Animation for going backward */
   if(currentIndex > slideIndex) {
    slide[slideIndex-1].style.transform = "translateX(-100%)";
    anime({
        targets: slide[slideIndex-1],
        translateX: '0%',
        easing: 'easeInOutExpo'
      });
    anime({
        targets: slide[currentIndex-1],
        translateX: '100%',
        easing: 'easeInOutExpo'
      });
    setTimeout(function () {
        slide[currentIndex-1].style.transform = "translateX(100%)";
    }, 1000); 
   }
   /*Animation for going forward */
   if(currentIndex < slideIndex) {
    slide[slideIndex-1].style.transform = "translateX(100%)";
    anime({
        targets: slide[slideIndex-1],
        translateX: '0%',
        easing: 'easeInOutExpo'
      });
    anime({
        targets: slide[currentIndex-1],
        translateX: '-100%',
        easing: 'easeInOutExpo'
      });
    setTimeout(function () {
        slide[currentIndex-1].style.transform = "translateX(-100%)";
    }, 1000); 
   }
    
}

/*Eventlistner for buttons on the banner*/
startSlideShow();
document.getElementById("next-btn").addEventListener("click", () => {
    clearInterval(autoSlide);
    changeBanner(slideIndex,slideIndex += 1);
    startSlideShow();
})

document.getElementById("prev-btn").addEventListener("click", () => {
    clearInterval(autoSlide);
    changeBanner(slideIndex,slideIndex += -1);
    startSlideShow();
    
})
//Function to show and hide menu on smaller screens
let navbarToggle = () => {
	document.querySelectorAll('.navbar-item')
	.forEach( item => getComputedStyle(item).display === "block" ? item.style.display = "none" :  item.style.display = "block" );
}

document.getElementById('navbar-toggle').addEventListener('click', navbarToggle);

//Adding event lisentner only if element is loaded
if(Product.productContainer){
    //Drag and drop events
    document.querySelector(".navbar-cart").addEventListener('dragover', (event) =>
        ProductListElement.allowDrop(event));
    
    document.querySelector(".navbar-cart").addEventListener('drop', (event) => 
        ProductListElement.drop(event));
    
    //Close feedback window
    document.getElementById('cart-feedback__exit').addEventListener('click', () => 
        document.getElementById('cart-feedback').style.display = "none" );

    window.addEventListener('scroll', () => 
        document.getElementById('cart-feedback').style.display = "none" );
        

    //Creating products
    window.localStorage.setItem('productList', JSON.stringify([]));
    new Product("Liten sushi", "../images/food/Liten-tallerken.jpg", "Perfekt som en porsjon.", "89");
    new Product("Stor sushi", "../images/food/Stor-tallerken.jpg", "Ekstra sulten eller på deling?", "229");
    new Product("Lakse-Maki", "../images/food/Maki-salmon.jpg", "Vår klassiske Maki med laks.", "109");
    new Product("Vegetar-Maki", "../images/food/Maki-vegetar.jpg", "Kutte ned på kjøttinntak? Vegetar-Maki!", "99");
    new Product("Tempura-Kongereker", "../images/food/Tempura-Reke.jpg", "Store, friterte reker.", "149");
    new Product("Sashimi", "../images/food/Sushi-bowl.jpg", "Vår anerkjente sashimi.", "119");
    new Product("Sushi-Burrito", "../images/food/Sushi-Wrap.jpg", "Prøve noe nytt? Sushi i burrito-form!", "99");
    new Product("Sushi for eventer", "../images/food/Event-tallerken.jpg", "Utrolig stor tallerken, perfekt for eventer!", "999");
    Product.productContainer.addEventListener('load', Product.renderProducts() );
}

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

    //Sets default reviews in localStorage
    if (localStorage.getItem("reviews") === null) {
        let review1 = new Review("Petter Wibstad", "Total opplevelsen 5/5 - dette er best 🏆🥇skal du ha en fantastisk sushi opplevelse, så er dette stedet,Mat 5/5 - beste sushi og en bra vinmeny Service 5/5 - bra service og presentasjon av maten", "2010-10-10", 5);
        let review2 = new Review("Magnus Om", "Bestilte Sushi middag til hele familien men fikk feil leveranse. Vi ga beskjed og tilbakemeldingen fra Maki Sushi var at vi skulle gi beskjed neste gang vi bestilte så skulle de ordne opp. Når vi så bestilte neste gang fikk vi beskjed om dette skulle vært ordnet med en gang, noe som er stikk motsatt av den første beskjeden", "2020-03-20", 1);
        let review3 = new Review("Martin Tordal", "Jeg gir dette stedet 3 stjerner fordi kvaliteten sto til prisen. 210 kr for 20 biter er på ingen måte en stiv pris. Passer perfekt hvis man vil spise en stor porsjon uten å bruke mye penger", "2011-09-30", 3);
    }
}

if(ShoppingCart.container){
	ShoppingCart.renderShoppingCart();
	document.getElementById("delivery-method").addEventListener("click", deliveryMethodChanged);
	document.querySelector("[name='form-place-order']").addEventListener("submit", placeOrder); 
}

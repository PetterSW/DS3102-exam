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
let startSlideShow = () => autoSlide = setInterval(() => changeBanner(slideIndex,slideIndex += 1), 3000 );   



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
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

function showBanner(currentIndex, newIndex) {
    console.log(currentIndex, newIndex);
    let slide = document.getElementsByClassName("slideshow");
    let img = document.getElementsByClassName("slide-img");
    
    if (newIndex > slide.length) {
        slideIndex = 1;
    }
    if (newIndex < 1) {
        slideIndex = slide.length;
    }

    /*
    for(let i = 0; i < slide.length; i++) {
        img[i].style.transform = "translateX(-100%)";
        slide[i].style.display = "none";
    }
    */
    slide[slideIndex-1].style = "height: auto; width: auto;";
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
        slide[currentIndex-1].style = "height: 0px; width: auto;";
    }, 1000); 
}

document.getElementById("next-btn").addEventListener("click", () => {
    showBanner(slideIndex,slideIndex += 1);
    
})

document.getElementById("prev-btn").addEventListener("click", () => {
    showBanner(slideIndex,slideIndex += -1);
})
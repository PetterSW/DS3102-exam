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
showBanner(slideIndex);

function currentBanner(index) {
    showBanner (slideIndex = index);
}

function showBanner(index) {
    let slide = document.getElementsByClassName("slideshow");
    let img = document.getElementsByClassName("slide-img");
    
    if (index > slide.length) {
        slideIndex = 1;
    }
    if (index < 1) {
        slideIndex = slide.length;
    }
    for(let i = 0; i < slide.length; i++) {
        img[i].style.transform = "translateX(-100%)";
        slide[i].style.display = "none";
    }
    slide[slideIndex-1].style.display = "block";
    anime({
        targets: img[slideIndex-1],
        translateX: '0%',
        easing: 'easeInOutExpo'
      });
}

document.getElementById("next-btn").addEventListener("click", () => {
    showBanner(slideIndex += 1);
    
})

document.getElementById("prev-btn").addEventListener("click", () => {
    showBanner(slideIndex += -1);
})
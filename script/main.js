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

//Function to show and hide menu on smaller screens
let navbarToggle = () => {
	document.querySelectorAll('.navbar-item')
	.forEach( item => getComputedStyle(item).display == "none" ? item.style.display = "block" :  item.style.display = "none" );
}

document.getElementById('navbar-toggle').addEventListener('click', navbarToggle);
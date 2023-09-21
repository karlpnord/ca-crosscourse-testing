import { cartAmount } from "./components/cartAmount.js";

cartAmount();

const button = document.querySelector(".checkout");

button.addEventListener("click", clearCart);

function clearCart() {
   localStorage.clear();
   cartAmount();
}
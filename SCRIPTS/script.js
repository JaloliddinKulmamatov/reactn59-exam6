import { checkToken, redirect, logout } from "./utils.js"; 

const logOutButton = document.getElementById("log-btn");
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const productDescription = document.getElementById("product-description");
const productList = document.getElementById("product-list");
const addProductBtn = document.getElementById("add-product-btn")

window.addEventListener("DOMContentLoaded", function () {
  const tokenExists = checkToken();
  if (!tokenExists) {
    redirect("/login.html");
  }
});

logOutButton.onclick = logout;

const form = document.forms[0];
const productArray = [];

function createCard() {
  if(!productName.value && productPrice.value < 0 && !productDescription.value) {
    addProductBtn.disabled = true;
  }
  else if (productName.value && productPrice.value > 0 && productDescription.value) {
    addProductBtn.disabled = false;
    const newProduct = {
      id: Date.now(),
      name: productName.value,
      price: parseFloat(productPrice.value),
      description: productDescription.value,
    };
    const productCard = document.createElement('div');
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <p>ID: ${newProduct.id}</p>
      <p>Name: ${newProduct.name}</p>
      <p>Price: ${newProduct.price}$</p>
      <p>Description: ${newProduct.description}</p>
      <button class="delete-btn">Delete</button>
    `;

    productName.value = '';
    productPrice.value = '';
    productDescription.value = '';

    productArray.push(newProduct);
    productList.append(productCard);

    const deleteButton = productCard.querySelector(".delete-btn");

    deleteButton.onclick = function() {
      productList.removeChild(productCard);
    };
  }
}

form.onsubmit = function(event) {
  event.preventDefault();
  createCard()
};
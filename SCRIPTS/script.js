        import { checkToken, redirect, logout } from "./utils.js"; 

        const logOutButton = document.getElementById("log-btn");
        const productName = document.getElementById("product-name");
        const productPrice = document.getElementById("product-price");
        const productDescription = document.getElementById("product-description");
        const productList = document.getElementById("product-list");
        const addProductBtn = document.getElementById("add-product-btn");

        window.addEventListener("DOMContentLoaded", function () {
            const tokenExists = checkToken();
            if (!tokenExists) {
                redirect("/login.html");
            }
        });

        logOutButton.onclick = logout;

        const form = document.forms[0];
        form.onsubmit = function(event) {
            event.preventDefault();
            createCard();
        };

        function createCard() {
            if (productName.value && productPrice.value > 0 && productDescription.value) {
                const newProduct = {
                    id: Date.now(),
                    name: productName.value,
                    price: parseFloat(productPrice.value),
                    description: productDescription.value,
                };

                productArray.push(newProduct);
                localStorage.setItem('products', JSON.stringify(productArray));
                addProductToDOM(newProduct);

                productName.value = '';
                productPrice.value = '';
                productDescription.value = '';
            }
        }

        function addProductToDOM(product) {
            const productCard = document.createElement('div');
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <p>ID: ${product.id}</p>
                <p>Name: ${product.name}</p>
                <p>Price: ${product.price}$</p>
                <p>Description: ${product.description}</p>
                <button class="delete-btn">Delete</button>
            `;

            const deleteButton = productCard.querySelector(".delete-btn");
            deleteButton.onclick = function() {
                productList.removeChild(productCard);
            
            };

            productList.append(productCard);
        }


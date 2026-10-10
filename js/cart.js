let cart =
    JSON.parse(

        localStorage.getItem("biteboxCart")

    ) || [];

const cartItems = document.getElementById("cart-items");

cart.forEach((product, index) => {
    cartItems.innerHTML += `
        <tr>

            <td>
                <div class="cart-item">

                    <img 
                        src="${product.image}" 
                        alt="${product.name}" 
                        width="80"
                    >

                    <div>
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                    </div>

                </div>
            </td>

            <td>₹${product.price}</td>

            <td>

                <div class="quantity-box">

                    <button onclick="decreaseQuantity(${index})">-</button>

                    <span>${product.quantity}</span>

                    <button onclick="increaseQuantity(${index})">+</button>

                </div>

            </td>

            <td>
                ₹${product.price * product.quantity}
            </td>

            <td>

                <a href="#">
                    <img 
                        src="assets/icons/delete.png" 
                        alt="Delete" 
                        width="25"
                    >
                </a>

            </td>

        </tr>
    `;
});


function calculateItemTotal(price, quantity) {
    console.log("CalculateItemTotal", price * quantity);
    return price * quantity;

}

const cartItem = document.getElementById("cart-items").textContent;
console.log("cartItem", cartItem);

// const burgerInput = document.getElementById("cheese-burger").textContent;
// console.log("burgerInput", burgerInput);

// const pastaInput = document.getElementById("creamy-pasta").textContent;
// console.log("pastaInput", pastaInput);

let cartRows = document.querySelectorAll(
    "#shopping-cart tbody tr"

);
console.log("cartRows", cartRows);

// function calculateSubtotal() {
//     let subtotal = 0;
//     let cartRows = document.querySelectorAll("#shopping-cart tbody tr");
//     let subtotalElement = document.getElementById("subtotal-amount");

//     cartRows.forEach(function (row) {
//         let priceText = row.children[1].textContent;
//         console.log("priceText", priceText);

//         let price = parseFloat(priceText.replace("₹", ""));
//         console.log("price", price);
//         let quantityText = row.querySelector(".quantity-box span").textContent;
//         console.log("quantityText", quantityText);
//         let quantity = parseInt(quantityText);
//         console.log("quantity", quantity);
//         let itemTotal = calculateItemTotal(price, quantity);
//         console.log("itemTotal", itemTotal);
//         subtotal += itemTotal;
//         console.log("subtotal", subtotal);
//         // subtotal = subtotal + itemTotal;

//     });
//     subtotalElement.innerText = "₹" + subtotal;
//     return subtotal;
// }
//calculateSubtotal();
function calculateSubtotal() {

    let subtotal = 0;

    cart.forEach(function (item) {

        let itemTotal =
            calculateItemTotal(
                item.price,
                item.quantity
            );

        subtotal += itemTotal;

    });

    return subtotal;
}

function calculateDeliveryCharge(subtotal) {
    if (subtotal === 0) {
        return 0;
    }
    return 40; // Example delivery charge
}
// let deliveryCharge = calculateDeliveryCharge(calculateSubtotal());
// let deliveryChargeElement = document.getElementById("delivery-amount");
// deliveryChargeElement.innerText = "₹" + deliveryCharge;

function calculatePackagingCharge(subtotal) {
    if (subtotal === 0) {
        return 0;
    }

    return 20;
}
// let packagingCharge = calculatePackagingCharge(calculateSubtotal());
// let packagingChargeElement = document.getElementById("packaging-amount");
// packagingChargeElement.innerText = "₹" + packagingCharge;

function calculateDiscount(subtotal) {
    if (subtotal > 500) {
        return subtotal * 0.10;
    }
    return 0;
}
// let discount = calculateDiscount(calculateSubtotal());
// let discountElement = document.getElementById("discount-amount");
// discountElement.innerText = "₹" + discount.toFixed(2);

function calculateTotal(subtotal, deliveryCharge, packagingCharge, discount) {
    return subtotal + deliveryCharge + packagingCharge - discount;
}
// let total = calculateTotal(calculateSubtotal(), deliveryCharge, packagingCharge, discount);
// let totalElement = document.getElementById("total-amount");
// totalElement.innerText = "₹" + total.toFixed(2);

function updateOrderSummary() {

    let subtotalElement = document.getElementById("subtotal-amount");
    if (!subtotalElement) {
        return;
    }

    let subtotal = calculateSubtotal();
    let deliveryCharge = calculateDeliveryCharge(subtotal);
    let packagingCharge = calculatePackagingCharge(subtotal);
    let discount = calculateDiscount(subtotal);
    let totalAmount = calculateTotal(subtotal, deliveryCharge, packagingCharge, discount);


    document.getElementById("subtotal-amount").textContent = "₹" + subtotal.toFixed(2);
    document.getElementById("delivery-amount").textContent = "₹" + deliveryCharge.toFixed(2);
    document.getElementById("packaging-amount").textContent = "₹" + packagingCharge.toFixed(2);

    document.getElementById("discount-amount").textContent = "-₹" + discount.toFixed(2);

    document.getElementById("total-amount").textContent = "₹" + totalAmount.toFixed(2);

}
updateOrderSummary();

function increaseQuantity(index) {
    cart[index].quantity++;
    localStorage.setItem(
        "biteboxCart",
        JSON.stringify(cart)
    );
    renderCart();
    updateOrderSummary();
    updateCartCount();
}


function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        localStorage.setItem(
            "biteboxCart",
            JSON.stringify(cart)
        );
    }
    renderCart();
    updateOrderSummary();
    updateCartCount();
}

if (cartItems) {
    cartItems.addEventListener("click", function (event) {
        let button = event.target.closest("button");

        if (!button) {
            return;
        }

        let index = Number.parseInt(button.dataset.index);

        if (button.classList.contains("increase")) {
            increaseQuantity(index);
        }

        if (button.classList.contains("decrease")) {
            decreaseQuantity(index);
        }

    }
    );
}



function removeFromCart(index) {

    cart.splice(index, 1);
    localStorage.setItem("biteboxCart", JSON.stringify(cart));

    renderCart();
    updateOrderSummary();
    updateCartCount();

}


function renderCart() {
    cartItems.innerHTML = "";
    cart.forEach(function (item, index) {
        let itemTotal = item.price * item.quantity;
        let row = document.createElement("tr");

        row.innerHTML = `

            <td>

                <div class="cart-item">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div>

                        <h3>
                            ${item.name}
                        </h3>

                    </div>

                </div>

            </td>

            <td>
                ₹${item.price}
            </td>

  <td>

                <div class="quantity-box">

                    <button
                        class="decrease"
                        data-index="${index}">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        class="increase"
                        data-index="${index}">
                        +
                    </button>

                </div>

            </td>


            <td>
                ₹${itemTotal.toFixed(2)}
            </td>

 <td>

    <a href="#" onclick="removeFromCart(${index}); return false;">

    <img src="assets/icons/delete.png" alt="Delete" width="25">

    </a>

            </td>

        `;

        cartItems.appendChild(row);

    });
}

renderCart();
updateCartCount();

function clearCart() {
    cart = [];
    localStorage.removeItem("biteboxCart");
    renderCart();
    updateOrderSummary();
    updateCartCount();
}

function updateCartCount() {

    let cartCount = 0;
    cart.forEach(function (item) {
        cartCount += item.quantity;
    });

    let cartCountElement =
        document.getElementById("cart-count");

    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}
updateCartCount();
let themeButton = document.getElementById("theme-toggle");


function toggleTheme() {
    document.body.classList.toggle("dark-theme");

    let themeIcon = themeButton.querySelector(".theme-icon");
  
    let themeText = themeButton.querySelector(".theme-text");

    if (document.body.classList.contains("dark-theme")) {
        themeIcon.textContent = "☾";
        themeText.textContent ="NIGHT MODE";
        localStorage.setItem("biteboxTheme","dark");
    }  

 else {
        themeIcon.textContent = "☀";
        themeText.textContent ="DAY MODE";
        localStorage.setItem("biteboxTheme","light");

    }
}

function loadTheme() {
    let savedTheme = localStorage.getItem("biteboxTheme");

    /* Disable animation while loading */
    document.body.classList.add("theme-loading");

    if (savedTheme === "dark") {
       document.body.classList.add("dark-theme");
    }

else {
        document.body.classList.remove("dark-theme");
    }

    let themeIcon = themeButton.querySelector(".theme-icon");

    let themeText = themeButton.querySelector(".theme-text");

    if (savedTheme === "dark") {
        if (themeIcon) {
            themeIcon.textContent ="☾";
        }

        if (themeText) {
            themeText.textContent = "NIGHT MODE";
        }
    }

    else {

        if (themeIcon) {
            themeIcon.textContent = "☀";
        }


        if (themeText) {
            themeText.textContent = "DAY MODE";
        }
    }

    /* Allow animation again */
    setTimeout(function () {
        document.body.classList.remove("theme-loading");
    }, 50);

}
if (themeButton) {
     themeButton.addEventListener("click",function () {
            toggleTheme();
        }
    );
}
loadTheme();
let cart =
    JSON.parse(

        localStorage.getItem("biteboxCart")

    ) || [];

const cartItems = document.getElementById("cart-items");

cart.forEach((product) => {
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

                    <button>-</button>

                    <span>${product.quantity}</span>

                    <button>+</button>

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

const pizzaInput = document.getElementById("margherita-pizza").textContent;
console.log("pizzaInput", pizzaInput);

const burgerInput = document.getElementById("cheese-burger").textContent;
console.log("burgerInput", burgerInput);

const pastaInput = document.getElementById("creamy-pasta").textContent;
console.log("pastaInput", pastaInput);

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
}
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        localStorage.setItem("biteboxCart",JSON.stringify(cart)
        );
    }
    renderCart();
    updateOrderSummary();
}
if(cartbody){
cartBody.addEventListener("click", function (event) {
        let button = event.target.closest("button");
  
        if (!button) {
            return;
        }

        let index = parseInt(button.dataset.index);

        if (button.classList.contains( "increase")) {
            increaseQuantity(index);
        }

        if (button.classList.contains("decrease")) {
            decreaseQuantity(index);
        }

    }
);
}

















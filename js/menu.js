let cart =
    JSON.parse(
      
        localStorage.getItem("biteboxCart")
      
    ) || [];
let menuContainer = document.getElementById("menu-items");
console.log("menuContainer:", menuContainer);
if (menuContainer) {
    menuContainer.addEventListener("click", function (event) {
        let button = event.target.closest("button");
        if (!button) {
            return;
        }
        if (button.textContent.includes("Add to Cart")) {

            let card = button.closest("article");

            addToCart(card);
        }
    }
    );
}
function addToCart(card) {
    let name = card.querySelector("h3").textContent.trim();

    let priceText = card.querySelector(".price").textContent;

    let price = parseFloat(priceText.replace("₹", ""));

    let image = card.querySelector("img").getAttribute("src");

    let cartItem = {

        name: name,
        price: price,
        image: image,
        quantity: 1

    };

    console.log("Name:", cartItem.name);
    console.log("Price:", cartItem.price);
    console.log("Image:", cartItem.image);

    let existingItem =
        cart.find(function (item) {
            return item.name === name;

        });
    if (existingItem) {
        existingItem.quantity++;
    }
    else {
        cart.push(cartItem);
    }

    console.log("Cart:", cart);
    localStorage.setItem("biteboxCart",JSON.stringify(cart));
    renderCart();


}
//Connect JavaScript with the Cart

let cartBody =
    document.querySelector(
        "#shopping-cart tbody"
    );
function renderCart() {
    cartBody.innerHTML = "";
}

function renderCart() {
    if (!cartBody) {
        return;
    }
    cartBody.innerHTML = "";
    if (cart.length === 0) {

        let row = document.createElement("tr");


        row.innerHTML = `

            <td colspan="5">

                <div class="empty-cart">

                    <h3> Your Cart is Empty</h3>

                    <p>
                        Add some delicious food
                        from our Menu!
                    </p>
Add this inside renderCart() immediately after cartBody.innerHTML = "";:


            </div>

            </td>

        `;


        cartBody.appendChild(row);

        return;

    }


    // cart.forEach() comes here
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

    <a href="#" class="remove-item" data-index="${index}">

    <img src="assets/icons/delete.png" alt="Delete" width="25">

    </a>

            </td>

        `;



        cartBody.appendChild(row);

    });

}
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

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("biteboxCart",JSON.stringify(cart));

    renderCart();
    updateOrderSummary();

}














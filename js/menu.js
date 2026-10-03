let cart = JSON.parse(localStorage.getItem("biteboxCart")) || [];


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

console.log("cartBody:", cartBody);
if(cartBody){
cartBody.addEventListener("click", function (event) {
        let button = event.target.closest("button");
  
        if (!button) {
            return;
        }

        let index = parseInt(button.dataset.index);

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
    localStorage.setItem("biteboxCart",JSON.stringify(cart));

    renderCart();
    updateOrderSummary();

}

//Smart Menu Search & Filtering

let menuCards = document.querySelectorAll("#menu-items article");
console.log("menuCards:", menuCards);

let searchInput = document.getElementById("menu-search");

let searchButton = document.getElementById("search-button");
console.log("searchButton:", searchButton);
console.log("searchInput:", searchInput);

function searchMenu(searchText) {
    let searchValue =  searchText .trim().toLowerCase();

    menuCards.forEach(function(card) {
        let foodName = card.querySelector("h3").textContent.trim().toLowerCase();

        if (foodName.includes(searchValue)) {
            card.style.display = "";
        }
        else {
            card.style.display = "none";
        }
    });

}
console.log("searchMenu:", searchMenu);
if (searchButton) {
    searchButton.addEventListener(
        "click",
        function() {

            searchMenu(
                searchInput.value
            );
        }
    );

}



// Task 2: Implement Category Filtering

let categoryCards = document.querySelectorAll("#categories article");
function filterMenu(category) {

    menuCards.forEach(function(card) {
        let cardCategory = card.dataset.category.toLowerCase();

        if (cardCategory === category) {
            card.style.display = "";
        }
        else {
            card.style.display = "none";
        }
    });

}
categoryCards.forEach(
    function(card) {

        card.addEventListener("click",function() {
                let category = card.querySelector("h3")
                        .textContent
                        .trim()
                        .toLowerCase();
                filterMenu(category);
            }
        );
    }
);
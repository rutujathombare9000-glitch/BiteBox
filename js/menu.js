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
    localStorage.setItem("biteboxCart", JSON.stringify(cart));
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
        localStorage.setItem("biteboxCart", JSON.stringify(cart)
        );
    }
    renderCart();
    updateOrderSummary();
}

console.log("cartBody:", cartBody);
if (cartBody) {
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
    localStorage.setItem("biteboxCart", JSON.stringify(cart));

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
    let searchValue = searchText.trim().toLowerCase();

    menuCards.forEach(function (card) {
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
        function () {

            searchMenu(
                searchInput.value
            );
        }
    );

}



// Task 2: Implement Category Filtering

let categoryCards = document.querySelectorAll("#categories article");
function filterMenu(category) {

    menuCards.forEach(function (card) {
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
    function (card) {

        card.addEventListener("click", function () {
            let category = card.querySelector("h3")
                .textContent
                .trim()
                .toLowerCase();
            filterMenu(category);
        }
        );
    }
);
let themeButton = document.getElementById("theme-toggle");


function toggleTheme() {
    document.body.classList.toggle("dark-theme");

    let themeIcon = themeButton.querySelector(".theme-icon");

    let themeText = themeButton.querySelector(".theme-text");

    if (document.body.classList.contains("dark-theme")) {
        themeIcon.textContent = "☾";
        themeText.textContent = "NIGHT MODE";
        localStorage.setItem("biteboxTheme", "dark");
    }

    else {
        themeIcon.textContent = "☀";
        themeText.textContent = "DAY MODE";
        localStorage.setItem("biteboxTheme", "light");

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
            themeIcon.textContent = "☾";
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
    themeButton.addEventListener("click", function () {
        toggleTheme();
    }
    );
}
loadTheme();

const addMenuBtn = document.getElementById("add-menu-btn");
const menuModal = document.getElementById("menu-modal");
const cancelMenuForm = document.getElementById("cancel-menu-form");
 let updateMenuId = null;

// addMenuBtn.addEventListener("click", function () {
//     menuModal.classList.add("show");
// });
addMenuBtn.addEventListener("click", function () {
    // updateMenuId = null;
    menuForm.reset();

    document.querySelector(".modal-header h2").textContent =
        "Add Menu Item";
    document.querySelector("#menu-form button[type='submit']").textContent =
        "Add Menu Item";
    menuModal.classList.add("show");
});

cancelMenuForm.addEventListener("click", function () {
    menuModal.classList.remove("show");
});

const menuForm = document.getElementById("menu-form");

const API_URL = "https://6ac3b144ae53bf25b80ed67d.mockapi.io/menu";


menuForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const name = document.getElementById("menu-name").value;

    const price = document.getElementById("menu-price").value;
    const category = document.getElementById("menu-category").value;
    const rating = document.getElementById("menu-rating").value;
    const reviews = document.getElementById("menu-reviews").value;
    const image = document.getElementById("menu-image").value;

    const menuItem = {
        name: name,
        price: price,
        category: category,
        rating: rating,
        reviews: reviews,
        image: image
    };

    try {
        if (updateMenuId !== null) {
            await updateMenuItem(updateMenuId, menuItem);
            updateMenuId = null;
        } else {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(menuItem)
            });

            const data = await response.json();
            console.log("Menu item added:", data);

         displayMenuItems([data]);
        }
        menuModal.classList.remove("show");
        menuForm.reset();
    } catch (error) {

        console.error("Error saving menu item:", error);

    }

});


// fetchMenuItems();
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
fetchMenuItems();

document.getElementById("menu-items").addEventListener("click", function (event) {

    if (event.target.closest(".update-menu-btn")) {

        const button = event.target.closest(".update-menu-btn");
        const card = button.closest("article");
        console.log("card", card);
        const menuId = card.dataset.id;
        updateMenuId = menuId;
        console.log("update", updateMenuId );
        console.log("data", card.dataset);
        console.log("Menu ID:", menuId);

        const menuName = card.querySelector("h3").textContent;

        const price = card.querySelector(".price").textContent
            .replace("₹", "")
            .trim();

        const rating = card.querySelector(".rating").childNodes[0]
            .textContent.trim();

        const reviews = card.querySelector(".rating small").textContent
            .replace("(", "")
            .replace(")", "")
            .trim();

        const category = card.dataset.category;

        const image = card.querySelector("img").src;


        document.getElementById("menu-name").value = menuName;

        document.getElementById("menu-price").value = price;

        document.getElementById("menu-category").value = category;

        document.getElementById("menu-rating").value = rating;

        document.getElementById("menu-reviews").value = reviews;

        document.getElementById("menu-image").value = image;


        document.querySelector(".modal-header h2").textContent =
            "Update Menu Item";

        document.querySelector("#menu-form button[type='submit']").textContent =
            "Update Menu Item";


        menuModal.classList.add("show");

    }

});


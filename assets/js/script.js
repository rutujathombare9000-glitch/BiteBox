
        let restaurantName = "BiteBox";
        
        let customerName = prompt(
            "Welcome to " + restaurantName + "!\n\nWhat is your name?"

        );
        alert("Hello" + customerName + "!\n\n Welcome to BiteBox.");
        let exploreMenu = confirm("World you like t explore our menu?");

        if (exploreMenu) {

    alert("Great! Let's explore the BiteBox menu.");

}

else {

    alert("No problem! You can explore the menu anytime.");

}

let choice = prompt( "Choose a BiteBox category:\n" +
    "1. Pizza\n" +
    "2. Burgers\n" +
    "3. Pasta\n" +
    "4. Desserts"
);

switch (choice) {
    case "1":
        alert("You selected Pizza!");
        break;
    case "2":
        alert("You selected Burgers!");
        break;
    case "3":
        alert("You selected Pasta!");
        break;
    case "4":
        alert("You selected Desserts!");
        break;
    default:
        alert("Invalid category selection.");
}

for (let i = 1; i <= 3; i++) {
    let food = prompt("Enter food item " + i);
    let quantity = prompt("Enter quantity for " + food );
    console.log(food + " - Quantity: " + quantity);
}



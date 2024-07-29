// List of products
let productItem = [
    // Each object in the array represents a product with its details
    { productName: "Waffle with Berries", category: "Waffle", price: "$ 6.50", photo: "waffle-desktop.jpg" },
    { productName: "Vanilla Bean Crème Brûlée", category: "Crème Brûlée", price: "$ 7.00", photo: "creme-brulee-desktop.jpg" },
    { productName: "Macaron Mix of Five", category: "Macaron", price: "$ 8.00", photo: "macaron-desktop.jpg" },
    { productName: "Classic Tiramisu", category: "Tiramisu", price: "$ 5.50", photo: "tiramisu-desktop.jpg" },
    { productName: "Pistachio Baklava", category: "Baklava", price: "$ 4.00", photo: "baklava-desktop.jpg" },
    { productName: "Lemon Meringue Pie", category: "Pie", price: "$ 5.00", photo: "meringue-desktop.jpg" },
    { productName: "Red Velvet Cake", category: "Cake", price: "$ 4.50", photo: "cake-desktop.jpg" },
    { productName: "Salted Caramel Brownie", category: "Brownie", price: "$ 4.50", photo: "brownie-desktop.jpg" },
    { productName: "Vanilla Panna Cotta", category: "Panna Cotta", price: "$ 6.50", photo: "panna-cotta-desktop.jpg" }
];

// Automatically build the product list
productItem.forEach(function (item) {
    // For each product item in the array, do the following:
    
    // Get the element with ID "main-list-of-cart" and add HTML content to it
    document.getElementById("main-list-of-cart").innerHTML += `
        <div class="cart">
            <!-- Container for the product image -->
            <div id="cart-img">
                <!-- Add product image -->
                <img src="assets/images/image-${item.photo}" alt="">
            </div>
            <!-- Container for the "Add to Cart" button -->
            <div id="add-to-cart">
                <!-- Add the button to add the item to the cart -->
                <a class="add-to-cart-button">Add to Cart</a>
            </div>
            <!-- Container for the product category -->
            <div id="cart-cat">
                <!-- Display product category -->
                <span>${item.category}</span>
            </div>
            <!-- Container for the product title/name -->
            <div id="cart-title">
                <!-- Display product name -->
                ${item.productName}
            </div>
            <!-- Container for the product price -->
            <div id="cart-price">
                <!-- Display product price -->
                <b>${item.price}</b>
            </div>
        </div>
    `;
});

// Initialize cart count
let cartCount = 1; // Start with a cart count of 1

// Add event listeners to each "Add to Cart" button
document.querySelectorAll(".add-to-cart-button").forEach(function (button) {
    // For each button with the class "add-to-cart-button", do the following:
    
    button.addEventListener("click", function (e) {
        // When the button is clicked, do the following:
        
        // Check if the button already has the "add-to-cart-button-active" class
        if (!button.classList.contains("add-to-cart-button-active")) {
            // Update the cart count display in the header
            // Calculate the number of items in the cart by subtracting 1 (for the empty cart message)
            const totalCartTitleCount = (document.getElementById("total-cart-main").children.length) - 1;
            // Update the header to show the number of items in the cart
            document.getElementById("total-cart-title-count").innerText = ` (${totalCartTitleCount}) `;
            
            // Add the order total and confirm button to the cart
            document.getElementById("total-cart-button").innerHTML = `
                <div id="total-cart-button-number">
                    <!-- Display the label for the total order -->
                    <span id="total-cart-button-number-left">Order Total</span>
                    <!-- Display the total order amount -->
                    <span id="total-cart-button-number-right">$46.5</span>
                </div>
                <div id="total-cart-button-allert">
                    <!-- Display a message about carbon-neutral delivery -->
                    <p>This is a <b>carbon-neutral</b> delivery</p>
                </div>
                <div>
                    <!-- Add a button to confirm the order -->
                    <button id="total-cart-button-confirm">Confirm Order</button>
                </div>
            `;
            
            // Get the product details from the clicked button's parent element
            let productElement = e.currentTarget.parentElement.parentElement; // Navigate up to the parent element
            // Extract the product title (name) from the cart element
            const productTitle = productElement.children[3].innerText;
            // Extract and parse the product price (remove the dollar sign)
            const productPrice = parseFloat(productElement.children[4].innerText.replace('$', ''));
            // Get the product image container
            const currentCartImg = e.currentTarget.parentElement.parentElement.children[0];
            // Highlight the product image by setting a border
            currentCartImg.children[0].style.border = "3px solid hsl(14, 86%, 42%)";

            // Change the button style and content to indicate the item has been added to the cart
            button.classList = "add-to-cart-button-active";
            let cartCount = 1; // Reset cart count for this item
            button.innerHTML = `
                <!-- Add decrement button -->
                <img class="decrement-button" src="assets/images/icon-decrement-quantity.svg" alt="">
                <!-- Display the current count -->
                <span>${cartCount}</span>
                <!-- Add increment button -->
                <img class="increment-button" src="assets/images/icon-increment-quantity.svg" alt="">
            `;

            // Create a new cart item element
            const newCartItem = document.createElement("div");
            newCartItem.className = "row-of-product"; // Set class for styling
            newCartItem.innerHTML = `
                <div class="right-row-of-products">
                    <!-- Display product title in the cart -->
                    <b><p class="right-row-of-products-title">${productTitle}</p></b>
                    <!-- Display the quantity of the product -->
                    <span class="amount-of-cart">${cartCount}x</span>
                    <!-- Display the price per unit of the product -->
                    <span class="price-of-cart">@ ${productPrice}.00</span>
                    <!-- Display the total price for the quantity of the product -->
                    <span class="total-price-of-cart">$${cartCount * productPrice}.00</span>
                </div>
                <div class="left-row-of-products">
                    <!-- Add a button to remove the product from the cart -->
                    <img class="left-row-of-products-img" src="assets/images/icon-remove-item.svg" alt="">
                </div>
            `;
            // Append the new cart item to the element with ID "total-cart-main"
            document.getElementById("total-cart-main").appendChild(newCartItem);

            // Function to update the cart display
            function updateCartDisplay() {
                // Update the quantity and total price for the cart item
                newCartItem.querySelector(".amount-of-cart").innerText = `${cartCount}x`;
                newCartItem.querySelector(".total-price-of-cart").innerText = `$${(cartCount * productPrice).toFixed(2)}`;
                // Update the total order price
                updateTotalOrderPrice();
            }

            // Increment button functionality
            button.querySelector(".increment-button").addEventListener("click", function () {
                // Increase the quantity of the product
                cartCount++;
                // Update the display with the new quantity
                button.querySelector("span").innerText = `${cartCount}`;
                // Update the cart item display
                updateCartDisplay();
            });

            // Decrement button functionality
            button.querySelector(".decrement-button").addEventListener("click", function () {
                // Only allow decrement if the quantity is greater than 1
                if (cartCount > 1) {
                    // Decrease the quantity of the product
                    cartCount--;
                    // Update the display with the new quantity
                    button.querySelector("span").innerText = `${cartCount}`;
                    // Update the cart item display
                    updateCartDisplay();
                }
            });

            // Remove item functionality
            newCartItem.querySelector(".left-row-of-products-img").addEventListener("click", function () {
                // Remove the cart item from the cart
                newCartItem.remove();
                // Reset the "Add to Cart" button state
                button.classList.remove("add-to-cart-button-active");
                button.innerHTML = "Add to Cart";
                // Remove the border from the product image
                currentCartImg.children[0].style.border = "none";
                // Update the cart count in the header
                const totalCartTitleCount = document.getElementById("total-cart-main").children.length - 2;
                document.getElementById("total-cart-title-count").innerText = ` (${totalCartTitleCount}) `;
                // Show empty cart message if there are no items left in the cart
                if (totalCartTitleCount === 0) {
                    document.getElementById("total-cart-main-empty").style.display = "flex";
                    document.getElementById("total-cart-button").innerHTML = ``;
                }
                // Update the total order price
                updateTotalOrderPrice();
            });

            // Hide empty cart message if there are items in the cart
            document.getElementById("total-cart-main-empty").style.display = "none";
            // Update the total order price
            updateTotalOrderPrice();
        }
    });

    // Function to update the total order price
    function updateTotalOrderPrice() {
        let totalOrderPrice = 0; // Initialize total order price
        // For each item in the cart, calculate the total price
        document.querySelectorAll(".row-of-product").forEach(function (item) {
            // Get the total price for each cart item
            const itemPrice = parseFloat(item.querySelector(".total-price-of-cart").innerText.replace('$', ''));
            // Add item price to the total order price
            totalOrderPrice += itemPrice;
        });
        // Update the total order price display
        document.getElementById("total-cart-button-number-right").innerText = `$${totalOrderPrice.toFixed(2)}`;
        // Add event listener to the confirm order button
        document.getElementById("total-cart-button-confirm").addEventListener("click", function () {
            // When the confirm order button is clicked, get the content of the cart
            const totalCartContent = document.getElementById("total-cart-main").innerHTML;
            // Display the cart content in the main content area
            document.getElementById("main-conetent-item").innerHTML = totalCartContent;
            // Show the popup to confirm the order
            document.getElementById("popup").style.display = "flex";
        });
    }
});

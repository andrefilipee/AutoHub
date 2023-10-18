document.addEventListener("DOMContentLoaded", function () {

    const carParts = getCarPartsFromLocalStorage();
    const shoppingCart = getCartItemsFromLocalStorage();

  

    displayComponents(carParts);
    displayShopCart(shoppingCart);

    // Function to retrieve car parts data from Local Storage
    function getCarPartsFromLocalStorage() {
        const carPartsJSON = localStorage.getItem("carParts");
        const carParts = carPartsJSON ? JSON.parse(carPartsJSON) : [];
        console.log("Car Parts From Local Storage:", carParts);
        return carParts;
    }

    // Function to save car parts data to Local Storage
    function saveCarPartsToLocalStorage(carParts) {
        localStorage.setItem("carParts", JSON.stringify(carParts));
        console.log("Car Parts Saved to Local Storage:", carParts);
    }


    function saveCartItemsToLocalStorage(cartItems) {
        const cartItemsJSON = JSON.stringify(cartItems);
        localStorage.setItem("cartItems", cartItemsJSON);
    }

    function addCarPart(name, category, price, image) {
        console.log("Adding part:", name, category, price, image)
        const carParts = getCarPartsFromLocalStorage();
        const newPart = { name, category, price, image };
        carParts.push(newPart);
        saveCarPartsToLocalStorage(carParts);

        console.log("Car Parts after adding:", carParts);
    }

    function addToCart(name, category, price) {
        const partToAdd = { name, category, price };
        const cartItems = getCartItemsFromLocalStorage();
        cartItems.push(partToAdd);
        saveCartItemsToLocalStorage(cartItems);
        window.location.href = "cart.html"
    }

    // Function to display components in the UI
    function displayComponents(components) {
        const componentsContainer = document.querySelector(".components");
        console.log("Components Container:", componentsContainer);
        componentsContainer.innerHTML = "";

        components.forEach(component => {
            const componentDiv = document.createElement("div");
            componentDiv.classList.add("component");
            componentDiv.innerHTML = `
                        <div class="thumb">
                            <div class="hover-content">
                                <ul>
                                    <li><a href="cart.html"><button class="btn btn-danger buy-button" href="/cart.html">Comprar</button></a></li>
                                </ul>
                            </div>
                            <img src="${component.image}" alt="${component.name}">
                        </div>
                        <div class="down-content">
                            <h4>${component.name}</h4>
                            <p>${component.category}</p>
                            <p>Price: ${component.price}€</p>
                        </div>
                        `;
            componentsContainer.appendChild(componentDiv);

            const buyButton = componentDiv.querySelector(".buy-button");
            buyButton.addEventListener("click", function () {
                addToCartAndNavigate(component.name, component.category, component.price, component.image);
            });
        });
    }

    function displayShopCart(shoppingCart) {
        const shoppingCartContainer = document.querySelector(".shoppingCart");
        shoppingCartContainer.innerHTML = "";

        shoppingCart.forEach(shoppingCart => {
            const shoppingDiv = document.createElement("div");
            shoppingDiv.classList.add("shoppingCart");
            shoppingDiv.innerHTML = `
                <td>${cartItem.name}</td>
                <td>${cartItem.category}</td>
                <td>$${cartItem.price.toFixed(2)}</td>
        `;
            shoppingCartContainer.appendChild(shoppingDiv);
        });
    }

    function getCartItemsFromLocalStorage() {
        const cartItemsJSON = localStorage.getItem("shoppingCart");
        return JSON.parse(cartItemsJSON) || [];
    }

    function getRandomImageForCategory(category) {
        const engineImages = ["engine1.jpg", "engine2.jpg", "engine3.png"];
        const brakesImages = ["brakes1.jpg", "brakes2.jpg", "brakes3.jpg"];
        const tiresImages = ["tire1.jpg", "tire2.jpg", "tire3.jpg"];
        const filterImages = ["filter1.jpg", "filter2.jpg", "filter3.jpg"];
        const electricImages = ["electric1.jpg", "electric2.jpg", "electric3.jpg"];

        const randomIndex = Math.floor(Math.random() * 3);

        switch (category) {
            case "engine":
                return `images/engine/${engineImages[randomIndex]} `;
            case "brakes":
                return `images/brakes/${brakesImages[randomIndex]} `;
            case "tires":
                return `images/tires/${tiresImages[randomIndex]} `;
            case "filter":
                return `images/filter/${filterImages[randomIndex]} `;
            case "electric":
                return `images/electric/${electricImages[randomIndex]} `;
        }
    }

    // Event listener for the add part form
    const addPartForm = document.getElementById("addPartForm");
    if (addPartForm) {
        console.log("Form Element Found");
        addPartForm.addEventListener("submit", function (event) {
            event.preventDefault();
            console.log("Form submitted");
            // Get values from the form
            const partName = document.getElementById("partName").value;
            const partCategory = document.getElementById("partCategory").value;
            const partPrice = document.getElementById("partPrice").value;

            console.log("Adding part:", partName, partCategory, partPrice);

            // Add the new part to the dataset
            addCarPart(partName, partCategory, partPrice);

            // Optionally, you can reset the form fields after adding a part
            addPartForm.reset();

            // Display components on shop.html
            const components = getCarPartsFromLocalStorage();
            console.log("Components after adding part:", components);
            displayComponents(components);

            // Display existing car parts on insert.html (optional)
            displayCarParts();
        });
    } else {
        console.log("No add part form found");
    }


    if (window.location.pathname.includes("index.html")) {
        const searchInput = document.getElementById("search");
        const categorySelect = document.getElementById("category");

        function filterComponents() {
            const selectedCategory = categorySelect.value.toLowerCase();
            const searchTerm = searchInput.value.toLowerCase();

            const carParts = getCarPartsFromLocalStorage();
            const filteredComponents = carParts.filter(component => {
                const categoryMatch = selectedCategory === "all" || component.category.toLowerCase() === selectedCategory;
                const searchMatch = component.name.toLowerCase().includes(searchTerm);
                return categoryMatch && searchMatch;
            });

            displayComponents(filteredComponents);
        }

        categorySelect.addEventListener("change", filterComponents);
        searchInput.addEventListener("input", filterComponents);

        const components = getCarPartsFromLocalStorage();
        displayComponents(components);

    }

    function clearCart() {
        localStorage.removeItem("shoppingCart");

        const deleteButton = componentDiv.querySelector(".delete-button");
        deleteButton.addEventListener("click", function () {
            addToCart(component.name, component.category, component.price, component.image);
            window.location.href = "cart.html";
        });
    }
});

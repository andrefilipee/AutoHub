document.addEventListener("DOMContentLoaded", function () {
    // Function to retrieve car parts data from Local Storage
    function getCarPartsFromLocalStorage() {
        const carPartsJSON = localStorage.getItem("carParts");
        return carPartsJSON ? JSON.parse(carPartsJSON) : [];
    }

    // Function to save car parts data to Local Storage
    function saveCarPartsToLocalStorage(carParts) {
        localStorage.setItem("carParts", JSON.stringify(carParts));
    }

    // Function to add a new car part to the dataset
    function addCarPart(name, category, price) {
        const carParts = getCarPartsFromLocalStorage();
        const newPart = { name, category, price };
        carParts.push(newPart);
        saveCarPartsToLocalStorage(carParts); // Update Local Storage
    }

    // Function to display components in the UI
    function displayComponents(components) {
        const componentsContainer = document.querySelector(".components");
        componentsContainer.innerHTML = "";

        components.forEach(component => {
            const componentDiv = document.createElement("div");
            componentDiv.classList.add("component");
            componentDiv.innerHTML = `
                <h2>${component.name}</h2>
                <p>Category: ${component.category}</p>
                <p>Price: ${component.price}</p>
                <button class="btn btn-danger">Comprar</button>
            `;
            componentsContainer.appendChild(componentDiv);
        });
    }

    const addPartForm = document.getElementById("addPartForm");
    if (addPartForm) {
        addPartForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const partName = document.getElementById("partName").value;
            const partCategory = document.getElementById("partCategory").value;
            const partPrice = document.getElementById("partPrice").value;

            addCarPart(partName, partCategory, partPrice);

            // Optionally, you can reset the form fields after adding a part
            addPartForm.reset();

            // Optionally, you can navigate back to the main page
            window.location.href = "main.html";
        });
    }

    // Code for the main page
    if (window.location.pathname.includes("main.html")) {
        const searchInput = document.getElementById("search");
        const categorySelect = document.getElementById("category");

        // Function to filter and display components
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

        // Event listeners for category select and search input
        categorySelect.addEventListener("change", filterComponents);
        searchInput.addEventListener("input", filterComponents);

        // Initial display of components
        const components = getCarPartsFromLocalStorage();
        displayComponents(components);
    }
});

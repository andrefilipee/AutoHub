document.addEventListener("DOMContentLoaded", function () {
    // Sample data for car components (you can replace this with your data)
    const components = [
        { name: "Engine Oil", category: "Engine" },
        { name: "Brake Pads", category: "Brakes" },
        { name: "Tire Pressure Sensor", category: "Tires" },
        // Add more components as needed
    ];

    const categorySelect = document.getElementById("category");
    const searchInput = document.getElementById("search");
    const componentsContainer = document.querySelector(".components");

    // Function to filter and display components
    function filterComponents() {
        const selectedCategory = categorySelect.value.toLowerCase();
        const searchTerm = searchInput.value.toLowerCase();

        const filteredComponents = components.filter(component => {
            const categoryMatch = selectedCategory === "all" || component.category.toLowerCase() === selectedCategory;
            const searchMatch = component.name.toLowerCase().includes(searchTerm);
            return categoryMatch && searchMatch;
        });

        displayComponents(filteredComponents);
    }

    // Function to display components in the UI
    function displayComponents(filteredComponents) {
        componentsContainer.innerHTML = "";
        filteredComponents.forEach(component => {
            const componentDiv = document.createElement("div");
            componentDiv.classList.add("component");
            componentDiv.innerHTML = `
                <h2>${component.name}</h2>
                <p>Category: ${component.category}</p>
            `;
            componentsContainer.appendChild(componentDiv);
        });
    }

    // Event listeners for category select and search input
    categorySelect.addEventListener("change", filterComponents);
    searchInput.addEventListener("input", filterComponents);

    // Initial display of components
    filterComponents();

    function addCarPart(name, category) {
        components.push({ name, category });
    }

    const addPartForm = document.getElementById("addPartForm");
    addPartForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const partName = document.getElementById("partName").value;
        const partCategory = document.getElementById("partCategory").value;

        addCarPart(partName, partCategory);

        // Optionally, you can reset the form fields after adding a part
        addPartForm.reset();
    });
});


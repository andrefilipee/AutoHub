// JavaScript code for handling registration form submission
document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // You can add more validation logic here if needed

    if (isValidEmail(email)) {
        // Check if the email already exists in Local Storage
        if (localStorage.getItem(email)) {
            alert('Email already registered. Please use a different email.');
        } else {
            // Create a user object and store it in Local Storage
            const user = { email, password };
            localStorage.setItem(email, JSON.stringify(user));
            alert('Registration successful!');
        }
    } else {
        alert('Please enter a valid email address.');
    }
});

// JavaScript code for handling login form submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Retrieve user information from Local Storage
    const storedUserJSON = localStorage.getItem(email);

    console.log("Entered email: " + email);
    console.log("Entered Password: " + password);

    if (storedUserJSON) {
        const storedUser = JSON.parse(storedUserJSON);
        console.log("Stored email: " + storedUser.email);
        console.log("Stored Password: " + storedUser.password);

        if (storedUser.password === password) {
            alert('Login successful! Redirecting...');
            // Redirect to a different page (e.g., dashboard) after successful login
            window.location.assign("https://www.w3schools.com")
        } else {
            alert('Invalid email or password.');
        }
    } else {
        alert('User not found. Please register first.');
    }
});


// Simple email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}




document.addEventListener('DOMContentLoaded', function () {
    const settingsForm = document.getElementById('settingsForm');

    if (settingsForm) {
        settingsForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;

            // Retrieve user email from sessionStorage
            const email = sessionStorage.getItem('currentUser');

            if (email) {
                const storedUserJSON = localStorage.getItem(email);

                if (storedUserJSON) {
                    const storedUser = JSON.parse(storedUserJSON);

                    if (storedUser.password === currentPassword) {
                        // Update the password and save the user object
                        storedUser.password = newPassword;
                        localStorage.setItem(email, JSON.stringify(storedUser));
                        alert('Password changed successfully!');
                    } else {
                        alert('Current password is incorrect.');
                    }
                } else {
                    alert('User not found. Please log in again.');
                    // Redirect to the login page if the user is not found
                    window.location.href = "login.html";
                }
            } else {
                alert('User not logged in. Please log in.');
                // Redirect to the login page if the user is not logged in
                window.location.href = "login.html";
            }
        });
    }
});





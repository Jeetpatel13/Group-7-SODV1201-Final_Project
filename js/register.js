/* 
  Gemini AI was used as a reference tool to format the asynchronous network parameters for database connectivity.
*/

document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registration-form');

    if (registrationForm) {
        registrationForm.addEventListener('submit', async function (event) {
            // 1. Stop the page from reloading automatically
            event.preventDefault();

            // 2. Gather the exact input values from your HTML form fields
            const userData = {
                firstName: document.getElementById('first-name')?.value.trim() || "",
                lastName: document.getElementById('last-name')?.value.trim() || "",
                email: document.getElementById('email')?.value.trim() || "",
                password: document.getElementById('password')?.value || "",
                phone: document.getElementById('phone')?.value.trim() || "",
                role: document.getElementById('role')?.value || "tenant"
            };

            try {
                // 3. Send the data directly to your running Node backend port
                const response = await fetch('http://localhost:3000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                });

                const result = await response.json();

                // 4. Handle the database response
                if (response.status === 201 || response.ok) {
                    alert("User registered successfully in the database!");
                    registrationForm.reset(); // Clears the form fields live
                } else {
                    alert("Registration failed: " + (result.message || result.error || "Check your data"));
                }
            } catch (error) {
                console.error("Database connection error:", error);
                alert("Could not connect to the database server. Make sure your backend terminal is running!");
            }
        });
    }
});

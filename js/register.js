/* Gemini AI was used  to verify the correct event parameters */

document.getElementById('registration-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevents the browser page from reloading automatically

    // Grab information from the form input boxes
    const userData = {
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        role: document.getElementById('role').value
    };

    // Send the user data payload directly to the backend server
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    const result = await response.json();
    
    // Shows a pop up text alert in the browser window confirming it worked
    alert(result.message); 
});

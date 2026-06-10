/* Gemini AI was used to verify the correct event parameters */

document.getElementById('registration-form').addEventListener('submit', function (event) {

    event.preventDefault();

    const userData = {
        id: generateId(),
        firstName: document.getElementById('first-name').value.trim(),
        lastName: document.getElementById('last-name').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
        phone: document.getElementById('phone').value.trim(),
        role: document.getElementById('role').value
    };

    let userExists = false;

    for (let i = 0; i < users.length; i++) {

        if (users[i].email === userData.email) {
            userExists = true;
            break;
        }
    }

    if (userExists) {
        alert("User already exists with this email.");
        return;
    }

    users.push(userData);

    alert("User registered successfully!");

    document.getElementById('registration-form').reset();
});
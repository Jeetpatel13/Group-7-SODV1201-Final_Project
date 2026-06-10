document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('passwordToggle');
    const errorAlert = document.getElementById('errorAlert');

    // Dynamic eye icon visibility toggler state handler
    passwordToggle.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggle.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
        } else {
            passwordInput.type = 'password';
            passwordToggle.innerHTML = '<i class="fa-regular fa-eye"></i>';
        }
    });

    // Interactive matching client credential submission handler
    loginForm.addEventListener('submit', (e) => {

        e.preventDefault();

        const emailValue = document.getElementById('email').value.trim();
        const passwordValue = passwordInput.value.trim();

        let foundUser = null;

        for (let i = 0; i < users.length; i++) {

            if (
                users[i].email === emailValue &&
                users[i].password === passwordValue
            ) {
                foundUser = users[i];
                break;
            }
        }

        if (foundUser) {

            sessionStorage.setItem(
                "currentUser",
                JSON.stringify(foundUser)
            );

            if (foundUser.role === "owner") {
                window.location.href = "my-properties.html";
            } else {
                window.location.href = "listings.html";
            }

        }
        else {

            // Keep container styling intact and show validation state
            errorAlert.style.display = "flex";
        }
    });
});
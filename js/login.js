document.addEventListener("DOMContentLoads", () => {

    const loginForm = document.getElementById('loginForm');

    const passwordInput = document.getElementById('password');

    const passwordToggle = document.getElementById('passwordToggle');

    const errorAlert = document.getElementById('errorAlert');
 
    // password show/hide

    passwordToggle.addEventListener('click', () => {

        if (passwordInput.type === 'password') {

            passwordInput.type = 'text';

            passwordToggle.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';

        } else {

            passwordInput.type = 'password';

            passwordToggle.innerHTML = '<i class="fa-regular fa-eye"></i>';

        }

    });
 
    loginForm.addEventListener('submit', (e) => {
 
        e.preventDefault();

        const emailValue = document.getElementById('email').value.trim();
        const passwordValue = passwordInput.value.trim();


        e.preventDefault();
 
        const emailValue = document.getElementById('email').value.trim();

        const passwordValue = passwordInput.value.trim();
 
        // find user in users array

        let foundUser = users.find(function(u) {

            return u.email === emailValue && u.password === passwordValue;

        });
 
        if (foundUser) {

            errorAlert.style.display = "none";

 
            // save to sessionStorage in correct format

            sessionStorage.setItem("currentUser", JSON.stringify(foundUser));
 
            // redirect based on role

            if (foundUser.role === "owner") {

                window.location.href = "my-properties.html";

            } else {

                window.location.href = "listings.html";

            }
 

            alert("Login Successful! Redirecting to your active listings...");

            localStorage.setItem("userLoggedIn", "true");
            localStorage.setItem("userRole", "Owner");

            window.location.href = "my-properties.html";

        } else {

            errorAlert.style.display = "flex";

        }

    });

});
 
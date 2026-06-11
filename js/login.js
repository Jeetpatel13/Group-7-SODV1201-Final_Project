
document.addEventListener("DOMContentLoads", () => {

document.addEventListener("DOMContentLoaded", () => {


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


            window.location.href = "my-properties.html";

        } else {


            // Keep container styling intact and show validation state

            errorAlert.style.display = "flex";

        }

    });

});
 
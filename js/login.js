document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('passwordToggle');
    const errorAlert = document.getElementById('errorAlert');

    // Password visibility input context switcher 
    passwordToggle.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordToggle.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
        } else {
            passwordInput.type = 'password';
            passwordToggle.innerHTML = '<i class="fa-regular fa-eye"></i>';
        }
    });

    // Core submission authentication event handler
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailValue = document.getElementById('email').value.trim();
        const passwordValue = passwordInput.value.trim();

        // Modern array check condition matching against active dataset arrays
        let foundUser = users.find(function (u) {
            return u.email === emailValue && u.password === passwordValue;
        });

        if (foundUser) {
            // Success State - Clear errors and write profile object locally
            errorAlert.style.display = "none";
            sessionStorage.setItem("currentUser", JSON.stringify(foundUser));

            // Trigger confirmation window prior to executing page state routing
            alert("Login Successful! Redirecting to your active listings...");

            // Safe contextual directory routing based on individual user role accounts
            if (foundUser.role === "owner") {
                window.location.href = "my-properties.html";
            } else {
                window.location.href = "listings.html";
            }
        } else {
            // Failure State - Keep container layout bounds and expose error card block
            errorAlert.style.display = "flex";
        }
    });

});




 /* 
   OFFICIAL DEVELOPMENT REFERENCES
   
   1. Event Listeners & DOM Lifecycle
      - MDN Web Docs: Document: DOMContentLoaded event
      - URL: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
   
   2. Array Search Architecture
      - MDN Web Docs: Array.prototype.find()
      - URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
   
   3. Session Client-Side Storage
      - MDN Web Docs: Window.sessionStorage
      - URL: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
   */
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

    loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailValue = document.getElementById('email').value.trim();
    const passwordValue = passwordInput.value.trim();

    try {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
            })
        });
            const response = await fetch("http://localhost:3000/api/login", {

        const data = await response.json();

        if (data.success) {

            errorAlert.style.display = "none";

            sessionStorage.setItem(
                "currentUser",
                JSON.stringify(data.user)
            );

            alert("Login Successful! Redirecting...");

            if (data.user.role === "owner") {
                window.location.href = "my-properties.html";
            } else {
                window.location.href = "listings.html";
            }

        } else {
            errorAlert.style.display = "flex";
        }

    } catch (error) {
        console.error("Login Error:", error);
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

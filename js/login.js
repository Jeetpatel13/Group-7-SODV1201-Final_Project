// Verification Logic Interactivity Script Engine
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

        // Check for Demo Mock State Credentials
        if (emailValue === "owner@workspace.com" && passwordValue === "password123") {
            errorAlert.style.display = "none";
            alert("Login Successful! Redirecting to your active listings...");
            
            localStorage.setItem("userLoggedIn", "true");
            localStorage.setItem("userRole", "Owner");
            
            window.location.href = "add-property.html";
        } else {
            // Keep container styling intact and show validation state
            errorAlert.style.display = "flex";
        }
    });
});
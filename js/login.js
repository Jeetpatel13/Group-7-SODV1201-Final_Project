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

            // ✅ save currentUser to localStorage
            localStorage.setItem("currentUser", JSON.stringify({
                id: 1,
                firstName: "John",
                lastName: "Owner",
                email: "owner@workspace.com",
                phone: "4031234567",
                role: "owner"
            }));

            window.location.href = "my-properties.html";
        }
        else {
            // Keep container styling intact and show validation state
            errorAlert.style.display = "flex";
        }
    });
});


const userMenu = document.getElementById("userMenu");
const dropdown = document.getElementById("userDropdown");

if (userMenu) {
    userMenu.addEventListener("click", (e) => {
        e.stopPropagation();

        dropdown.style.display =
            dropdown.style.display === "block"
                ? "none"
                : "block";
    });
}

document.addEventListener("click", () => {
    if (dropdown) {
        dropdown.style.display = "none";
    }
});




const loggedIn = true;

const registerLink = document.getElementById("registerLink");
const loginLink = document.getElementById("loginLink");

if (loggedIn) {
    if (registerLink) registerLink.style.display = "none";
    if (loginLink) loginLink.style.display = "none";

    if (userMenu) {
        userMenu.style.display = "flex";
    }
} else {
    if (userMenu) {
        userMenu.style.display = "none";
    }
}


const searchInput = document.getElementById("searchInput");

if (searchInput) {
    searchInput.addEventListener("keyup", function () {

        const searchText = this.value.toLowerCase();

        const propertyCards =
            document.querySelectorAll(".property-card");

        propertyCards.forEach(card => {

            const content =
                card.textContent.toLowerCase();

            if (content.includes(searchText)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });
}



const propertyDeleteButtons =
    document.querySelectorAll(".property-delete");

propertyDeleteButtons.forEach(button => {

    button.addEventListener("click", function () {

        const confirmDelete =
            confirm("Are you sure you want to delete this property?");

        if (confirmDelete) {

            const propertyCard =
                this.closest(".property-card");

            propertyCard.remove();

            alert("Property deleted successfully.");

        }

    });

});



const workspaceDeleteButtons =
    document.querySelectorAll(".workspace-delete");

workspaceDeleteButtons.forEach(button => {

    button.addEventListener("click", function () {

        const confirmDelete =
            confirm("Are you sure you want to delete this workspace?");

        if (confirmDelete) {

            const workspace =
                this.closest(".workspace");

            workspace.remove();

            alert("Workspace deleted successfully.");

        }

    });

});



const propertyEditButtons =
    document.querySelectorAll(".property-edit");

propertyEditButtons.forEach(button => {

    button.addEventListener("click", function () {

        alert("Edit Property Page will open here.");

        

    });

});



const workspaceEditButtons =
    document.querySelectorAll(".workspace-edit");

workspaceEditButtons.forEach(button => {

    button.addEventListener("click", function () {

        alert("Edit Workspace Page will open here.");

        

    });

});



const viewDetailsButtons =
    document.querySelectorAll(".view-details");

viewDetailsButtons.forEach(button => {

    button.addEventListener("click", function () {

        const workspaceName =
            this.closest(".workspace")
            .querySelector("h4")
            .innerText;

        alert(
            "Viewing details for: " +
            workspaceName
        );

       

    });

});
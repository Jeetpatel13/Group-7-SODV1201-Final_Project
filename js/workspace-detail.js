/**
 * Shared Workspace Project - Group 7
 * Workspace Details Controller
 */

$(document).ready(function () {
    // 1. Authenticate user context and update UI header elements
    checkLogin();

    // 2. Setup interactive UI event handlers
    $("#user-menu").click(function () {
        $("#dropdown").toggle();
    });

    // 3. Extract targeting parameters from active URL routing strings
    let params = new URLSearchParams(window.location.search);
    let workspaceId = parseInt(params.get("id"));

    // Guard Clause: If index parameter parameters do not exist, halt execution gracefully
    if (!workspaceId) {
        alert("Error: No workspace ID provided in the URL.");
        return;
    }

    // State structural variables
    let selectedWorkspace = null;
    let selectedProperty = null;
    let selectedOwner = null;

    // 4. Query Data Layer: Locate target Workspace object
    for (let i = 0; i < workspaces.length; i++) {
        if (workspaces[i].id === workspaceId) {
            selectedWorkspace = workspaces[i];
            break;
        }
    }

    if (selectedWorkspace === null) {
        alert("Workspace record not found.");
        return;
    }

    // 5. Query Data Layer: Locate relational Property object matching workspace parameters
    for (let i = 0; i < properties.length; i++) {
        if (properties[i].id === selectedWorkspace.propertyId) {
            selectedProperty = properties[i];
            break;
        }
    }

    if (selectedProperty === null) {
        alert("Property data mismatch: Linked property records missing.");
        return;
    }

    // 6. Query Data Layer: Locate Owner account profile inside active registered user datasets
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === selectedProperty.ownerId) {
            selectedOwner = users[i];
            break;
        }
    }

    // 7. View Engine Injection: Hydrate Workspace Details Card
    $("#workspaceType").text(selectedWorkspace.type);
    $("#capacity").text(selectedWorkspace.seating);
    $("#smoking").text(selectedWorkspace.smokingAllowed);
    $("#availability").text(selectedWorkspace.availabilityDate);
    $("#leaseTerm").text(selectedWorkspace.leaseTerm);
    $("#price").text(selectedWorkspace.price);

    // 8. View Engine Injection: Hydrate Property Details Card
    $("#address").text(selectedProperty.address);
    $("#neighborhood").text(selectedProperty.neighborhood);
    $("#squareFeet").text(selectedProperty.squareFeet + " sqft");
    $("#parking").text(selectedProperty.parking);
    $("#transit").text(selectedProperty.pTransit);

    // 9. View Engine Injection: Hydrate Owner Registration Contact Card
    if (selectedOwner !== null) {
        $("#owner").text(selectedOwner.firstName + " " + selectedOwner.lastName);
        $("#email").text(selectedOwner.email);
        $("#phone").text(selectedOwner.phone);
    } else {
        // Fallback interface presentation matching anonymous or unlinked administrative entries
        $("#owner").text("Unknown System Owner");
        $("#email").text("Contact Support");
        $("#phone").text("N/A");
    }
});

/**
 * Core Session Authentication Checker
 * Resolves local storage differences between state modules.
 */
function checkLogin() {
    // Merges checks across both storage states to prevent auth dropout errors
    const saved = sessionStorage.getItem('currentUser') || localStorage.getItem('currentUser');
    
    if (saved) {
        const currentUser = JSON.parse(saved);
        $("#ownerName").text(currentUser.firstName);
    } else {
        // Safe presentation interface fallback state
        $("#ownerName").text
    }
}
$(document).ready(function () {

    $("#user-menu").click(function () {
        $("#dropdown").toggle();
    });

    // Get workspace id from URL
    let params = new URLSearchParams(window.location.search);
    let workspaceId = parseInt(params.get("id"));

    let selectedWorkspace = null;
    let selectedProperty = null;
    let selectedOwner = null;

    // Find workspace
    for (let i = 0; i < workspaces.length; i++) {

        if (workspaces[i].id === workspaceId) {

            selectedWorkspace = workspaces[i];
            break;
        }
    }

    if (selectedWorkspace === null) {

        alert("Workspace not found.");
        return;
    }

    // Find property
    for (let i = 0; i < properties.length; i++) {

        if (properties[i].id === selectedWorkspace.propertyId) {

            selectedProperty = properties[i];
            break;
        }
    }

    if (selectedProperty === null) {

        alert("Property not found.");
        return;
    }

    // Find owner
    for (let i = 0; i < users.length; i++) {

        if (users[i].id === selectedProperty.ownerId) {

            selectedOwner = users[i];
            break;
        }
    }

    // Workspace Details
    $("#workspaceType").text(selectedWorkspace.type);
    $("#capacity").text(selectedWorkspace.seating);
    $("#smoking").text(selectedWorkspace.smokingAllowed);
    $("#availability").text(selectedWorkspace.availabilityDate);
    $("#leaseTerm").text(selectedWorkspace.leaseTerm);
    $("#price").text(selectedWorkspace.price);

    // Property Details
    $("#address").text(selectedProperty.address);
    $("#neighborhood").text(selectedProperty.neighborhood);
    $("#squareFeet").text(selectedProperty.squareFeet);
    $("#parking").text(selectedProperty.parking);
    $("#transit").text(selectedProperty.pTransit);

    // Owner Contact Information
    if (selectedOwner !== null) {

        $("#owner").text(
            selectedOwner.firstName + " " + selectedOwner.lastName
        );

        $("#email").text(selectedOwner.email);
        $("#phone").text(selectedOwner.phone);
    }

});
// test data 
// 1. first push test data into global arrays from data.js properties.push(     { id: 101, ownerId: 1, address: "123 Main St", neighborhood: "Downtown", squareFeet: 500, parking: "yes", pTransit: "no" },     { id: 102, ownerId: 1, address: "456 Oak Ave", neighborhood: "Uptown", squareFeet: 800, parking: "no", pTransit: "yes" } ); workspaces.push(     { id: 201, propertyId: 101, type: "Meeting Room", seating: 4, smokingAllowed: "no", availabilityDate: "2026-07-01", leaseTerm: "Month", price: 500 } ); // 2. set fake logged in user sessionStorage.setItem("currentUser", JSON.stringify({     id: 1,     firstName: "John",     role: "owner" }));


// var savedUser = sessionStorage.getItem('currentUser');
// var currentUser = JSON.parse(savedUser);

// Prevent errors if nobody is logged in
// if (!currentUser) {
//     window.location.href = "index.html";
// }

$(document).ready(function () {
    checkLogin();

    $("#ownerName").text(currentUser.firstName);

<<<<<<< Updated upstream
    $(".user-menu").click(function () {
        $(".dropdown").toggle();
    });

});

$(document).ready(function () {
=======
     $("#user-menu").click(function () {
        $("#dropdown").toggle();
    });

>>>>>>> Stashed changes

    // Populate properties owned by current user
    for (let i = 0; i < properties.length; i++) {

        if (properties[i].ownerId === currentUser.id) {

            $("#propertySelect").append(
                "<option value='" + properties[i].id + "'>" +
                properties[i].address +
                "</option>"
            );
        }
    }

    $("#addWorkspaceBtn").click(function () {

        var selectedPropId = $("#propertySelect").val();
        var typeInput = $("#workspaceType").val();
        var seatingInput = $("#seatingCapacity").val();
        var smokingInput = $("input[name='smoking']:checked").val();
        var dateInput = $("#availabilityDate").val();
        var leaseInput = $("#leaseTerm").val();
        var priceInput = $("#price").val();

        // Validation
        if (
            selectedPropId === null ||
            typeInput === null ||
            seatingInput === "" ||
            smokingInput === undefined ||
            dateInput === "" ||
            leaseInput === null ||
            priceInput === ""
        ) {

            $("#status").show();
            $("#statusMessage").text("Please fill out all the fields.");
            return;
        }

        if (parseInt(seatingInput) <= 0 || parseFloat(priceInput) < 0) {

            $("#status").show();
            $("#statusMessage").text("Please enter valid numbers.");
            return;
        }

        var newWorkspace = {
            id: Date.now(),
            propertyId: parseInt(selectedPropId),
            type: typeInput,
            seating: parseInt(seatingInput),
            smokingAllowed: smokingInput,
            availabilityDate: dateInput,
            leaseTerm: leaseInput,
            price: parseFloat(priceInput)
        };

        workspaces.push(newWorkspace);

        $("#status").show();
        $("#statusMessage").text(
            typeInput +
            " has been added successfully to property ID " +
            selectedPropId +
            "!"
        );

        // Reset form
        $("#propertySelect").prop("selectedIndex", 0);
        $("#workspaceType").prop("selectedIndex", 0);
        $("#leaseTerm").prop("selectedIndex", 0);

        $("#seatingCapacity").val("");
        $("input[name='smoking']").prop("checked", false);
        $("#availabilityDate").val("");
        $("#price").val("");
    });

});

function checkLogin() {

    const saved = localStorage.getItem('currentUser');

    if (!saved) {
        window.location.href = '../index.html';
        return;
    }

    currentUser = JSON.parse(saved);

    if (currentUser.role !== 'owner') {
        window.location.href = 'listings.html';
    }
}
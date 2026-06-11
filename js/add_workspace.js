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

    $(".user-menu").click(function () {
        $(".dropdown").toggle();
    });

});

$(document).ready(function () {

    $("#user-menu").click(function () {
        $("#dropdown").toggle();
    });


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

    $("#addWorkspaceBtn").click(addWorkspace);
})

function addWorkspace() {

    let selectedPropId = $("#propertySelect").val();
    let typeInput = $("#workspaceType").val();
    let seatingInput = $("#seatingCapacity").val();
    let smokingInput = $('input[name="smoking"]:checked').val();
    let dateInput = $("#availabilityDate").val();
    let leaseInput = $("#leaseTerm").val();
    let priceInput = $("#price").val();

    if (
        selectedPropId === "" || typeInput === "" || seatingInput === "" || !smokingInput || dateInput === "" || leaseInput === "" || priceInput === "") {
        $("#statusMessage").text("Please fill all the fields");
        $("#status").show();
        return;
    }
    else if (
        seatingInput <= 0 ||
        priceInput < 0
    ) {
        $("#statusMessage").text("Please enter valid values");
        $("#status").show();
        return;
    }

    let newWorkspace = {
        id: generateId(),
        propertyId: parseInt(selectedPropId),
        type: typeInput,
        seating: parseInt(seatingInput),
        smokingAllowed: smokingInput,
        availabilityDate: dateInput,
        leaseTerm: leaseInput,
        price: parseFloat(priceInput)
    };

    workspaces.push(newWorkspace);

    console.log(workspaces);

    $("#statusMessage").text(
        typeInput + " has been added successfully."
    );

    $("#propertySelect").prop("selectedIndex", 0);
    $("#workspaceType").prop("selectedIndex", 0);
    $("#leaseTerm").prop("selectedIndex", 0);
    $("#seatingCapacity").val("");
    $('input[name="smoking"]').prop("checked", false);
    $("#availabilityDate").val("");
    $("#price").val("");
}



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
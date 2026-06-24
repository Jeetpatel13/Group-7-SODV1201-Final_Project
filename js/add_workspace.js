// test data 
// 1. first push test data into global arrays from data.js properties.push(     { id: 101, ownerId: 1, address: "123 Main St", neighborhood: "Downtown", squareFeet: 500, parking: "yes", pTransit: "no" },     { id: 102, ownerId: 1, address: "456 Oak Ave", neighborhood: "Uptown", squareFeet: 800, parking: "no", pTransit: "yes" } ); workspaces.push(     { id: 201, propertyId: 101, type: "Meeting Room", seating: 4, smokingAllowed: "no", availabilityDate: "2026-07-01", leaseTerm: "Month", price: 500 } ); // 2. set fake logged in user sessionStorage.setItem("currentUser", JSON.stringify({     id: 1,     firstName: "John",     role: "owner" }));


// var savedUser = sessionStorage.getItem('currentUser');
// var currentUser = JSON.parse(savedUser);

// Prevent errors if nobody is logged in
// if (!currentUser) {
//     window.location.href = "index.html";
// }


let properties = [];
let currentUser = null;

$(document).ready(function () {
    checkLogin();

    $("#ownerName").text(currentUser.firstName);
    loadProperties();

    $(".user-menu").click(function () {
        $(".dropdown").toggle();
    });

});

$(document).ready(function () {

    $("#user-menu").click(function () {
        $("#dropdown").toggle();
    });
    $("#addWorkspaceBtn").click(addWorkspace);
});

function loadProperties() {
    fetch(
        "http://localhost:3000/properties?ownerId=" + currentUser.id
    )
        .then(res => res.json())
        .then(data => {
            properties = data;
            populatePropertyDropdown();
        })
        .catch(err => {
            console.error("Error loading properties:", err);
        });
}

function populatePropertyDropdown() {

    $("#propertySelect").empty();

    properties.forEach(property => {

        $("#propertySelect").append(
            `<option value="${property.id}">
                ${property.address}
            </option>`
        );
    });
}

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
        seatingInput <= 0 || priceInput < 0
    ) {
        $("#statusMessage").text("Please enter valid values");
        $("#status").show();
        return;
    }

   let newWorkspace = {
    propertyId: parseInt(selectedPropId),
    type: typeInput,
    seating: parseInt(seatingInput),
    smokingAllowed: smokingInput,
    availabilityDate: dateInput,
    leaseTerm: leaseInput,
    price: parseFloat(priceInput)
};

    fetch("http://localhost:3000/addWorkspace", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newWorkspace)
})
.then(response => response.json())
.then(data => {

    $("#statusMessage").text(
        typeInput + " has been added successfully."
    );

    $("#status").show();

    console.log(data);

    $("#propertySelect").prop("selectedIndex", 0);
    $("#workspaceType").prop("selectedIndex", 0);
    $("#leaseTerm").prop("selectedIndex", 0);
    $("#seatingCapacity").val("");
    $('input[name="smoking"]').prop("checked", false);
    $("#availabilityDate").val("");
    $("#price").val("");
})
.catch(error => {

    console.error(error);

    $("#statusMessage").text(
        "Error adding workspace."
    );

    $("#status").show();
});

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
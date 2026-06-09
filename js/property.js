// test data
// let currentUser = {
//     id: 1,
//     firstName: "Test Owner",
//     role: "owner"
// };

$(document).ready(async function () {

    checkLogin();

    $("#ownerName").text(currentUser.firstName);

    $(".user-menu").click(function () {
        $(".dropdown").toggleClass('show');
    });

    $('#addPropertyBtn').click(async function () {
        console.log("Button clicked");
        await addProperty();
    });

});

function checkLogin() {
    const saved = sessionStorage.getItem('currentUser');
    if (!saved) {
        window.location.href = 'login.html';
        return;
    }
    currentUser = JSON.parse(saved);
    if (currentUser.role !== 'owner') {
        window.location.href = 'listings.html';
    }
}

async function addProperty() {

    let address = $("#address").val();
    let neighborhood = $("#neighborhood").val();
    let squareFeet = $("#squareFeet").val();
    let parking = $('input[name="parking"]:checked').val();
    let transit = $('input[name="transit"]:checked').val();

    if (address === "" || neighborhood === "" || !parking || !transit) {
        $("#statusMessage").text("Please Fill all the Filds");
        return;
    }
    else if (squareFeet === "" || squareFeet <= 0) {
        $("#statusMessage").text("Please Enter valid Square Feet");
        return;
    }

    let saveProp = {
        id: generateId(),
        ownerId: currentUser.id,
        address,
        neighborhood,
        squareFeet: parseInt(squareFeet),
        parking: parking,
        pTransit: transit
    };

    properties.push(saveProp);

    $("#statusMessage").text("Property at " + address + " has been added.");

    $("#address").val("");
    $("#neighborhood").val("");
    $("#squareFeet").val("");

}

// console.log(window.properties);


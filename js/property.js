// Using jquery to make this page.
$(document).ready(async function () {

    checkLogin();

    $("#ownerName").text(currentUser.firstName);

    $("#user-menu").click(function () {
        $("#dropdown").toggle();
    });

    $('#addPropertyBtn').click(async function () {
        await addProperty();
    });

});

// Took help from Claude AI to write this function to check login of the user.
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


// Using async function, jQuery, and objects to take data from user and store it to properties array.
// Used class notes and code given by proffesor.
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
        address: address,
        neighborhood: neighborhood,
        squareFeet: parseInt(squareFeet),
        parking: parking,
        pTransit: transit
    };

    properties.push(saveProp);

    console.log(properties);
    console.log(typeof properties);

    $("#statusMessage").text("Property at has been added.");

    $("#address").val("");
    $("#neighborhood").val("");
    $("#squareFeet").val("");

}
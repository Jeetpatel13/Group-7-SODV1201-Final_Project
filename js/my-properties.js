
// Using jquery and JavaScript to make this page.
// Took help from W3Shcools and Google for some of the function for this page.

$(document).ready(function () {
    checkLogin();

    $("#ownerName").text(currentUser.firstName);

    $("#user-menu").click(function () {
        $("#dropdown").toggle();
    });

    loadPage();
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


// adding all the data to the page using for loop and jQuery. 
// Used class notes and code given by proffesor in term 1 and 2
function loadPage() {

    let myProperties = [];
    for (let i = 0; i < properties.length; i++) {
        if (properties[i].ownerId === currentUser.id) {
            myProperties.push(properties[i]);
        };
    };

    let myWorkspaces = [];
    for (let i = 0; i < workspaces.length; i++) {
        for (let j = 0; j < myProperties.length; j++) {
            if (workspaces[i].propertyId === myProperties[j].id) {
                myWorkspaces.push(workspaces[i]);

            };
        };
    };

    $("#numProperties").text(myProperties.length);
    $("#numWorkspace").text(myWorkspaces.length);
    $("#numListing").text(myWorkspaces.length);



    if (myWorkspaces.length > 0) {
        let earliest = new Date(myWorkspaces[0].availabilityDate);
        for (let i = 1; i < myWorkspaces.length; i++) {
            let date = new Date(myWorkspaces[i].availabilityDate);
            if (date < earliest) {
                earliest = date;
            }
        }
        $("#date").text(earliest.toLocaleDateString());
    }

    displayTable(myProperties);

}

// display all the properties in table format.
function displayTable(myProperties) {

    let data = document.getElementById("propertiesTable");
    data.innerHTML = "";

    if (myProperties.length === 0) {
        data.innerHTML = "No properties yet.";
        return;
    }

    myProperties.forEach(function (element) {

        let propertyWorkspaces = workspaces.filter(function (element1) {
            return element1.propertyId === element.id;
        });

        data.innerHTML +=
            "<tr>" +
            "<td>🏢 " + element.neighborhood + "</td>" +
            "<td>" + element.address + "</td>" +
            "<td>" + element.squareFeet + " sqft</td>" +
            "<td>" + propertyWorkspaces.length + "</td>" +
            "<td><span class='badge'>Active</span></td>" +
            "<td>" +
            "<button class='editBtn' ><a href='add-property.html'>✏️ Edit</a></button>" +
            "<button class='deleteBtn' onclick='deleteProperty(" + element.id + ")'>🗑️ Delete</button>" +
            "</td>" +
            "</tr>";
    });
}


function deleteProperty(id) {

    properties = properties.filter(function (element) {
        return element.id !== id;
    });

    workspaces = workspaces.filter(function (element) {
        return element.propertyId !== id;
    });

    $("#statusMessage").text("Property deleted successfully!");
    loadPage();
}

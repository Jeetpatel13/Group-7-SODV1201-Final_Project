//Local storage test data removed for phase-2
let users = [];
let properties = [];
let workspaces = [];
let currentUser = null;

// Generating random/Unique ID for each property
// Took help from W3Schools to make this random Id generate function.
function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}


// Took help from google to add test data for phase-1 

// let users = [
//     {
//         id: 1,
//         firstName: "John",
//         lastName: "Owner",
//         email: "owner@workspace.com",
//         password: "password123",
//         phone: "4031234567",
//         role: "owner"
//     },
//     {
//         id: 2,
//         firstName: "Jane",
//         lastName: "Coworker",
//         email: "coworker@workspace.com",
//         password: "password123",
//         phone: "4037654321",
//         role: "coworker"
//     }
// ];

// let properties = [
//     {
//         id: 101,
//         ownerId: 1,
//         address: "123 Main St",
//         neighborhood: "Downtown",
//         squareFeet: 500,
//         parking: "yes",
//         pTransit: "no"
//     },
//     {
//         id: 102,
//         ownerId: 1,
//         address: "456 Oak Ave",
//         neighborhood: "Uptown",
//         squareFeet: 800,
//         parking: "no",
//         pTransit: "yes"
//     }
// ];

// let workspaces = [
//     {
//         id: 201,
//         propertyId: 101,
//         type: "Meeting Room",
//         seating: 4,
//         smokingAllowed: "no",
//         availabilityDate: "2026-07-01",
//         leaseTerm: "Month",
//         price: 500
//     },
//     {
//         id: 202,
//         propertyId: 102,
//         type: "Private Office",
//         seating: 2,
//         smokingAllowed: "no",
//         availabilityDate: "2026-06-15",
//         leaseTerm: "Week",
//         price: 200
//     }
// ];
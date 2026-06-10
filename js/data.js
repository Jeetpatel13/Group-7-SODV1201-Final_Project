// Local data storage for Phase 1

let users = [];
let properties = [];
let workspaces = [];
let currentUser = null;

// Generating random/Unique ID for each property
// Took help from W3Schools to make this random Id generate function.
function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}
// Local data storage for Phase 1

let users = [];
let properties = [];
let workspaces = [];
let currentUser = null;

function generateId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

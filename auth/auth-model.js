const db = require("../database/dbConfig");

module.exports = {
  getUserByUsername,
  addUser
};

function getUserByUsername(username) {
    return db('users')
    .where({username})
    .first();
}

function addUser(user) {
    return db("users").insert(user);
}
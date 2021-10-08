const UserModel = require('../models/user')
const { apiUserName, apiSecretkey } = require('../config')

// Get all Users
function getUsers(req, res) {
  console.log('getting user')
}

// Create new user
function postUser(req, res) {
  console.log('create new user')
}

// Get specific user by Id
function getUser(req, res) {
  console.log('Get user by Id')
}

// Delete user by Id
function deleteUser(req, res) {
  console.log('Deleting User')
}

module.exports = { getUsers, postUser, getUser, deleteUser }

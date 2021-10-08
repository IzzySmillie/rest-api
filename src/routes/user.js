const UserModel = require('../models/user')
const { apiUserName, apiSecretkey } = require('../config')

// Get all Users
function getUsers(req, res) {
  const userQuery = UserModel.find({})

  userQuery.exec((err, users) => {
    if (err) {
      return res.status(400).send(err)
    }

    res.send(users)
  })
}

// Create new user
async function postUser(req, res) {
  const newuser = await new UserModel(req.body)
  // TODO hash password & validate email pre save
  newuser.save((err, user) => {
    if (err) {
      return res.status(400).send(err)
    } else {
      res.status(200).send({ message: 'User added successfully', user })
    }
  })
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

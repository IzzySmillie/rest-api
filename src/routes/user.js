const UserModel = require('../models/user')
const { apiUserName, apiSecretkey } = require('../config')

// Get all Users
function getUsers(req, res) {
  const userQuery = UserModel.find({})

  userQuery.exec((err, user) => {
    if (err) {
      return res.status(400).send(err)
    }

    res.status(200).send(user)
  })
}

// Create new user
async function postUser(req, res) {
  console.log(req.body)
  const newuser = await new UserModel(req.body)

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

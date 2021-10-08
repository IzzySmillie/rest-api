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
async function getUser(req, res) {
  const { id } = req.params

  try {
    const user = await UserModel.findById(id)
    res.status(200).send(user)
  } catch (err) {
    res.status(400).send(err)
  }
}

// Delete user by Id
async function deleteUser(req, res) {
  const { id } = req.params
  let auth = req.headers.authorization

  if (!auth) {
    return res.status(401).send({ message: 'Not Authorized' })
  }

  auth = auth.split(' ')[1]

  const buff = Buffer.from(auth, 'base64')
  const creds = buff.toString('utf-8')
  const username = creds.split(':')[0]
  const secretkey = creds.split(':')[1]

  if (username != apiUserName && secretkey != apiSecretkey) {
    return res.status(401).send({ message: 'Not Authorized' })
  }

  const user = await UserModel.findByIdAndDelete(id)
  res.status(200).send({ message: 'User deleted successfully', user })
}

module.exports = { getUsers, postUser, getUser, deleteUser }

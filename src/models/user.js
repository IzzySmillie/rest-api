const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: [validateEmail, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
})

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

function validateEmail(email) {
  // Regex from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const regexCheck =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  return regexCheck.test(String(email).toLowerCase())
}

module.exports = mongoose.model('User', UserSchema)

const mongoose = require('mongoose')
const { dbHost } = require('./config')
const UserModel = require('./models/user')

mongoose
  .connect(dbHost)
  .then(() => {
    console.log('MongoDB Connection Open')
  })
  .catch((err) => {
    console.log('Mongo Connection ERROR:', err)
  })

const seedUserDb = [
  {
    username: 'Fox Mulder',
    email: 'fox@mulder.com',
    password: 'aliens',
  },
  {
    username: 'Dana Scully',
    email: 'd@scully.com',
    password: 'mulder is mad',
  },
  {
    username: 'Smoking man',
    email: 'cigs@man.com',
    password: 'Trust no one',
  },
]

UserModel.insertMany(seedUserDb)
  .then((res) => {
    console.log(res)
  })
  .catch((e) => {
    console.log(e)
  })

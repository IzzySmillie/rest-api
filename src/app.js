const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { port, dbHost } = require('./config')
const userRoute = require('./routes/user')

mongoose
  .connect(dbHost)
  .then(() => {
    console.log('MongoDB Connection Open')
  })
  .catch((err) => {
    console.log('Mongo Connection ERROR:', err)
  })

app.use(express.urlencoded({ extended: true }))

app.route('/users').get(userRoute.getUsers).post(userRoute.postuser)
app.route('/user/:id').get(userRoute.getUser).delete(userRoute.deleteUser)

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

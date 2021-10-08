const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { port, dbHost } = require('./config')

mongoose
  .connect(dbHost)
  .then(() => {
    console.log('MongoDB Connection Open')
  })
  .catch((err) => {
    console.log('Mongo Connection ERROR:', err)
  })

app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(`Listening on ${port}`)
})

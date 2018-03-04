// require modules
const express = require('express')

// configure express
const app = express()

// send hello world when you visit the root of the app
app.get('/', (req, res) => {
  res.send('hello world')
})

// listen on port 3000
app.listen(3000)

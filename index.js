// require modules
const express = require('express')
const hbs = require('hbs')
// configure express
const app = express()

// tell express to use handlebars
app.set('view engine', 'hbs')

// send hello world when you visit the root of the app
const House = require('./models/House')
const Town = require('./models/Town')
app.get('/', (req, res) => {
  Town.find({}).then(town => {
    res.render('index', { town })
  })
})

// listen on port 3000
app.listen(3000)

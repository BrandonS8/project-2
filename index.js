// require modules
const express = require('express')
const hbs = require('hbs')

// require controller
const controller = require('./controllers/controller')
// configure express
const app = express()

// tell express to use handlebars
app.set('view engine', 'hbs')

app.use('/', controller)

// listen on port 3000
app.listen(3000)

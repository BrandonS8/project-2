// require modules
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser')

// require controller
const controller = require('./controllers/controller')
// configure express
const app = express()

// tell express to use handlebars
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
// use controller
app.use('/', controller)
// use bodyParser

// listen on port 3000 or heroku port
app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'))

// require modules
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

// require controller
const controller = require('./controllers/controller')
// configure express
const app = express()

// tell express to use handlebars
app.set('view engine', 'hbs')

// use bodyParser and methodOverride
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// css
app.use(express.static(__dirname + '/public'))

// use controller
app.use('/', controller)

// listen on port 3000 or heroku port
app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'))

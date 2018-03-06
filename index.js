// require modules
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

// require controllers
const usersController = require('./controllers/usercontroller')
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

// passport

app.use(session({ secret: 'A-REALLY-SECRET-SECRET' }))
app.use(flash())

require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

// app.use(function (req, res, next) {
//   res.locals.currentUser = req.user
//   next()
// })

// use controllers
app.use('/user', usersController)
app.use('/', controller)

// listen on port 3000 or heroku port
app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'))

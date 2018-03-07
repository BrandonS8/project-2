// require modules
const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
// const cookieParser = require('cookie-parser')
const passport = require('passport')

// require controllers
const controller = require('./controllers/controller')
const userController = require('./controllers/user')
// configure express
const app = express()

// tell express to use handlebars
app.set('view engine', 'hbs')

// css
app.use(express.static(__dirname + '/public'))

// use bodyParser, cookieParser and methodOverride
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// app.use(cookieParser())
app.use(flash())

// passport

app.use(
  session({
    secret: 'A-REALLY-SECRET-SECRET',
    saveUninitialized: true,
    resave: false
  })
)

require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(function(req, res, next) {
  res.locals.currentUser = req.user
  next()
})

app.get('/', (req, res) => {
  res.redirect('/towns')
})

// use controllers
app.use('/users', userController)
app.use('/towns', controller)

// listen on port 3000 or heroku port
app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'))

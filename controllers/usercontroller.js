var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var passport = require('passport')

// GET /user
router.get('/', (req, res) => {
  res.render('user/view')
})

// GET user/signup
router.get('/signup', (req, res) => {
  res.render('user/signup', { message: req.flash('signupMessage') })
})

// POST user/signup
router.post('/signup', (req, res) => {
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  })
  return signupStrategy(req, res)
})

// GET user/login
router.get('/login', (req, res) => {
  res.render('user/login', { message: req.flash('loginMessage') })
})

// POST user/login
router.post('/login', (req, res) => {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
  return loginProperty(req, res)
})

// GET user/logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router

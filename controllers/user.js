const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const passport = require('passport')
// -------USERS---------

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
    successRedirect: '/users',
    failureRedirect: '/users/signup',
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
    successRedirect: '/users',
    failureRedirect: '/users/login',
    failureFlash: true
  })
  return loginProperty(req, res)
})

// GET user/logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/towns')
})

module.exports = router

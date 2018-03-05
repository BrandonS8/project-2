const express = require('express')
const router = express.Router()
const House = require('../models/House')
const Town = require('../models/Town')
router.get('/', (req, res) => {
  Town.find({}).then(town => {
    res.render('index', { town })
  })
})

router.get('/houses', (req, res) => {
  House.find({}).then(town => {
    res.render('index', { town })
  })
})

module.exports = router

const express = require('express')
const router = express.Router()
const House = require('../models/House')
const Town = require('../models/Town')

// display all towns on homepage
router.get('/', (req, res) => {
  Town.find({}).then(town => {
    res.render('index', { town })
  })
})
// display houses of towns from /:id
router.get('/:id', (req, res) => {
  Town.findOne({ _id: req.params.id })
    .populate('houses')
    .then(town => {
      res.render('town/view', town)
    })
})

// display residents of houses
router.get('/:townid/:id', (req, res) => {
  Town.findOne({ _id: req.params.townid }).then(
    House.findOne({ _id: req.params.id }).then(house => {
      res.render('town/house/view', house)
    })
  )
})

router.get('/houses', (req, res) => {
  House.find({}).then(town => {
    res.render('index', { town })
  })
})

module.exports = router

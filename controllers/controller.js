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
// display new form
router.get('/:id/new', (req, res) => {
  Town.findOne({ _id: req.params.id }).then(town => {
    res.render('town/new', town)
  })
})

// accept post for new house
router.post('/:id', (req, res) => {
  let names = req.body.residents.split(',')
  console.log(names)
  Town.findOne({ _id: req.params.id }).then(town => {
    House.create({
      name: req.body.name,
      residents: names
    })
      .then(house => {
        town.houses.push(house)
      })
      .then(() => {
        town.save(err => console.log(err))
      })
      .then(house => {
        res.redirect(`/${req.params.id}`)
      })
  })
})

// display edit form
router.get('/:townid/:id/edit', (req, res) => {
  House.findOne({ _id: req.params.id }).then(house => {
    let townId = req.params.townid
    res.render('town/house/edit', { house, townId })
  })
})

// update house
router.put('/:townid/:id/edit', (req, res) => {
  let names = req.body.residents.split(',')
  House.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { name: req.body.name, residents: names } },
    { new: true }
  ).then(house => {
    res.redirect(`/${req.params.townid}/${req.params.id}`)
  })
})

// show single house and display residents of houses
router.get('/:townid/:id', (req, res) => {
  console.log(req.params)
  House.findOne({ _id: req.params.id }).then(house => {
    let townId = req.params.townid
    res.render('town/house/view', { house, townId })
  })
})

module.exports = router

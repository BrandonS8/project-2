const express = require('express')
const router = express.Router()
const House = require('../models/House')
const Town = require('../models/Town')
const randomIcon = require('../resources/houseApi.js')
const bcrypt = require('bcrypt-nodejs')
const adminKey = process.env.ADMIN_KEY
function hashKey (key) {
  return bcrypt.hashSync(key, bcrypt.genSaltSync(8))
}

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
  Town.findOne({ _id: req.params.id }).then(town => {
    House.create({
      name: req.body.name,
      residents: names,
      key: hashKey(req.body.key),
      image: randomIcon()
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
  House.findOne({ _id: req.params.id }).then(house => {
    if (house.checkKey(req.body.key)) {
      House.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { name: req.body.name, residents: names } },
        { new: true }
      ).then(house => {
        res.redirect(`/${req.params.townid}/${req.params.id}`)
      })
    } else {
      House.findOne({ _id: req.params.id }).then(house => {
        let townId = req.params.townid
        let message1 = 'WRONG PASSWORD. EDIT DENIED'
        res.render('town/house/edit', { house, townId, message1 })
      })
    }
  })
})

// delete house
router.delete('/:townid/:id/edit', (req, res) => {
  House.findOne({ _id: req.params.id }).then(house => {
    if (house.checkKey(req.body.key) || req.body.key === adminKey) {
      // the admin key is only there in case someone makes offensive house names or something until I get the passport setup
      Town.findOne({ _id: req.params.townid }).then(town => {
        town.houses.pull({ _id: req.params.id })
        town.save()
      })
      House.findOneAndRemove({ _id: req.params.id }).then(() => {
        res.redirect(`/${req.params.townid}`)
      })
    } else {
      House.findOne({ _id: req.params.id }).then(house => {
        let townId = req.params.townid
        let message2 = 'WRONG PASSWORD. DELETION DENIED'
        res.render('town/house/edit', { house, townId, message2 })
      })
    }
  })
})

// show single house and display residents of houses
router.get('/:townid/:id', (req, res) => {
  House.findOne({ _id: req.params.id }).then(house => {
    let townId = req.params.townid
    res.render('town/house/view', { house, townId })
  })
})

module.exports = router

// source for .pull method for deleting
// https://stackoverflow.com/questions/14763721/mongoose-delete-array-element-in-document-and-save

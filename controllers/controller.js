const express = require('express')
const router = express.Router()
const House = require('../models/House')
const Town = require('../models/Town')
const Resident = require('../models/Resident')

// import the randomIcon function from the api
const randomIcon = require('../resources/houseApi.js')
const randomCharIcon = require('../resources/characterApi.js')

const bcrypt = require('bcrypt-nodejs')
// used in place of an admin account because the internet can be an evil place, need to be able to delete houses
const adminKey = process.env.ADMIN_KEY

// hash function
function hashKey(key) {
  return bcrypt.hashSync(key, bcrypt.genSaltSync(8))
}

// display all towns on homepage
router.get('/', (req, res) => {
  Town.find({}).then(town => {
    res.render('index', { town })
  })
})
// display houses of towns from /:id
router.get('/:name', (req, res) => {
  Town.findOne({ name: req.params.name })
    .populate('houses')
    .then(town => {
      res.render('town/view', town)
    })
})
// display new form
router.get('/:name/new', (req, res) => {
  Town.findOne({ name: req.params.name }).then(town => {
    res.render('town/new', town)
  })
})

// show single house and display residents of houses
router.get('/:townname/:id', (req, res) => {
  House.findOne({ _id: req.params.id }).populate('residents').then(house => {
    let townName = req.params.townname
    res.render('town/house/view', { house, townName })
  })
})

// accept post for new house
router.post('/:name', (req, res) => {
  let names = req.body.residents.split(',')
  let residents = []
  let count = 0
  names.forEach(resident => {
    Resident.create({
      name: resident,
      image: randomCharIcon()
    }).then(resident => {
      residents.push(resident)
      count++
      if (count >= names.length) {
        makeHouse()
      }
    })
  })
  function makeHouse() {
    Town.findOne({ name: req.params.name }).then(town => {
      House.create({
        name: req.body.name,
        residents: residents,
        key: hashKey(req.body.key),
        image: randomIcon()
      }).then(house => {
        town.houses.push(house)
        console.log(house)
      })
        .then(() => {
          town.save(err => console.log(err))
        })
        .then(house => {
          res.redirect(`/${req.params.name}`)
        })
    })
  }
})

// display edit form
router.get('/:townname/:id/edit', (req, res) => {
  House.findOne({ _id: req.params.id }).populate('residents').then(house => {
    let townName = req.params.townname
    res.render('town/house/edit', { house, townName })
  })
})

// update house
router.put('/:townname/:id/edit', (req, res) => {
  let names = req.body.residents.split(',')
  let residents = []
  let count = 0
  House.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { name: req.body.name, residents: [] } },
    { new: true }
  ).then(() => {
    names.forEach(resident => {
      Resident.create({
        name: resident,
        image: randomCharIcon()
      }).then(resident => {
        residents.push(resident)
        count++
        if (count >= names.length) {
          makeHouse()
        }
      })
    })
  })

    // this part out of order, needs check key called earlier 
    // maybe house.find one > house > check key > run remove residents > then below
    .then(house => {
      if (house.checkKey(req.body.key)) {
        House.findOneAndUpdate(
          { _id: req.params.id },
          { $set: { name: req.body.name, residents: names } },
          { new: true }
        ).then(house => {
          res.redirect(`/${req.params.townname}/${req.params.id}`)
        })
      } else {
        House.findOne({ _id: req.params.id }).then(house => {
          let townName = req.params.townname
          let message1 = 'WRONG PASSWORD. EDIT DENIED'
          res.render('town/house/edit', { house, townName, message1 })
        })
      }
    })
})

// delete house
router.delete('/:townname/:id/edit', (req, res) => {
  House.findOne({ _id: req.params.id }).then(house => {
    if (house.checkKey(req.body.key) || req.body.key === adminKey) {
      // the admin key is only there in case someone makes offensive house names or something until I get the passport setup
      Town.findOne({ name: req.params.townname }).then(town => {
        town.houses.pull({ _id: req.params.id })
        town.save()
      })
      House.findOneAndRemove({ jd: req.params.id }).then(() => {
        res.redirect(`/${req.params.townname}`)
      })
    } else {
      House.findOne({ _id: req.params.id }).then(house => {
        let townName = req.params.townname
        let message2 = 'WRONG PASSWORD. DELETION DENIED'
        res.render('town/house/edit', { house, townName, message2 })
      })
    }
  })
})

module.exports = router

// source for .pull method for deleting
// https://stackoverflow.com/questions/14763721/mongoose-delete-array-element-in-document-and-save

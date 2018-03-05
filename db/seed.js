// require models
const House = require('../models/House')
const Town = require('../models/Town')
// remove all houses and add these
House.remove({}).then(() => {
  Promise.all([
    House.create({
      town: 'Washington DC',
      name: "Brandon's House",
      residents: ['Brandon']
    }),
    House.create({
      town: 'San Francisco',
      name: "Carl's House",
      residents: ['Carl', 'Bob', 'Jake', 'Christina']
    }),
    House.create({
      town: 'Los Angeles',
      name: "Miranda's House",
      residents: ['Miranda', 'Jack']
    })
  ]).then(() => {
    console.log('houses added')
  })
})

// remove all towns and add these
Town.remove({}).then(() => {
  Promise.all([
    Town.create({
      name: 'Washington DC'
    }),
    Town.create({
      name: 'San Francisco'
    }),
    Town.create({
      name: 'Los Angeles'
    })
  ]).then(() => {
    console.log('towns added')
  })
})

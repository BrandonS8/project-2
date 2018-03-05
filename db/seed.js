const House = require('../models/House')
const Town = require('../models/Town')

Town.remove({}).then(() => {
  House.remove({}).then(() => {
    Town.create({
      name: 'Washington DC'
    }).then(town => {
      Promise.all([
        House.create({
          name: 'Brandon House',
          residents: ['Brandon']
        }).then(house => {
          town.houses.push(house)
        }),
        House.create({
          name: 'Carl House',
          residents: ['Carl', 'Miranda']
        }).then(house => {
          town.houses.push(house)
        })
      ]).then(() => {
        town.save(err => console.log(err))
      })
    })
    Town.create({
      name: 'San Francisco'
    }).then(town => {
      Promise.all([
        House.create({
          name: 'Bob House',
          residents: ['Brandon']
        }).then(house => {
          town.houses.push(house)
        }),
        House.create({
          name: 'Cool House',
          residents: ['Carl', 'Miranda']
        }).then(house => {
          town.houses.push(house)
        })
      ]).then(() => {
        town.save(err => console.log(err))
      })
    })
  })
})

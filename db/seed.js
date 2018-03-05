const House = require('../models/House')
const Town = require('../models/Town')

Town.remove({}).then(() => {
  House.remove({}).then(() => {
    let dc = Town.create({
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
  })
})

const House = require('../models/House')
const Town = require('../models/Town')

Town.remove({}).then(() => {
  House.remove({}).then(() => {
    Town.create({
      name: 'Washington DC',
      image:
        'http://images.medicaldaily.com/sites/medicaldaily.com/files/styles/headline/public/2016/05/23/washington-dc.jpg'
    }).then(town => {
      Promise.all([
        House.create({
          name: `Brandon's House`,
          residents: ['Brandon'],
          key: 'French Fries',
          image: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1109545-200.png'
        }).then(house => {
          town.houses.push(house)
        }),
        House.create({
          name: `Carl's House`,
          residents: ['Carl', 'Miranda'],
          key: 'French Fries',
          image: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1109538-200.png'
        }).then(house => {
          town.houses.push(house)
        })
      ]).then(() => {
        town.save(err => console.log(err))
      })
    })
    Town.create({
      name: 'San Francisco',
      image:
        'https://cdn.vox-cdn.com/thumbor/RVhobHgNC4xy7NSqXvVs13OdJIk=/0x0:4000x4000/1200x800/filters:focal(1680x1680:2320x2320)/cdn.vox-cdn.com/uploads/chorus_image/image/55649931/IM_Photo5.0.jpg'
    }).then(town => {
      Promise.all([
        House.create({
          name: `Bob's House`,
          residents: ['Bob'],
          key: 'French Fries',
          image: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1109545-200.png'
        }).then(house => {
          town.houses.push(house)
        }),
        House.create({
          name: `Cool House`,
          residents: ['Carl', 'Miranda'],
          key: 'French Fries',
          image: 'https://d30y9cdsu7xlg0.cloudfront.net/png/1109538-200.png'
        }).then(house => {
          town.houses.push(house)
        })
      ]).then(() => {
        town.save(err => console.log(err))
      })
    })
  })
})

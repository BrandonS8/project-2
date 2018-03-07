const _ = require('lodash')

const NounProject = require('the-noun-project'),
  nounProject = new NounProject({
    key: process.env.TNP_API_KEY,
    secret: process.env.TNP_API_SECRET
  })

// nounProject.getUserUploads('icon.cheese', function(err, data) {
//   if (!err) {
//     console.log(data.uploads)
//   }
// })

// nounProject.getUserCollections('2793072', function (err, data) {
//   if (!err) {
//     console.log(data.collections)
//   }
// })
// icon.cheese's id 2793072
// collection id is 35084 for robot
let icons = []
nounProject.getCollectionIconsById('35084', function(err, data) {
  if (!err) {
    icons = data.icons
  }
})

function randomIcon() {
  let i = Math.floor(Math.random() * icons.length) + 0
  return icons[i].preview_url
  console.log(icons)
}

module.exports = randomIcon

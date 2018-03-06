const _ = require('lodash')

const NounProject = require('the-noun-project'),
  nounProject = new NounProject({
    key: '5d97eb902d464f1f89ee037609ffbd1e',
    secret: 'd6819d26b0b34ece9706432d318a0923'
  })

// nounProject.getUserCollections('849117', function(err, data) {
//   if (!err) {
//     console.log(data.collections)
//   }
// })
// tengwan's id 849117
// collection id is 35108 for buildings and 35110 for houses
let icons = []
nounProject.getCollectionIconsById('35110', function (err, data) {
  if (!err) {
    icons = data.icons
  }
})

function randomIcon () {
  let i = Math.floor(Math.random() * icons.length) + 0
  return icons[i].preview_url
}
// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript

module.exports = randomIcon

const _ = require('lodash')

const NounProject = require('the-noun-project'),
  nounProject = new NounProject({
    key: process.env.TNP_API_KEY,
    secret: process.env.TNP_API_SECRET
  })

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

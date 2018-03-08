// require mongoose
const mongoose = require('../db/connection')
// require bcrypt
const bcrypt = require('bcrypt-nodejs')

// make new mongoose.schema for house
const HouseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  residents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resident'
    }
  ],
  key: {
    type: String,
    required: true
  },
  image: String
})

HouseSchema.methods.checkKey = function (key) {
  return bcrypt.compareSync(key, this.key)
}

// set variable house to the house schema
const House = mongoose.model('House', HouseSchema)

// export the house variable
module.exports = House

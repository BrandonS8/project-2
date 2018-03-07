// require mongoose
const mongoose = require('../db/connection')

// make new mongoose.schema for house
const HouseSchema = new mongoose.Schema({
  name: String,
  residents: Array,
  key: String,
  image: String
})

// set variable house to the house schema
const House = mongoose.model('House', HouseSchema)

// export the house variable
module.exports = House

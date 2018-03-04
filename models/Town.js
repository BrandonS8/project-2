// require mongoose
const mongoose = require('../db/connection')

// make new mongoose.schema for town
const TownSchema = new mongoose.Schema({
  name: String,
  houses: Array
})

// set variable town to the town schema
const Town = mongoose.model('Town', TownSchema)

// export town variable
module.exports = Town

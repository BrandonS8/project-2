const mongoose = require('../db/connection')

const ResidentSchema = new mongoose.Schema({
  name: String,
  image: String
})

const Resident = mongoose.model('Resident', ResidentSchema)

module.exports = Resident

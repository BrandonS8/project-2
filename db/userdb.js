const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/townie_users')

mongoose.Promise = Promise

module.exports = mongoose

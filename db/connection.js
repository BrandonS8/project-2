// require mongoose
const mongoose = require('mongoose')

// connect to the database
mongoose.connect('mongodb://localhost/townie')

// use JS promises
mongoose.Promise = Promise

// export connected mongoose
module.exports = mongoose

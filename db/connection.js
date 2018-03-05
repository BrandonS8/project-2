// require mongoose
const mongoose = require('mongoose')

// connect to the database
if (process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MLAB_URL)
} else {
  mongoose.connect('mongodb://localhost/townie')
}

// use JS promises
mongoose.Promise = Promise

// export connected mongoose
module.exports = mongoose

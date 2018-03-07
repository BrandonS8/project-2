const mongoose = require('../db/userdb')
const bcrypt = require('bcrypt-nodejs')

const UserSchema = mongoose.Schema({
  local: {
    email: String,
    password: String,
    houses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House'
      }
    ]
  }
})

UserSchema.methods.encrypt = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password)
}
// set variable user to the user schema
const User = mongoose.model('User', UserSchema)

module.exports = User

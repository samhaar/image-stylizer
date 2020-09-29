/* eslint-disable */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: { type: String, required: true }
})

userSchema.pre('save', function (next) {
  bcrypt.hash(this.password, SALT_ROUNDS, (err, hash) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    this.password = hash;
    return next();
  });
});


module.exports = mongoose.model('User', userSchema);
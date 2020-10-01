const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageSchema = new Schema({
  userId: { type: String, required: true },
  size: { type: Number, required: true },
  src: { type: String, required: true },
});

module.exports = mongoose.model('Image', imageSchema);

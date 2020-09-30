const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageSchema = new Schema({
  size: { type: Number, required: true },
  imageDataUrl: { type: String, required: true },
});

module.exports = mongoose.model('Image', imageSchema);

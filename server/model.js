const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema({
    url: {
      type: String,
      required: true,
    },
    foamy: {
      type: Boolean,
      default: false,
    },
  });

const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo;
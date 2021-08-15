const mongoose = require("../db");

const ArtistSchema = new mongoose.Schema({
  imageURL: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    coordinates: {
      type: [Number],
      default: [0, 0]
    },
    address: {
      type: String,
      required: true
    }
  },
  name: {
    type: String,
    required: true
  },
  names: {
    type: [String],
    require: true
  }
},
{
  timestamps: true
});

ArtistSchema.set("toJSON", {
  transform: function(doc, returned, options) {
    returned.id = returned._id;
    delete returned._id;
  }
});

module.exports = mongoose.model("Artist", ArtistSchema);

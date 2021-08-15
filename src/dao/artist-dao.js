const mongoose = require("mongoose");

const ArtistModel = require("../models/Artist");
const Artist = mongoose.model("Artist");
mongoose.set('useFindAndModify', false);

exports.create = async data => {
  try {
    const artist = new Artist(data);
    return await artist.save();
  } catch (err) {
    throw err;
  }
};

exports.createInBatch = async artists => {
  try {
    //console.log("artistas para crear en bd",artists);
    await artists.map(async data => {
      const artist = new Artist(data);
      await artist.save();
    });
  } catch (err) {
    throw err;
  }
};

exports.readAll = async () => {
  try {
    return await Artist.find({});
  } catch (err) {
    throw err;
  }
};

exports.readBasedArtistsType = async artistsTypes => {
  try {
    const artistsFilteredByType = await Artist.find({
      type: {
        $in: artistsTypes
      }
    });

    return artistsFilteredByType.map(artist => ({
      ...artist._doc,
      id: artist._doc._id
    }));
  } catch (err) {
    throw err;
  }
};

exports.readById = async id => {
  try {
    return await Artist.findById(id);
  } catch (err) {
    throw err;
  }
};

exports.searchArtist = async name => {
  try {
    return await Artist.find({ "authors": { "$regex": name, "$options": "i" } },
    function(err,docs) { 
    });
  } catch (err) {
    throw err;
  }
};

exports.update = async (id, data) => {
  try {
    return await Artist.findByIdAndUpdate(id, { $set: data }, { new: true });
  } catch (err) {
    throw err;
  }
};

exports.delete = async id => {
  try {
    return await Artist.findByIdAndRemove(id);
  } catch (err) {
    throw err;
  }
};

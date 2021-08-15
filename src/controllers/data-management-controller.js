const debug = require("debug")("fonico-api:dishes-controller");

const ArtistDAO = require("../dao/artist-dao");

const artists = require("../json-models/artists");

exports.populate = async (req, res, next) => {
  try {
    await ArtistDAO.createInBatch(artists);

    return res.status(201).json({
      message: "Database Filled and Ready to Use!"
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: "Error when trying to Populate the Database."
    });
  }
};

const clearDataset = async daoInstance => {
  try {
    const dataset = await daoInstance.readAll();

    await dataset.map(async data => await daoInstance.delete(data.id));
  } catch (err) {
    throw err;
  }
};

exports.clear = async (req, res, next) => {
  try {
    await clearDataset(ArtistDAO);

    return res.status(201).json({
      message: "Database Cleared!"
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: "Error when trying to Clear the Database."
    });
  }
};

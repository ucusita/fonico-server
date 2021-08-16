const debug = require("debug")("fonico-api:artist-controller");
const mongoose = require("../db");
const ArtistDAO = require("../dao/artist-dao");
const Joi = require('joi');
const shuffleArray = require("../utils/shuffle-array");

const MAX_ARTISTS_HOME_SECTION = 20;

exports.create = async (req, res, next) => {
  const { body } = req;
  body.createdAt = new Date();
  //console.log(body);
  const artistSchema = Joi.object().keys({
    createdAt: Joi.date().required(),
    imageURL: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.object(),
    names: Joi.array()
  });
  const result = artistSchema.validate(body);
  const { value, error } = result;
  const valid = error == null;
  if (!valid) {
    res.status(422).json({
      message: 'Invalid request',
      data: body,
      error: result.error.details
    })
  } else {


    try {
      const { id } = await ArtistDAO.create(req.body);

      return res.status(201).json({
        message: "Artist Created with Success!",
        id
      });
    } catch (err) {
      debug(err);

      return res.status(500).send({
        message: "Error when trying to Create Artist."
      });
    }
  }
};

exports.createInBatch = async (req, res, next) => {
  try {
    await ArtistDAO.createInBatch(req.body);

    return res.status(201).json({
      message: "Artists Created with Success!"
    });
  } catch (err) {
    debug(err);

    return res.status(500).send({
      message: "Error when trying to Create Artists."
    });
  }
};

exports.readAll = async (req, res, next) => {
  try {
    console.log("reading All");
    const allArtists = await ArtistDAO.readAll();
    const shuffledArtistsArray = shuffleArray(allArtists);
    const artists = shuffledArtistsArray.slice(0, MAX_ARTISTS_HOME_SECTION);

    return res.status(200).json({
      artists
    });
  } catch (err) {
    debug(err);

    return res.status(500).send({
      message: "Error when trying to Read All Artists."
    });
  }
};

exports.readById = async (req, res, next) => {
  try {
    console.log("reading ById");
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        message: "The field id is required."
      });
    }

    const artist = await ArtistDAO.readById(id);

    if (!artist) {
      return res.status(404).json({
        message: "Artist Not Found"
      });
    }

    return res.status(200).json({
      artist
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: "Error when trying to Read Artist."
    });
  }
};

exports.readByName = async (req, res, next) => {
  //console.log(req);
  try {
    console.log("reading ByName");
    //const { name } = req.params;  //Esta porquería no anda
    const { name } = req.query;
    if (!name) {
      return res.status(400).json({
        message: "The field name is required."
      });
    }

    const artist = await ArtistDAO.searchArtist(name);
    //const artist = await ArtistDAO.searchArtist(name);

    if (!artist) {
      return res.status(404).json({
        message: "Artist Not Found"
      });
    }

    //const restaurant = await _getRandomRestaurant(artist.type);
    //const reviews = await _getRandomReviews(artist.reviews);

    return res.status(200).json({
      //restaurant,
      //reviews,
      artist
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: "Error when trying to Read Artist by Name."
    });
  }
};

exports.update = async (req, res, next) => {
  const { body } = req;
  body.createdAt = new Date();
  //console.log(body);
  const artistSchema = Joi.object().keys({
    createdAt: Joi.date().required(),
    imageURL: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.object(),
    names: Joi.array()
  });
  const result = artistSchema.validate(body);
  const { value, error } = result;
  const valid = error == null;
  if (!valid) {
    res.status(422).json({
      message: 'Invalid request',
      data: body,
      error: result.error.details
    })
  } else {

    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({
          message: "The field id is required."
        });
      }

      const artistUpdated = await ArtistDAO.update(id, { ...req.body });

      if (!artistUpdated) {
        return res.status(404).json({
          message: "Artist Not Found"
        });
      }

      return res.status(200).json({
        artistUpdated
      });
    } catch (err) {
      debug(err);

      return res.status(500).json({
        message: "Error when trying to Update Artist."
      });
    }
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        message: "The field id is required"
      });
    }

    const artistDeleted = await ArtistDAO.delete(id);

    if (!artistDeleted) {
      return res.status(404).json({
        message: "Artist Not Found"
      });
    }

    return res.status(200).json({
      message: "Artist Deleted with Success!"
    });
  } catch (err) {
    debug(err);

    return res.status(500).json({
      message: "Error when trying to Delete Artist."
    });
  }
};

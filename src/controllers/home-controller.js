const ArtistDAO = require("../dao/artist-dao");

const getUserLocation = require("../utils/get-user-location");
const shuffleArray = require("../utils/shuffle-array");

const MAX_ITEMS_PER_SECTION = 10;

const _getArtistsSectionsData = async () => {
  const artists = await ArtistDAO.readAll();
  const artistsShuffled = shuffleArray(artists);

  const popularArtistsShuffled = shuffleArray(artistsShuffled);
  console.log(popularArtistsShuffled);
  const popularArtists = popularArtistsShuffled.slice(0, MAX_ITEMS_PER_SECTION);
  console.log(popularArtists);
  return {
    popularArtists
  };
};

exports.getHomeData = async (req, res, next) => {
  const userLocation = getUserLocation();
  const { popularArtists } = await _getArtistsSectionsData();

  return res.status(200).json({
    popularArtists,
    userLocation
  });
};

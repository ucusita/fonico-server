const express = require("express");
const router = express.Router();

const ArtistController = require("../controllers/artist-controller");

router.post("/", ArtistController.create);
router.get('/id', ArtistController.readById);
router.get('/name', ArtistController.readByName);
router.get('/', ArtistController.readAll);
router.post("/batch", ArtistController.createInBatch);
router.patch("/", ArtistController.update);
router.delete("/", ArtistController.delete);

module.exports = router;

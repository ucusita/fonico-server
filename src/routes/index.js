const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  return res.status(200).send({
    message: "UIPY! The API FONICO is UP && RUNNING!"
  });
});

router.use("/data", require("./data-management"));
router.use("/home", require("./home"));

router.use("/artist", require("./artist"));
router.use("/artist/name", require("./artist"));
router.use("/artist/id", require("./artist"));

module.exports = router;

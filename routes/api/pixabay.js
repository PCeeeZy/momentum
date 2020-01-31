const router = require("express").Router();
const pixabayController = require("../../controllers/pixabayController");

// Matches with "/api/pixabays"
router.route("/")
  .get(pixabayController.getPictureRandom)

module.exports = router;

const path = require("path");
const router = require("express").Router();
const pixabayRoutes = require('./pixabay');

// Book routes
router.use("/pix", pixabayRoutes);

// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
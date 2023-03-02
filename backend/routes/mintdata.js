const express = require("express");
const mintController = require("../controller/mintDataController");
const router = express.Router();

router.get("/mintdata/:uid", mintController.getMintData);
router.post("/mintdata", mintController.setMintData);

module.exports = router;

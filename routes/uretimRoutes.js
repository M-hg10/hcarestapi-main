const express = require("express");
const router = express.Router();
const controller = require("../controllers/uretimController");

router.post("/", controller.createUretim);
router.get("/", controller.getAllUretim);
router.put("/:id", controller.updateUretim);
router.patch("/:id", controller.partialUpdateUretim);


module.exports = router;

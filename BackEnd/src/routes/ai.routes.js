const express = require('express');
const aiController = require("../controllers/ai.controller")

const router = express.Router();


router.post("/get-review", aiController.getReview)
router.post("/get-code", aiController.getCode)
router.post("/get-complexity", aiController.getComplexity)


module.exports = router;
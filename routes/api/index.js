const express = require("express");
const router = express.Router();

const boards = require("./boards");
const lists = require("./lists");
const cards = require("./cards");

router.use("/boards", boards);
router.use("/lists", lists);
router.use("/cards", cards);

module.exports = router;

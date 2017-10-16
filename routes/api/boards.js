const express = require("express");
const router = express.Router();
const { Board } = require("../../models");

router.post("/new", async (req, res) => {
	const newBoard = await Board.create({
		title: "Untitled Board",
		userId: req.body.userId
	});
	res.json(newBoard);
});

router.patch("/", async (req, res) => {
	await Board.update({ title: req.body.title }, { where: { id: req.body.id } });
	res.end();
});

router.delete("/", async (req, res) => {
	await Board.destroy({ where: { id: req.body.id } });
	res.end();
});

module.exports = router;

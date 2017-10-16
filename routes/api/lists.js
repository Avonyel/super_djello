const express = require("express");
const router = express.Router();
const { List, Card } = require("../../models");

router.post("/new", async (req, res) => {
	const newList = await List.create({
		title: "Untitled List",
		description: "Your description here",
		boardId: req.body.boardId,
		boardIndex: req.body.boardIndex
	});

	res.json(newList);
});

router.patch("/", async (req, res) => {
	const updateObj = {};
	updateObj[req.body.field] = req.body.data;

	await List.update(updateObj, {
		where: { id: req.body.id }
	});

	const updatedList = await List.findById(req.body.id, {
		include: [{ model: Card }],
		order: [[Card, "listIndex"]]
	});
	res.json(updatedList);
});

router.delete("/", async (req, res) => {
	await List.destroy({ where: { id: req.body.id } });
	res.end();
});

module.exports = router;

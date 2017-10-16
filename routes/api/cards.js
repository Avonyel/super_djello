const express = require("express");
const router = express.Router();
const { Card } = require("../../models");

router.post("/new", async (req, res) => {
	const newCard = await Card.create({
		title: "Untitled Card",
		description: "Your description here",
		listId: req.body.listId,
		listIndex: req.body.listIndex,
		completed: false
	});

	res.json(newCard);
});

router.post("/", async (req, res) => {
	await Card.update({ completed: true }, { where: { id: req.body.id } });
	res.end();
});

router.put("/", async (req, res) => {
	const updatedCard = await Card.update(
		{ title: req.body.data.title, description: req.body.data.description },
		{ where: { id: req.body.id }, returning: true }
	);

	res.json(updatedCard[1][0]);
});

router.delete("/", async (req, res) => {
	await Card.destroy({ where: { id: req.body.id } });
	res.end();
});

module.exports = router;

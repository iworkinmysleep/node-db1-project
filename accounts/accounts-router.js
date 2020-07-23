const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
	db("accounts")
		.then((accounts) => {
			res.status(200).json(accounts);
		})
		.catch((err) => console.log(err));
});

router.get("/:id", (req, res) => {
	const { id } = req.params;
	db("accounts")
		.where("id", id)
		.first()
		.then((account) => {
			res.status(200).json(account);
		})
		.catch((err) => console.log(err));
});

router.post("/", (req, res) => {
	const newAccount = req.body;
	db("accounts")
		.insert(newAccount)
		.then((id) => {
			res.status(200).json(id);
		})
		.catch((err) => console.log(err));
});

router.put("/:id", (req, res) => {
	const { id } = req.params;
	const changes = req.body;
	db("accounts")
		.where("id", id)
		.update(changes)
		.then((count) => {
			if (count > 0) {
				res.status(200).json(count);
			} else {
				res.status(404).json({ message: "account not found" });
			}
		})
		.catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
	const { id } = req.params;
	db("accounts")
		.where("id", id)
		.del()
		.then((count) => {
			if (count > 0) {
				res.status(200).json(count);
			} else {
				res.status(404).json({ message: "account not found" });
			}
		})
		.catch((err) => console.log(err));
});

module.exports = router;

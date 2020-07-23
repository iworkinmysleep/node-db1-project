const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
	res.status(200).json({ router: "test" });
});

module.exports = router;

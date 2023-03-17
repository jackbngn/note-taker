const notes = require("express").Router();

const { v4: uuid } = require("uuid");

const {
	readFromFile,
	readAndAppend,
	writeToFile,
} = require("../helper/fsutils");

notes.get("/", (req, res) => {
	readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.get("/:id", (req, res) => {
	const note_id = req.params.id;

	readFromFile("./db/db.json")
		.then((data) => JSON.parse(data))
		.then((json) => {
			const result = json.filter((text) => text.id === note_id);
			return result.length > 0
				? res.json(result)
				: res.json("No notes was found with that ID");
		});
});

notes.delete("/:id", (req, res) => {
	const note_id = req.params.id;
	readFromFile("./db/db.json")
		.then((data) => JSON.parse(data))
		.then((json) => {
			const result = json.filter((text) => text.id !== note_id);

			writeToFile("./db/db.json", result);

			res.json(`Note ${note_id} has been deleted`);
		});
});

notes.post("/", (req, res) => {
	console.log(req.body);

	const { title, text } = req.body;
	if (req.body) {
		const newNote = {
			title,
			text,
			id: uuid(),
		};

		readAndAppend(newNote, "./db/db.json");
		res.json(`Note was added!`);
	} else {
		res.error(`Error adding note`);
	}
});

module.exports = notes;

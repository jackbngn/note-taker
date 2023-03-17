const express = require("express");
const path = require("path");
const api = require("./routes/index.js");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/assets/pages/notes.html"));
});
//404 page route if url is enter incorrect
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/assets/pages/404.html"));
});

app.listen(PORT, () => {
	console.log("App listening at http://localhost:3001");
});

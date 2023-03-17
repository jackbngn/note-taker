//import node modules
const express = require("express");
const path = require("path");
// import router module for api
const api = require("./routes/index.js");

// Port for sever to listen on
const PORT = process.env.PORT || 3001;

//Variable for the express application
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middleware for api route
app.use("/api", api);
//Middleware for static file
app.use(express.static("public"));

//Route for homepage
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/index.html"));
});

//ROute for note page
app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "/public/assets/pages/notes.html"));
});
//404 page route if url is enter incorrect
app.get("*", (req, res) => {
	res.status(404);

	res.sendFile(path.join(__dirname, "/public/assets/pages/404.html"));
});

//Listen on specific port
app.listen(PORT, () => {
	console.log("App listening at http://localhost:3001");
});

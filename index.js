const express = require("express");
const app = express();
const path = require("path");
require("dotenv/config");
port = process.env.PORT || 8000;
//EXPRESS SPECIFIC
app.use("/static", express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//PUG SPECIFIC
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

const matchesRoute = require("./routes/matches");
app.use("/", matchesRoute);

//END POINTS
app.get("/", (req, res) => {});

app.listen(port, () => {});

const bodyParser = require("body-parser");
const homeRoutes = require("./routes/home");

const express = require("express");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use(homeRoutes);

app.set("view engine", "ejs");
app.set("views", "views");

app.listen(3000);
//compression can be added.

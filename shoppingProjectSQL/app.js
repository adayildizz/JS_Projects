const path = require("path");

//import http module to create a server
const http = require("http");

const adminData = require("./routes/admin");
const shopData = require("./routes/shop");
const errorConroller = require("./controllers/error");
//a third party library: Express.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
//the default value of "views" string or array is: process.cwd() + '/views'
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
//if we would want to serve the css files staticly:
app.use(express.static(path.join(__dirname, "public")));

app.use(adminData.routes);
app.use(shopData.routes);

app.use(errorConroller.get404Page);

app.listen(6000);

//imports
require("dotenv").config();
//database connection
require("./db/conn");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require('express-session')
const auth = require("./middleware/auth")
const admin = require("./routes/admin");
const product = require("./routes/product");
const category = require("./routes/category");
const user = require("./routes/user");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 5000;


app.use(express.json())
app.use(cookieParser())  //cookieParser middleware
//to get form data (remove undefined data)
app.use(express.urlencoded({ extended: false }))

//set template engine
app.set("view engine", "ejs");
app.use("/img",express.static("uploads"));
app.use(express.static(__dirname + "/public"));
// Use the session middleware
app.use(session({ secret: "my key", saveUninitialized: true, resave: false }));
app.use((req, res, next) => {
  (res.locals.message = req.session.message), delete req.session.message;
  next();
});

app.use(admin);

// app.use(admin);
app.use(auth,product);
app.use(auth,category);
app.use(auth,user);

app.get('/404', function(req, res) {
  res.render("404", {
    title: "404",
    page_name: "404",
    user: user,
    adminName: req.cookies.admin,
  });
});

// if page doesnot exit 
app.get('*', function(req, res) {
  res.redirect('/404');
});

app.listen(PORT, () => {
  console.log(`Backend Server Started at http://localhost:${PORT}`);
});

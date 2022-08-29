const express = require("express");
const bodyParser = require("body-parser");
const router = new express.Router();
const User = require("../models/user");
const Product = require("../models/products");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true });

//get all user
router.get("/user", (req, res) => {
  User.find()
    .sort("-_id")
    .exec((err, user) => {
      if (err) {
        res.json({ message: err.message, type: "danger" });
      } else {
        res.render("user/index", {
          title: "Users",
          page_name: "user",
          user: user,
          adminName: req.cookies.admin,
        });
      }
    });
});

//active user {POST}
router.get("/user/active/:id", urlencodedParser, async (req, res, next) => {
  let id = req.params.id;
  const user = User.findByIdAndUpdate(
    id,
    {
      status: 1,
    },
    (err, result) => {
      if (err) {
        // res.json({ message: err.message, type: "danger" });
        req.session.message = {
          type: "error",
          message: "Something Went Wrong !",
        };
        res.redirect("/user");
      } else {
        req.session.message = {
          type: "success",
          message: "user is now active !",
        };
        res.redirect("/user");
      }
    }
  );
});

//inactive user {POST}
router.get(
  "/user/inactive/:id",
  urlencodedParser,
  async (req, res, next) => {
    let id = req.params.id;
    const user = User.findByIdAndUpdate(
      id,
      {
        status: 0,
      },
      (err, result) => {
        if (err) {
          // res.json({ message: err.message, type: "danger" });
          req.session.message = {
            type: "error",
            message: "Something Went Wrong !",
          };
          res.redirect("/user");
        } else {
          
          req.session.message = {
            type: "success",
            message: "user is now In-active !",
          };
          res.redirect("/user");
        }
      }
    );
  }
);
module.exports = router;

import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");

const jwt = require('jsonwebtoken');
  

const handler = async (req, res) => {
  if (req.method == "POST") {
    let userdata = await User.findOne({ email: req.body.email, status:1 });
    // console.log(userdata);

    if (userdata) {
      const pass = userdata.password;
      const bytes = CryptoJS.AES.decrypt(pass, process.env.JWT_SECRET_KEY);
      var dpassword = bytes.toString(CryptoJS.enc.Utf8);

      // let dpassword = JSON.parse(privatekehy.toString(CryptoJS.enc.Utf8));

      if (req.body.email == userdata.email && req.body.password == dpassword) {

        var token =jwt.sign({email: userdata.email,
        name: userdata.name},process.env.JWT_SECRET);
        res
          .status(201)
          .json({success: "True",token,email:userdata.email});
      } else {
        res
          .status(400)
          .json({ success: "False", error: "Invalid Credentials" });
      }
    } else {
      res.status(400).json({ success: "False", error: "No User Found" });
    }
  } else {
    res.status(400).json({ error: "Invalid Method" });
  }
};

export default connectDb(handler);

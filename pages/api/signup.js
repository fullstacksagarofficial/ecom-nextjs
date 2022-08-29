import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
const handler = async (req, res) => {
  if (req.method == "POST") {

    try {
      const {firstname,lastname,email}=req.body
    let u = new User({firstname,lastname,email,password:CryptoJS.AES.encrypt(req.body.password, process.env.JWT_SECRET_KEY).toString()})
    await u.save()

    res.status(201).json({ success: "true" });
    } catch (error) {
    res.status(400).json({ success: "false" });
      
    }
    
  } else {
    res.status(400).json({ error: "Invalid Method" });
  }
};

export default connectDb(handler);

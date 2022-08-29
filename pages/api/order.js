import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
const handler = async (req, res) => {
  if (req.method == "POST") {

    try {
      const {name,email}=req.body
    let u = new Order({name,email,password:CryptoJS.AES.encrypt(req.body.password, 'secretkey123').toString()})
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

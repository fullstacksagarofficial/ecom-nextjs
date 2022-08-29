import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    let dbuser = await User.findOne({email:user.email})

    const bytes = CryptoJS.AES.decrypt(
      dbuser.password,
      process.env.JWT_SECRET_KEY
    );
    var decryptpassword = bytes.toString(CryptoJS.enc.Utf8);

    if (
      decryptpassword == req.body.password &&
      req.body.newpassword == req.body.confirmpassword
    ) {
      let dbuser = await User.findOneAndUpdate(
        { email: user.email },
        {
          password: CryptoJS.AES.encrypt(
            req.body.confirmpassword,
            process.env.JWT_SECRET_KEY
          ).toString(),
        }
      );
      res.status(200).json({ success: true });
      return
    } else {
      res.status(200).json({ success: false });
    }
  } else {
    res.status(400).json({ error: "error" });
  }
};

export default connectDb(handler);

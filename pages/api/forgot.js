import Forgot from "../../models/Forgot";
import User from "../../models/User";
export default function handler(req, res) {
  //check if user exist in DB

  //send an email
  if (req.body.sendmail) {
    let token = "jgvuygvyugyugyuhgyugyugy";

    let forgot = new Forgot({
      email: req.body.email,
      token: token,
    });
    let email = ` <a href='http://localhost:3000/forgot-password?token=${token}'>Click Here</a> `;

    res.status(200).json({ success: true });
  } else {
    // reset user password
  }
}

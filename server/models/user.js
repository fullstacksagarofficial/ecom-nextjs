const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, default:'' },
    pincode: { type: String, default:'' },
    phone: { type: String, default:'' },
    status: {
      type: Number,
      default:0
    },
    created: {
      type: Date,
      required: true,
      default: Date.now,
    },
});
mongoose.models = {}; //resolve error

const User = mongoose.model("user", UserSchema);
module.exports = User;

import mongoose from "mongoose";
const { Schema } = mongoose;
const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  img: { type: String, required: true },
  category: { type: String, required: true },
  color: { type: String },
  size: { type: String },
  price: { type: Number, required: true },
  availableQty: { type: Number, required: true },
  status: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

mongoose.models = {}; //resolve error

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;

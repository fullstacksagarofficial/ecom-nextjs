import mongoose from 'mongoose';
const { Schema } = mongoose;

const OrderSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    pincode: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    oid:{ type: String, required: true },
    paymentInfo:{ type: String, default:'' },
    product: {type:Object, required:true},
    amount: { type: Number, required: true },
    status: { type: String, default: 'Initiated', required: true },
    transactionID: { type: String, default:''},
    delieveryStatus: { type: String, default: 'unshipped', required: true },
}, { timestamps: true });


mongoose.models = {}  //resolve error
const Order = mongoose.model('order', OrderSchema);
module.exports = Order;
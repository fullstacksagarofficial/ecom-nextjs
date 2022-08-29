import mongoose from 'mongoose';
const { Schema } = mongoose;
const SubscriptionSchema = new mongoose.Schema({
    email: { type: String, trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
}, { timestamps: true });


mongoose.models={}  //resolve error

const Subscription = mongoose.model('subscription', SubscriptionSchema);
module.exports = Subscription;



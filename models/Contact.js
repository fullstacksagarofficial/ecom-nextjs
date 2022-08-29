import mongoose from 'mongoose';
const { Schema } = mongoose;
const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, trim: true,
        lowercase: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    message: { type: String, required: true},
    
}, { timestamps: true });


mongoose.models={}  //resolve error

const Contact = mongoose.model('contact', ContactSchema);
module.exports = Contact;



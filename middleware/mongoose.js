import mongoose from 'mongoose';

const connectDb = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        return handler(req, res)
    }
    // await mongoose.connect(process.env.MONGO_URI.toString())

    mongoose.connect("mongodb://localhost:27017/ecombackend", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connection Successfull");
    }).catch((e) => {
        console.log("No Connection");
    })



    return handler(req, res)
}

export default connectDb;
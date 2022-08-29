
import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"


const handler = async (req, res) => {

    if (req.method == 'POST') {
        for (let i = 0; i < req.body.length; i++) {
            let p = await Product.findByIdAndUpdate(req.body[i]._id,req.body[i])
        }
        res.status(201).json({ Success: "Success" })
    }
    else {
        res.status(400).json({ error: "Invalid Method" })
    }
}


export default connectDb(handler)

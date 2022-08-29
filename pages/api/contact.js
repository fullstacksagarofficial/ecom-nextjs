
import Contact from "../../models/Contact"
import connectDb from "../../middleware/mongoose"


const handler = async (req, res) => {

    if (req.method == 'POST') {
          try {
            let p = new Contact({
                name: req.body.contactName,
                email: req.body.contactEmail,
                message: req.body.contactMessage,
            })
            await p.save();
        res.status(201).json({ success: "True" })
            
          } catch (error) {
            res.status(400).json({ error: "False" })
            // console.log(error);
          }
    }
    else {
        res.status(400).json({ error: "False" })
    }
}


export default connectDb(handler)




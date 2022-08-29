
import Subscription from "../../models/Subscription"
import connectDb from "../../middleware/mongoose"


const handler = async (req, res) => {

    if (req.method == 'POST') {
       
          try {
            let p = new Subscription({
                email: req.body.subscriptionEmail,
            })
            await p.save();
        res.status(201).json({ success: "True" })
            
          } catch (error) {
            res.status(400).json({ error: "False" })
          }
    }
    else {
        res.status(400).json({ error: "False" })
    }
}


export default connectDb(handler)




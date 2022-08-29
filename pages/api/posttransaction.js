import Order from "../../models/Order";
import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  // validate paytm checksum

  // Update status into orders table after checking the transaction  status
  let order;
  if (req.body.STATUS == "TXN_SUCCESS") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Paid", paymentInfo: JSON.stringify(req.body), transactionID:req.body.TXNID }
    );
    let products = order.product;
    for (let slug in products) {
      await Product.findOneAndUpdate({slug:slug},{$inc:{"availableQty":- products[slug].qty}});
    }
  } else if (req.body.STATUS == "PENDING") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Pending", paymentInfo: JSON.stringify(req.body), transactionID:req.body.TXNID }
    );
    
  }

  res.redirect("/order?id=" + order._id);

  // initiate shipping

  // redirect user to the order confirmation page
};

export default connectDb(handler);

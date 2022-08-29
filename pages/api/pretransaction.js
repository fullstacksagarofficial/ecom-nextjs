import Order from "../../models/Order";
import Product from "../../models/Product";
import connectDb from "../../middleware/mongoose";
import pincodes from "../../pincodes.json";

const https = require("https");
/*
 * import checksum generation utility
 * You can get this utility from https://developer.paytm.com/docs/checksum/
 */
const PaytmChecksum = require("paytmchecksum");
const handler = async (req, res) => {
  if (req.method == "POST") {
    //check if pincode is serviceable
    if (!Object.keys(pincodes).includes(req.body.pincode)) {
      res.status(400).json({
        success: false,
        error: "Pincode not serviceable",
        cartclear: false,
      });
    }

    //check if cart is tampered with
    let product,
      sumtotal = 0;
    let cart = req.body.cart;

    if (req.body.subtotal <= 0) {
      res.status(400).json({
        success: false,
        error: "Your Cart is Empty ! Please built your cart and try again !",
        cartclear: false,
      });
      return;
    }

    for (let item in cart) {
      sumtotal += cart[item].price * cart[item].qty;
      product = await Product.findOne({ slug: item });
      //check if the cart items are out of stock
      if (product.availableQty < cart[item].qty) {
        res.status(400).json({
          success: false,
          error: "Some Items in your cart went out of stock ! Please try again",
          cartclear: true,
        });
        return;
      }
      if (product.price != cart[item].price) {
        res.status(400).json({
          success: false,
          error: "Price of item in your cart have changed. Please try again",
          cartclear: true,
        });
        return;
      }
    }
    if (sumtotal !== req.body.subtotal) {
      res.status(400).json({ error: true });
      return;
    }

    //check if the details are valid
    if (
      req.body.phone.length !== 10 ||
      !Number.isInteger(Number(req.body.phone))
    ) {
      res
        .status(400)
        .json({
          success: false,
          error: "Please enter 10 digit phone number",
          cartclear: false,
        });
      return;
    }
    if (req.body.pincode !== 6 || !Number.isInteger(Number(req.body.pincode))) {
      res
        .status(400)
        .json({
          success: false,
          error: "Please enter 6 digit Pin Code",
          cartclear: false,
        });
      return;
    }

    // initate an order corresponding to this order ID
    let order = new Order({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone,
      pincode: req.body.pincode,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      oid: req.body.oid,
      product: req.body.cart,
      amount: req.body.subtotal,
    });
    const a = await order.save();

    //insert the entry in the orders table with the status PENDING

    var paytmParams = {};

    paytmParams.body = {
      requestType: "Payment",
      mid: process.env.NEXT_PUBLIC_PAYTM_MID,
      websiteName: "YOUR_WEBSITE_NAME",
      orderId: req.body.oid,
      callbackUrl: `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
      txnAmount: {
        value: req.body.subtotal,
        currency: "INR",
      },
      userInfo: {
        custId: req.body.email,
      },
    };

    /*
     * Generate checksum by parameters we have in body
     * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys
     */
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MKEY
    );
    paytmParams.head = {
      signature: checksum,
    };

    var post_data = JSON.stringify(paytmParams);

    const requestAsync = async () => {
      return new Promise((resolve, rejects) => {
        var options = {
          /* for Staging */
          // hostname: "securegw-stage.paytm.in" /* for Production */,
          hostname: "securegw.paytm.in",

          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            // console.log("Response: ", response);
            let ress = JSON.parse(response).body;
            ress.success = true;
            ress.cartclear = false;
            resolve(ress);
          });
        });

        post_req.write(post_data);
        post_req.end();
      });
    };
    let myr = await requestAsync();
    res.status(200).json(myr);
  }
};
export default connectDb(handler);

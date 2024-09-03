import { dbConnect } from "@/database/database";
import Order from "@/database/model/Order";
import { env } from "@/lib/env/intex";
import { customErrorResponse } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: env.RAZORPAY_ID!,
  key_secret: env.RAZORPAY_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const { amount, userId, productId } = (await request.json()) as {
      amount: string;
      userId: string;
      productId: string;
    };

    const options = {
      amount: parseFloat(amount) * 100,
      currency: "INR",
      receipt: "rcp1",
    };
    const order = await razorpay.orders.create(options);

    await dbConnect();

    await Order.create({
      orderId: order.id,
      amount: amount,
      currency: "INR",
      userId,
      productId,
      paymentStatus: "pending",
    });

    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error("error", error);

    return customErrorResponse("Internal Server Error", 500);
  }
}

// const Razorpay = require('razorpay');
// const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

// const razorpayInstance = new Razorpay({
//     key_id: RAZORPAY_ID_KEY,
//     key_secret: RAZORPAY_SECRET_KEY
// });

// const renderProductPage = async(req,res)=>{

//     try {

//         res.render('product');

//     } catch (error) {
//         console.log(error.message);
//     }

// }

// const createOrder = async(req,res)=>{
//     try {
//         const amount = req.body.amount*100
//         const options = {
//             amount: amount,
//             currency: 'INR',
//             receipt: 'razorUser@gmail.com'
//         }

//         razorpayInstance.orders.create(options,
//             (err, order)=>{
//                 if(!err){
//                     res.status(200).send({
//                         success:true,
//                         msg:'Order Created',
//                         order_id:order.id,
//                         amount:amount,
//                         key_id:RAZORPAY_ID_KEY,
//                         product_name:req.body.name,
//                         description:req.body.description,
//                         contact:"8567345632",
//                         name: "Sandeep Sharma",
//                         email: "sandeep@gmail.com"
//                     });
//                 }
//                 else{
//                     res.status(400).send({success:false,msg:'Something went wrong!'});
//                 }
//             }
//         );

//     } catch (error) {
//         console.log(error.message);
//     }
// }

// module.exports = {
//     renderProductPage,
//     createOrder
// }

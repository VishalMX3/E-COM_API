require("dotenv").config();
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const cors = require("cors");

router.use(cors());

router.post("/payment", async (req, res) => {
  const { tokenId, amount } = req.body;

  try {
    // Create a payment method using the token
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        token: tokenId,
      },
    });

    // Create a payment intent using the created payment method
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
      payment_method: paymentMethod.id,
      confirm: true,
    });

    // If you need to capture the payment immediately, you can uncomment the following line
    // await stripe.paymentIntents.capture(paymentIntent.id);

    res.status(200).json({ success: true, paymentIntent });
  } catch (err) {
    console.error("Error processing payment:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: req.body.amount,
//     currency: "usd",
//     payment_method_types: ["card"],
//   });
//   res.json({ client_secret: paymentIntent.client_secret });

// stripe.charges.create(
//   {
//     payment_method_details: req.body.tokenId,
//     amount: req.body.amount,
//     currency: "inr",
//   },
//   (stripeErr, stripeRes) => {
//     if (stripeErr) {
//       console.log("entering stripe error");
//       console.log(stripeErr);
//       res.status(500).json(stripeErr);
//     } else {
//       res.status(200).json(stripeRes);
//       console.log("I'm froom stripreResponse");
//       console.log(stripeRes);
//     }
//   }
// );
// });

// module.exports = router;

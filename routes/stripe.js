require("dotenv").config();
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const cors = require("cors");

router.use(cors());

// router.get("/payment", (req, res) => {
//   res.send("Hi from payment page");
// });

router.post("/payment", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.json({ client_secret: paymentIntent.client_secret });

  // stripe.paymentIntents.create(
  //   {
  //     source: req.body.tokenId,
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
});

module.exports = router;

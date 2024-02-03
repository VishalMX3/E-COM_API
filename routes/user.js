const router = require("express").Router();

router.get("/usertest", (req, res) => {
  res.send("User Test is successful!");
});

router.post("/userposttest", (req, res) => {
  const userName = req.body.userName;
  res.send("Your user name is: " + userName);
});

module.exports = router;

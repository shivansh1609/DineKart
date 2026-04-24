const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

// Register
router.post("/register", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hash
  });

  res.json(user);
});

// Login
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.send("No user");

  const valid = await bcrypt.compare(req.body.password, user.password);

  if (!valid) return res.send("Wrong password");

  const token = jwt.sign({ id: user._id }, "secret");

  res.json({ token, id: user._id });
});

module.exports = router;
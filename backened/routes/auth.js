const express = require('express')

const User = require('../models/Users')
const { body, validationResult } = require('express-validator');

const router = express.Router();

router.post('/createuser', body('name').isLength({ min: 3 }), body('email').isEmail(), body('password').isLength({ min: 5 }), async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let user =await User.findOne({ email: req.body.email })
  
  if (user) {
    return res.status(400).json({ error: "the user already exists" })
  }
  user = await User.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  })

  res.json({ "Nice": "nice" });
})

module.exports = router
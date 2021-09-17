const express = require('express')

const User = require('../models/Users')
const { body, validationResult } = require('express-validator');

const router = express.Router();

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

var JWT_secret = 'shubham@123'
// ROUTE 1
router.post('/createuser',
  body('name').isLength({ min: 3 }), body('email').isEmail(), body('password').isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await User.findOne({ email: req.body.email })

    if (user) {
      return res.status(400).json({ error: "the user already exists" })
    }
    var salt = await bcrypt.genSaltSync(10);
    var secpass = await bcrypt.hashSync(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      password: secpass,
      email: req.body.email,
    })
    const data = {
      user: {
        id: user.id
      }
    }
    const jwtdata = jwt.sign(data, JWT_secret);
    res.json({ jwtdata })
  })
// ROUTE 2
router.post('/login',
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'password cant be blank').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ error: "Enter correct credential" })
      }
      let comparepassword = await bcrypt.compare(password, user.password)

      if (!comparepassword) {
        return res.status(400).json({ error: "Enter correct credential" })
      }

      const data = {
        user: {
          id: user.id
        }
      }
      const jwtdata = jwt.sign(data, JWT_secret);
      res.json({ jwtdata })

    } catch (error) {
      console.error(error.message)
      res.status(500).send("error occured");
    }
  })

//ROUTE 3
router.post('/getuser',fetchuser,
  async (req, res) => {
    try {
      const userid=req.user.id;
      const user=await User.findById(userid).select("-password")
      res.send(user)

    } catch (error) {
      console.error(error.message)
      res.status(500).send("internal error occured");
    }
  })
module.exports = router
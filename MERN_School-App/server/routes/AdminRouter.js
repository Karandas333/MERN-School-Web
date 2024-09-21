const express = require('express');
const router = express.Router();

const AdminModel = require('../models/AdminModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AdminAuth } = require('../middlewares/AdminAuth');




async function test(pass) {
  try {
    const salt = await bcrypt.genSalt(10);  // Await the salt generation
    const hash = await bcrypt.hash(pass, salt); // Await the password hashing

    await AdminModel.create({
      email: 'vaishnavkaran002@gmail.com',
      password: hash,
      isAdmin: true,
    });

    console.log('Admin created successfully!');
  } catch (err) {
    console.error('Error:', err); // Proper error handling
  }
}

// test('chrominofolrik');
router.post('/adminLogin', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  const Admin = await AdminModel.findOne({ email });
  
  if (!Admin) {
    res.status(404).send('Invalid User!');
  }

  const auth = await  bcrypt.compare(password, Admin.password);

  if(!auth) {
      res.send('Password Incorrect.')
  }
  const maxAge = 60 * 24 * 60 * 60; // 60 days in seconds
  const token =  await jwt.sign({ email, admin_id:Admin._id }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });

  res.cookie("jwt", token);
  res.status(200).send('Login Sucessfull');
})

router.get('/verify', AdminAuth, (req, res) => {
  if (!req.adminId) {
    res.status(201).send('Login First.');
  } else {
    res.status(200).send('Logged.');;
  }
})
router.post('/logout', AdminAuth, (req, res) => {
  res.clearCookie('jwt')
  res.status(200).send('Logged out.')
})

module.exports = router;
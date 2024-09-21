const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const AddmissionModel = require('../models/AddmissionModel');
const { AdminAuth } = require('../middlewares/AdminAuth');

// Replace with your email credentials
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other email services as well (e.g., Outlook, Yahoo)
  secure:true,
  auth: {
    user: process.env.EMAIL, // your email
    pass: process.env.PASSWORD, // your email password (or app-specific password)
  },
});

router.post('/submitAddmission', async (req, res) => {
  const admission = await AddmissionModel.create({
    data:req.body.data
  })

  res.status(200).send('Submited.')
})

router.get('/fetchAdmissions', async (req, res) => {
  const Admissions = await AddmissionModel.find();
  res.status(200).send(Admissions)
})

// Route to handle form submission
router.post('/sendEmail',AdminAuth, async (req, res) => {
  const { _id,student, email, action } = req.body;
  const name = "Governement Senior Secondary School Sardar Samand"
  let mailOptions = {}
  if (action === 'REJECTED') {
    mailOptions = {
      from: process.env.EMAIL,
      to: email, // The email address where the form data will be sent
      subject:`${name} Admission Request Rejected`,
      text: `Dear ${student},\n\nWe regret to inform you that your admission request has been rejected.`,
    };
    await AddmissionModel.findByIdAndDelete({_id})
    };
  if (action === 'ACCEPTED') {
    mailOptions = {
      from: process.env.EMAIL,
      to: email, // The email address where the form data will be sent
      subject:`${name} Admission Request Rejected`,
      text: `Dear ${student},\n\nWe glad to inform you that your admission request has been Accepted.\n\n
      
      Toll Number: 1800-96-96
      `,
    };
    await AddmissionModel.findByIdAndDelete({_id})
    };
  

  // Send the email
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'An error occurred while sending the email.' });
    }
  });
  const data = await AddmissionModel.find();
  res.status(200).send(data);
});

        // Contact us Router
router.post('/contactUs', (req, res) => {
  const { firstName, lastName, phoneNumber, email, message } = req.body;
  let mailOptions = {
      from: process.env.EMAIL,
      to: process.env.CONTACTUS_EMAIL, // The email address where the form data will be sent
      subject:`Form ContactUs ${firstName,lastName}`,
    text: `
    Contact Us : \n Phone Number: ${phoneNumber} \n Email: ${email} \n Message : \n${message}  `,
  };
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'An error occurred while sending the email.' });
    }
  });
  res.status(200).send('Sucess')
})


module.exports = router;
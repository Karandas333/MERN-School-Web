const express = require('express');
const router = express.Router();
const multer = require('multer')

const StaffModel = require('../models/StaffModel');
const { AdminAuth } = require('../middlewares/AdminAuth');

// Configure Multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/createStaff',AdminAuth, upload.single('uploadPhoto'), async (req, res) => {
  const newStaff = await StaffModel.create({
    image: req.file.buffer,
    fullName: req.body.fullName,
    subject: req.body.subject,
    post: req.body.post,
    joinDate: req.body.joinDate,
    dicsribesition: req.body.dicsribesition,
  });


  const StaffMembers = await StaffModel.find();

  let data = StaffMembers.map((Staff) => ({
    _id:Staff._id,
    image:Staff.image.toString('base64'),
    fullName: Staff.fullName,
    subject: Staff.subject,
    post:Staff.post,
    joinDate: `${Staff.joinDate.getDate()}-${Staff.joinDate.getMonth()}-${Staff.joinDate.getFullYear()}`,
    dicsribesition:Staff.dicsribesition,
  }))

  res.status(200).send(data);
})

router.get('/fetchStaffMembers', async (req, res) => {
  const StaffMembers = await StaffModel.find();

  let data = StaffMembers.map((Staff) => ({
    _id:Staff._id,
    image:Staff.image.toString('base64'),
    fullName: Staff.fullName,
    subject: Staff.subject,
    post:Staff.post,
    joinDate: `${Staff.joinDate.getDate()}-${Staff.joinDate.getMonth()}-${Staff.joinDate.getFullYear()}`,
    dicsribesition:Staff.dicsribesition,
  }))

  res.status(200).send(data);
})

router.get('/loadStaffMember', async (req, res) => {
  const StaffMember = await StaffModel.findById({_id:req.body._id});

  let data = {
    _id:StaffMember._id,
    image:StaffMember.image.toString('base64'),
    fullName: StaffMember.fullName,
    subject: StaffMember.subject,
    post:StaffMember.post,
    joinDate: `${StaffMember.joinDate.getDate()}-${StaffMember.joinDate.getMonth()}-${StaffMember.joinDate.getFullYear()}`,
    dicsribesition: StaffMember.dicsribesition,
    status:'edit'
  }

  res.status(200).send(data);
})

router.post('/editStaffMember',AdminAuth, upload.single('uploadPhoto'), async (req, res) => {
  const [day, month, year] = req.body.joinDate.split('-');
  const formattedDate = new Date(`${year}-${month}-${day}`);
  const StaffMember = await StaffModel.findByIdAndUpdate({ _id: req.body._id }, {
    image: req.file ? req.file.buffer : Buffer.from(req.body.image,'base64'),
    fullName: req.body.fullName,
    subject: req.body.subject,
    post:req.body.post,
    joinDate: formattedDate,
    dicsribesition: req.body.dicsribesition,
  });

  

  const StaffMembers = await StaffModel.find();

  let data = StaffMembers.map((Staff) => ({
    _id:Staff._id,
    image:Staff.image.toString('base64'),
    fullName: Staff.fullName,
    subject: Staff.subject,
    post:Staff.post,
    joinDate: `${Staff.joinDate.getDate()}-${Staff.joinDate.getMonth()}-${Staff.joinDate.getFullYear()}`,
    dicsribesition:Staff.dicsribesition,
  }))
  res.status(200).send(data);
})
router.post('/deleteStaffMember',AdminAuth, async (req, res) => {
  const StaffMember = await StaffModel.findByIdAndDelete({ _id: req.body._id });

  const StaffMembers = await StaffModel.find();

  let data = StaffMembers.map((Staff) => ({
    _id:Staff._id,
    image:Staff.image.toString('base64'),
    fullName: Staff.fullName,
    subject: Staff.subject,
    post:Staff.post,
    joinDate: `${Staff.joinDate.getDate()}-${Staff.joinDate.getMonth()}-${Staff.joinDate.getFullYear()}`,
    dicsribesition:Staff.dicsribesition,
  }))
  res.status(200).send(data);
})



module.exports = router;
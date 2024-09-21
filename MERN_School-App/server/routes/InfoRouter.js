const express = require('express');
const router = express.Router();
const multer  = require('multer');

// Configure Multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const InfoModel = require('../models/InfoModel');
const { AdminAuth } = require('../middlewares/AdminAuth');

// Route to handle image and data upload
router.post('/create-info',AdminAuth, upload.single('uploadImage'), async (req, res) => {
  try {
    // Create an entry in the database with the image buffer, heading, and content
    const info = await InfoModel.create({
      image: req.file.buffer,  // Use the buffer from the file
      heading: req.body.heading,
      content: req.body.content
    });

    // Send the created info as a response
    res.status(200).json(info);
  } catch (error) {
    console.error('Error creating info:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/get-info-data', async (req, res) => {
  const info = await InfoModel.find();

  let data = info.map((obj) => (
    {
      [obj.heading]: {
        info:obj.content,
        img:obj.image.toString('base64'),
      }
    }
  ))
  res.status(202).send(JSON.stringify(data))
})

module.exports = router;
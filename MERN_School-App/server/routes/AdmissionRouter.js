const express = require('express');
const router = express.Router();

const InputModel = require('../models/InputModel');
const { AdminAuth } = require('../middlewares/AdminAuth');

router.get('/fetchInputFields', async (req, res) => {
  try {
    const inputsArr = await InputModel.find();
    
    // Create an array of objects, with each object having a maximum of 2 key-value pairs
    let data = [];
    let tempObj = {};
    inputsArr.forEach((input, index) => {
      tempObj[input.text] = input.type;
      
      // When 2 values are added or it's the last item, push the object to the array
      if ((index + 1) % 2 === 0 || index === inputsArr.length - 1) {
        data.push(tempObj);
        tempObj = {}; // Reset tempObj for the next set
      }
    });

    res.status(200).send(data);
  } catch (error) {
    console.error('Error fetching input fields:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});


router.post('/createInputFields',AdminAuth, async (req, res) => {
  const newInputObj = await InputModel.create({
    text: req.body.text,
    type:req.body.type,
  });
  const inputsArr = await InputModel.find();
  let data = inputsArr.map((input) =>(
    {

      [input.text]: input.type
      
    }
  ))
  res.status(200).send(data)
})

router.post('/updateInputFields',AdminAuth, async (req, res) => {
  try {
    const updatedInput = await InputModel.findOneAndUpdate(
      { text: req.body.text },
      { text: req.body.text, type: req.body.type },
      { new: true }
    );
    
    if (!updatedInput) {
      return res.status(404).send({ message: 'Input field not found' });
    }

    const inputsArr = await InputModel.find();
    const data = inputsArr.map((input) => ({
      [input.text]: input.type,
    }));

    res.status(201).send(data);
  } catch (error) {
    console.error('Error updating input field:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

router.post('/deleteInputFields',AdminAuth, async (req, res) => {
  try {
    const deletedInput = await InputModel.findOneAndDelete(
      { text: req.body.text },
    );
    
    if (!deletedInput) {
      return res.status(404).send({ message: 'Input field not found' });
    }

    const inputsArr = await InputModel.find();
    const data = inputsArr.map((input) => ({
      [input.text]: input.type,
    }));

    res.status(201).send(data);
  } catch (error) {
    console.error('Error updating input field:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});



module.exports = router;
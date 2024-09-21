const { default: mongoose } = require("mongoose");

const InfoSchema = new mongoose.Schema({
  image: Buffer,
  heading: String,
  content: String,
})



module.exports = mongoose.model('InfoList', InfoSchema);
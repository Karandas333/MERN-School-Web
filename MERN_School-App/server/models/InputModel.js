const { default: mongoose } = require('mongoose')

const InputSchema = new mongoose.Schema({
  text: String,
  type: String,
})

module.exports = mongoose.model('InputFields',InputSchema)
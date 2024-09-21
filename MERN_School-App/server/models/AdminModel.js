const { default: mongoose } = require('mongoose');

const AdminSchame = new mongoose.Schema({
  email: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default:false,
  },
})

module.exports = mongoose.model('Admins',AdminSchame)
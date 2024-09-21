const { default: mongoose } = require('mongoose');

const StaffSchema = new mongoose.Schema({
  image:Buffer,
  fullName: String,
  subject: String,
  post:String,
  joinDate: {
    type: Date,
    default:Date.now(),
  },
  dicsribesition:String,
})

module.exports = mongoose.model('StaffMembers', StaffSchema);
const { default: mongoose } = require('mongoose');

const AddmissionSchema = new mongoose.Schema({
  data: Object,
});

module.exports = mongoose.model('Addmissions', AddmissionSchema);
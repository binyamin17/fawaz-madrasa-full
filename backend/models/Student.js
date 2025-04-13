const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  performance: String,
  files: [String]
});
module.exports = mongoose.model('Student', studentSchema);

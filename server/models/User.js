const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cluster: {
    name: { type: String, default: null },
  },
});

module.exports = mongoose.model('User', userSchema);

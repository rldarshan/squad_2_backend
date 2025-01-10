const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    address: { type: String, required: true },
    birthDate: { type: Date, required: true },
    bloodGroup: { type: String, required: true },
    consent: { type: Boolean, required: true },
    lastLoggedIn: {type: Date, default: Date.now},
});

const healthTipsSchema = new mongoose.Schema({
    age_group: {
      type: String,
      required: true,
    },
    data: [
      {
        title: {
          type: String,
          required: true,
        },
        tips: [
          {
            type: String,
            required: true,
          },
        ],
      },
    ],
  });

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Patient', patientSchema);
module.exports = mongoose.model('HealthTips', healthTipsSchema);

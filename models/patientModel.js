const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true },
    address: { type: String, required: true },
    consent: { type: Boolean, required: true },
    bloodGroup: { type: String, required: true },
    password: { type: String, required: true },
    birthDate: { type: Date, required: true },
    lastLoggedIn: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Patient', patientSchema);

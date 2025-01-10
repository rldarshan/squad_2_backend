const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number },
    address: { type: String },
    consent: { type: Boolean },
    bloodGroup: { type: String },
    password: { type: String, required: true },
    birthDate: { type: Date },  
    role: {type: String, required: true},
    lastLoggedIn: {type: Date, default: Date.now},
    creacreatedAt: {type: String }
});

module.exports = mongoose.model('Patients', patientSchema);



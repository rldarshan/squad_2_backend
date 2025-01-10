const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    phone: { type: Number, required: true },
    createdAt: { type: Date }
});

module.exports = mongoose.model('Doctor', doctorSchema);

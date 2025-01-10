const mongoose = require('mongoose');

// const appointmentSchema = new mongoose.Schema({
//     appointment_date: { type: String, required: true },
//     patientId: { type: Object, required: true },
//     reasonForVisit: { type: String, required: true },
//     timeSlot: { type: String },
//     note: { type: String },
//     doctorId: { type: Object, required: true },
//     createdAt: { type: Date }
// });

const appointmentSchema = new mongoose.Schema({
    appointment_date: { type: Date },
    patientId: { type: mongoose.Schema.Types.ObjectId },
    reasonForVisit: { type: String },
    timeSlot: { type: String },
    note: { type: String },
    doctorId: { type: mongoose.Schema.Types.ObjectId },
    createdAt: { type: Date }
});

module.exports = mongoose.model('Appointment', appointmentSchema);

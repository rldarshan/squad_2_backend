const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const Doctor = require('../models/doctorModel');
const Patient  = require('../models/patientModel');
const HealthTips  = require('../models/healthTipsModel');
const Appointment  = require('../models/appointmentModel'); 
const logger = require('../config/logger');

JWT_SECRET = process.env.JWT_SECRET || 'T35t@JWT#Secrete';

// Register a new user
const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        logger.info('User registered successfully', { email });
        res.status(201).send({message:'User registered successfully'});
    } catch (err) {
        logger.error('Error registering user:', err);
        res.status(400).send(err.message);
    }
};

// Login user
const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;
    try {
        // const patient = await Patient.findOne({ email });
        // let user = patient;
        // if (!patient) {
        //     const doctor = await Doctor.findOne({ email });
        //     user = doctor
        //     if (!doctor) return res.status(404).send('User not found');
        // }

        const user = await Patient.findOne({ email });
        if (!user) return res.status(404).send('User not found');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).send('Invalid password');

        const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        logger.info('User logged in successfully', { email });
        
        // Set the token in an HTTP-only cookie
        res.cookie('authToken', token, {
            httpOnly: true, // Prevent JavaScript access
            secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
            sameSite: 'strict', // Prevent CSRF
            maxAge: 3600000, // 1 hour
        }).send({ message: "Login successful", user_data: user });

        // res.header('Authorization', token).send({ message: "Login successful", "jwtToken": token });
    } catch (err) {
        logger.error('Error logging in user:', err);
        res.status(400).send(err.message);
    }
};

const logoutUser = async (req, res) => {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      res.status(200).json({ message: 'Logged out successfully' });
}

// CRUD Operations
const getAllPatients = async (req, res) => {
    try {
        logger.info('Fetching all patients');
        const users = await Patient.find();
        res.json(users);
    } catch (err) {
        logger.error('Error fetching patients:', err);
        res.status(500).send(err.message);
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await Patient.findById(req.params.id);
        if (!user) return res.status(404).send('User not found');

        res.json(user);
    } catch (err) {
        logger.error('Error fetching user:', err);
        res.status(500).send(err.message);
    }
};

const updateUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const user = await Patient.findById(req.params.id);
        if (!user) return res.status(404).send('User not found');

        const { name, email, password } = req.body;

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();
        logger.info('User updated successfully', { id: req.params.id });
        res.send('User updated successfully');
    } catch (err) {
        logger.error('Error updating user:', err);
        res.status(500).send(err.message);
    }
};

const getHealthTips = async (req, res) => {
    try {
        logger.info('Fetching all health tips');
        const healthTips = await HealthTips.find();
        res.json(healthTips);
    } catch (err) {
        logger.error('Error fetching health tips:', err);
        res.status(500).send(err.message);
    }
};

const getAppointments = async (req, res) => {
    try {
        logger.info('Fetching all appointments');
        const appointment = await Appointment.find();
        res.json(appointment);
    } catch (err) {
        logger.error('Error fetching appointments:', err);
        res.status(500).send(err.message);
    }
};

const bookAppointment = async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    console.log("bookAppointment == ", req.body);
    const { appointment_date, doctorId, reasonForVisit, patientId, timeSlot } = req.body;
    try {
        const appointment = new Appointment({ appointment_date, doctorId, reasonForVisit, patientId, timeSlot, createdAt: new Date() });
        await appointment.save();

        logger.info('Appointment booked successfully');
        res.status(201).send('Appointment booked successfully');
    } catch (err) {
        logger.error('Error booking appointment in user:', err);
        res.status(400).send(err.message);
    }
};

module.exports = { registerUser, loginUser, logoutUser, getAllPatients, getUserById, updateUser, getHealthTips, getAppointments, bookAppointment };

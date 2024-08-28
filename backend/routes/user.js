// routes/user.js
const express = require('express');
const { register } = require('../controllers/userController'); // Ensure the path is correct

const router = express.Router();

router.post('/register', register);

module.exports = router;
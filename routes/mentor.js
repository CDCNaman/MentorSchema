const express = require('express');
const {populateMentor, getAllMentors} = require('../controllers/mentorController'); 

const router = express.Router();

router.post('/populate', populateMentor);
router.get('/mentor', getAllMentors);


module.exports = router;
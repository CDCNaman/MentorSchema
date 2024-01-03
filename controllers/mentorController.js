const Mentor = require('../models/mentor'); // Adjust the path based on your project structure

// Controller to populate the 'Mentor' model with dynamic data received through a POST request
async function populateMentor(req, res){
    console.log(req.body);
  try {
    // Extract dynamic data from the request body
    const {
      name,
      about,
      sampleVideoLinks,
      description,
      socialMediaLinks,
      location,
      languagesKnown,
      categories,
      careerJourney,
    } = req.body;

    // Create a new mentor instance with the received data
    const newMentor = new Mentor({
      name,
      about,
      sampleVideoLinks,
      description,
      socialMediaLinks,
      location,
      languagesKnown,
      categories,
      careerJourney,
    });

    // Save the new mentor instance to the database
    await newMentor.save();

    res.status(201).json({ message: 'Mentor data populated successfully' });
  } catch (error) {
    console.error('Error populating mentor data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
// res.status(201).json({ message: 'Mentor data populated successfully' });
};

async function getAllMentors(req, res){
    try {
      // Retrieve all mentors from the database
      const mentors = await Mentor.find();
  
      res.status(200).json({ mentors });
    } catch (error) {
      console.error('Error fetching mentors:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = { populateMentor, getAllMentors};
const mongoose = require('mongoose');

const socialMediaSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  logoUrl: String, // Link to the social media logo
});

const languageKnownSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
  },
  
  LogoUrl: String, // Link to the language logo
});

const careerJourneySchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  startYear: {
    type: Number,
    required: true,
  },
  endYear: Number,
  responsibilities: String,
  LogoUrl: String, // Link to the company logo
});

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  sampleVideoLinks: [String],
  description: String,
  socialMediaLinks: [socialMediaSchema],
  location: {
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  languagesKnown: [languageKnownSchema],
  categories: {
    type: [String],
    enum: ['Technology', 'Spirituality', 'Business'],
    required: true,
  },
  careerJourney: [careerJourneySchema],
}, { timestamps: true });

// Middleware to automatically store logo URL before saving mentor instance.
mentorSchema.pre('save', async function (next) {
    
  // storing logo URL for social media links
  const socialMediaLinks = this.socialMediaLinks;
  for (const link of socialMediaLinks) {
    link.logoUrl = `https://logo.clearbit.com/${link.platform.toLowerCase()}.com`;
  }

  // storing logo URL for career journey companies
  const careerJourneys = this.careerJourney;
  for (const journey of careerJourneys) {
    journey.LogoUrl = `https://logo.clearbit.com/${journey.company.toLowerCase()}.com`;
  }

  // storing logo URL for known languages
  const languagesKnown = this.languagesKnown;
  for (const language of languagesKnown) {
    language.LogoUrl = `https://logo.clearbit.com/${language.language.toLowerCase()}.com`;
  }

  next();
});

const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;
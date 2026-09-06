/**
 * Seed script — populates the Projects collection.
 * Run once:  node seed.js
 * Requires MONGODB_URI in the environment (or a .env file).
 */
require('dotenv').config()
const mongoose = require('mongoose')
const Project  = require('./models/Project')

const projects = [
  {
    order: 1,
    title: 'JobSphere',
    description:
      'AI-powered job marketplace connecting freelancers and employers with role-based dashboards.',
    techStack: [
      'React', 'Node.js', 'Express', 'MongoDB',
      'Socket.io', 'Google Gemini API', 'JWT', 'Tailwind CSS',
    ],
    githubUrl: 'https://github.com/jaiswalpuza2/puja-chaudhary-jobsphere',
    liveUrl:   null,
    featured:  true,
  },
  {
    order: 2,
    title: 'Veda Salon',
    description:
      'Full-stack business website for a premium salon featuring services, gallery, reviews, contact info, and appointment booking.',
    techStack: ['Node.js', 'Express', 'HTML5', 'CSS3', 'JavaScript', 'JSON', 'Nodemailer'],
    githubUrl: 'https://github.com/jaiswalpuza2/VedaSalon',
    liveUrl:   null,
    featured:  true,
  },
  {
    order: 3,
    title: 'JournalSphere',
    description:
      'Secure desktop journaling application supporting daily journal management and mood tracking.',
    techStack: ['.NET MAUI', 'Blazor Hybrid', 'C#'],
    githubUrl: 'https://github.com/jaiswalpuza2/JournalSphere-PujaChaudhary',
    liveUrl:   null,
    featured:  false,
  },
  {
    order: 4,
    title: 'Fake News Detection',
    description:
      'Machine-learning solution to classify news articles as real or fake using Natural Language Processing.',
    techStack: ['Python', 'Pandas', 'Scikit-learn', 'NLP', 'TF-IDF', 'Jupyter Notebook'],
    githubUrl: 'https://github.com/jaiswalpuza2/FakeNewsDetection_PujaChaudhary',
    liveUrl:   null,
    featured:  false,
  },
  {
    order: 5,
    title: 'Kumari Cinemas',
    description:
      'Cinema management system built as an ASP.NET Web Forms application.',
    techStack: ['ASP.NET Web Forms', 'C#', 'Oracle Database', 'SQL', 'HTML5', 'CSS3'],
    githubUrl: 'https://github.com/jaiswalpuza2/KumariCinemas',
    liveUrl:   null,
    featured:  false,
  },
  {
    order: 6,
    title: 'E-Commerce Website',
    description:
      'Full e-commerce web application with DOM-driven interactivity.',
    techStack: ['HTML5', 'CSS3', 'JavaScript'],
    githubUrl: 'https://github.com/jaiswalpuza2/ecommerceWebsite',
    liveUrl:   null,
    featured:  false,
  },
]

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log('Connected to MongoDB')

    // Wipe existing projects
    await Project.deleteMany({})
    console.log('Cleared existing projects')

    const inserted = await Project.insertMany(projects)
    console.log(`✅  Inserted ${inserted.length} projects`)
  } catch (err) {
    console.error('Seed error:', err.message)
    process.exit(1)
  } finally {
    await mongoose.disconnect()
  }
}

seed()

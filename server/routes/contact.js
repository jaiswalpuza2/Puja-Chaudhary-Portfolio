const express  = require('express')
const { body } = require('express-validator')
const nodemailer = require('nodemailer')
const Contact  = require('../models/Contact')
const validate = require('../middleware/validate')

const router = express.Router()

// ── Nodemailer transporter (lazy-initialised) ─────────────
let transporter = null

function getTransporter() {
  if (transporter) return transporter
  transporter = nodemailer.createTransport({
    host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
    port:   parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
  return transporter
}

// ── Validation rules ──────────────────────────────────────
const contactRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 120 }).withMessage('Name must be ≤ 120 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 2000 }).withMessage('Message must be 10–2000 characters'),
]

// ── POST /api/contact ─────────────────────────────────────
router.post('/', contactRules, validate, async (req, res) => {
  const { name, email, message } = req.body

  // Persist to MongoDB
  try {
    const contact = await Contact.create({
      name,
      email,
      message,
      ipAddress: req.ip || null,
    })

    // Send notification email (non-blocking — failure doesn't fail the request)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      getTransporter()
        .sendMail({
          from:    `"Portfolio Contact" <${process.env.SMTP_USER}>`,
          to:      process.env.NOTIFY_TO || 'jaiswalpuza@gmail.com',
          replyTo: email,
          subject: `💬 New message from ${name}`,
          text:    `Name: ${name}\nEmail: ${email}\n\n${message}`,
          html: `
            <div style="font-family:sans-serif;max-width:600px">
              <h2 style="color:#c9a24a">New Portfolio Message</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <hr />
              <p style="white-space:pre-wrap">${message}</p>
              <hr />
              <small style="color:#888">Received: ${new Date().toUTCString()}</small>
            </div>
          `,
        })
        .catch(err => console.error('[Nodemailer]', err.message))
    }

    res.json({ success: true, id: contact._id })
  } catch (err) {
    console.error('[POST /api/contact]', err.message)
    res.status(500).json({ success: false, error: 'Failed to save message' })
  }
})

module.exports = router

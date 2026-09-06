const express = require('express')
const path    = require('path')
const fs      = require('fs')

const router = express.Router()

/**
 * GET /api/resume
 *
 * Strategy (in order):
 * 1. If RESUME_URL env var is set → redirect to it (CDN / cloud storage).
 * 2. Otherwise, look for /public/resume.pdf inside the server folder
 *    and stream it directly.
 */
router.get('/', (req, res) => {
  const externalUrl = process.env.RESUME_URL

  if (externalUrl) {
    return res.redirect(302, externalUrl)
  }

  // Fallback: serve static file
  const filePath = path.join(__dirname, '..', 'public', 'resume.pdf')
  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath, {
      headers: {
        'Content-Disposition': 'inline; filename="Puja_Chaudhary_Resume.pdf"',
        'Content-Type': 'application/pdf',
      },
    })
  }

  res.status(404).json({ success: false, error: 'Resume not available yet' })
})

module.exports = router

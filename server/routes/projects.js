const express = require('express')
const Project = require('../models/Project')

const router = express.Router()

/**
 * GET /api/projects
 * Returns all projects sorted by the `order` field.
 */
router.get('/', async (_req, res) => {
  try {
    const projects = await Project.find()
      .sort({ order: 1, createdAt: -1 })
      .select('-__v')
      .lean()

    res.json({ success: true, data: projects })
  } catch (err) {
    console.error('[GET /api/projects]', err.message)
    res.status(500).json({ success: false, error: 'Failed to fetch projects' })
  }
})

module.exports = router

require('dotenv').config()

const express  = require('express')
const cors     = require('cors')
const helmet   = require('helmet')
const morgan   = require('morgan')
const connectDB = require('./db')

const projectsRouter = require('./routes/projects')
const contactRouter  = require('./routes/contact')
const resumeRouter   = require('./routes/resume')

// ── Database ──────────────────────────────────────────────
connectDB()

// ── App ───────────────────────────────────────────────────
const app = express()

// Security headers
app.use(helmet())

// CORS — restrict to listed origins in production
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim())

app.use(
  cors({
    origin(origin, cb) {
      // Allow requests with no origin (curl, Postman, same-origin in prod)
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
      cb(new Error(`CORS blocked: ${origin}`))
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

// Body parsing
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// Request logging (only in development)
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

// ── Routes ────────────────────────────────────────────────
app.use('/api/projects', projectsRouter)
app.use('/api/contact',  contactRouter)
app.use('/api/resume',   resumeRouter)

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

// 404 catch-all
app.use((_req, res) => res.status(404).json({ error: 'Route not found' }))

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack)
  const status = err.status || 500
  res.status(status).json({ error: err.message || 'Internal server error' })
})

// ── Listen ────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT || '5000', 10)
app.listen(PORT, () => {
  console.log(`🚀  Server running on port ${PORT}`)
})

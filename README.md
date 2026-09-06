# Puja Chaudhary — Portfolio

Full-stack personal portfolio. **React + Vite + Tailwind CSS** frontend, **Node.js + Express + MongoDB** backend.

---

## Monorepo Structure

```
portfolio/
├── client/          # Frontend (React + Vite + Tailwind + Framer Motion)
├── server/          # Backend  (Node.js + Express + MongoDB)
├── myvideo.mp4      # Hero video source
└── README.md
```

---

## Quick Start (local development)

### Prerequisites
- Node.js ≥ 18
- A MongoDB Atlas cluster (or local MongoDB)
- An SMTP account for contact email notifications (e.g. Gmail App Password)

### 1 — Install dependencies

```bash
# From the repo root
cd client && npm install
cd ../server && npm install
```

### 2 — Configure environment variables

**Server**
```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI, SMTP credentials, etc.
```

**Client** (only needed when pointing at a deployed backend)
```bash
cd client
cp .env.example .env
# Set VITE_API_BASE_URL=https://your-backend-domain.com
# Leave blank to use the local dev proxy (localhost:5000)
```

### 3 — Seed the database

```bash
cd server
node seed.js
```

### 4 — Run both servers

Open two terminals:

```bash
# Terminal 1 — backend (http://localhost:5000)
cd server
npm run dev

# Terminal 2 — frontend (http://localhost:5173)
cd client
npm run dev
```

---

## Deployment

### Frontend → Hostinger shared hosting

```bash
cd client
npm run build
# Uploads the /dist folder contents to public_html/
```

Vite is configured with `base: './'` so all asset paths are relative — no
absolute-path issues on Hostinger subdirectories.

Set the `VITE_API_BASE_URL` environment variable (or a `.env` file) to your
deployed backend URL **before** running `npm run build`.

### Backend → Render / Railway / VPS

```bash
cd server
npm start   # reads PORT from environment
```

Set all variables from `server/.env.example` in your hosting dashboard.
CORS is pre-configured to read allowed origins from `ALLOWED_ORIGINS`
(comma-separated list of frontend domains).

---

## API Reference

| Method | Path            | Description                            |
|--------|-----------------|----------------------------------------|
| GET    | `/api/health`   | Health check — returns `{status:"ok"}` |
| GET    | `/api/projects` | Returns all projects from MongoDB      |
| POST   | `/api/contact`  | Saves contact form + sends email       |
| GET    | `/api/resume`   | Redirects to RESUME_URL or serves PDF  |

### POST `/api/contact` — request body

```json
{
  "name":    "Your Name",
  "email":   "you@example.com",
  "message": "Hello!"
}
```

### Responses

- `200 { success: true, id: "..." }` — message saved
- `422 { success: false, errors: [{field, message}] }` — validation failed
- `500 { success: false, error: "..." }` — server error

---

## Adding a Resume PDF

Place `resume.pdf` in `server/public/resume.pdf`, or set `RESUME_URL` in your
server `.env` to point at a hosted PDF (Google Drive direct link, S3, etc.).

---

## Adding a Profile Photo

Replace the placeholder in `About.jsx` by adding your photo to
`client/src/assets/photo.jpg` and updating the `<img>` tag:

```jsx
// In client/src/components/About.jsx
<img
  src="/assets/photo.jpg"
  alt="Puja Chaudhary"
  className="w-full h-full object-cover rounded-2xl"
/>
```

Or use an `<img src={photo} />` with a direct import:

```jsx
import photo from '../assets/photo.jpg'
```

---

## Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 18, Vite 5, Tailwind CSS 3, Framer Motion |
| Backend   | Node.js, Express 4, Mongoose 8                  |
| Database  | MongoDB Atlas                                   |
| Email     | Nodemailer (SMTP)                               |
| Hosting   | Hostinger (frontend) + Render/Railway (backend) |

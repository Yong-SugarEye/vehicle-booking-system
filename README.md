# Vehicle Booking System

A simple and mobile-friendly vehicle booking system with:
- Booking form (name, car, date, time, purpose)
- Manager approval/rejection
- Google Calendar event creation when approved
- Dashboard with available/booked/pending stats

## 1) Architecture Design

### High-level flow
1. User submits booking from the web form.
2. Server stores booking with `pending` status in a JSON file.
3. Manager reviews pending bookings in the same UI and approves/rejects.
4. If approved, server tries to create a Google Calendar event.
5. Dashboard updates counts in real-time after actions.

### Components
- **Frontend (Vanilla HTML/CSS/JS)**
  - `public/index.html`: UI layout
  - `public/styles.css`: mobile-friendly responsive styling
  - `public/app.js`: fetch API calls, form handling, manager actions
- **Backend (Node.js + Express)**
  - `server.js`: API routes and business logic
  - `lib/storage.js`: read/write booking data from JSON file
  - `lib/googleCalendar.js`: Google Calendar integration
- **Storage**
  - `data/bookings.json`: simple file-based storage

### API routes
- `GET /api/config` → fleet list
- `GET /api/bookings` → all bookings
- `POST /api/bookings` → create pending booking
- `PATCH /api/bookings/:id/status` → approve/reject booking
- `GET /api/dashboard` → available/booked/pending metrics

## 2) Project Structure

```bash
vehicle-booking-system/
├── data/
│   └── bookings.json
├── lib/
│   ├── googleCalendar.js
│   └── storage.js
├── public/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── server.js
```

## 3) Generated Files

All core files above are implemented.

## 4) Beginner-Friendly Run Guide (Step-by-step)

### Prerequisites
- Install **Node.js 18+** from: https://nodejs.org/

### Run locally
1. Open terminal in this project folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your environment file:
   ```bash
   cp .env.example .env
   ```
4. (Optional) Configure Google Calendar values in `.env`.
   - If you skip this, approvals still work, but calendar sync is skipped.
5. Start the app:
   ```bash
   npm run dev
   ```
6. Open your browser:
   - `http://localhost:3000`

### How to use
1. Fill the **New Booking** form and submit.
2. In **Manager Review**, click **Approve** or **Reject**.
3. If approved and Google is configured, a calendar link appears.
4. Dashboard cards show:
   - **Available today**
   - **Booked** (approved)
   - **Pending**

## Google Calendar Setup (optional)

1. Create a Google Cloud project.
2. Enable **Google Calendar API**.
3. Create a **Service Account** and download JSON key.
4. Create/select your Google Calendar and share it with the service account email.
5. Put these values in `.env`:
   - `GOOGLE_CALENDAR_ID`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `GOOGLE_PRIVATE_KEY` (with `\n` preserved)

## Notes
- This project is intentionally simple for learning/demo use.
- Data is stored in a local JSON file, not a production database.

require('dotenv').config();

const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readBookings, writeBookings } = require('./lib/storage');
const { createCalendarEvent } = require('./lib/googleCalendar');

const app = express();
const PORT = process.env.PORT || 3000;

const FLEET = ['Toyota Corolla', 'Honda Civic', 'Tesla Model 3'];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/config', (_, res) => {
  res.json({ fleet: FLEET });
});

app.get('/api/bookings', async (_, res) => {
  const bookings = await readBookings();
  res.json(bookings);
});

app.get('/api/dashboard', async (_, res) => {
  const bookings = await readBookings();
  const today = new Date().toISOString().slice(0, 10);

  const booked = bookings.filter((b) => b.status === 'approved').length;
  const pending = bookings.filter((b) => b.status === 'pending').length;
  const carsBookedToday = new Set(
    bookings
      .filter((b) => b.status === 'approved' && b.date === today)
      .map((b) => b.car)
  ).size;
  const available = Math.max(FLEET.length - carsBookedToday, 0);

  res.json({ available, booked, pending, fleetSize: FLEET.length });
});

app.post('/api/bookings', async (req, res) => {
  const { name, car, date, time, purpose } = req.body;

  if (!name || !car || !date || !time || !purpose) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  if (!FLEET.includes(car)) {
    return res.status(400).json({ error: 'Selected car is invalid.' });
  }

  const bookings = await readBookings();

  const booking = {
    id: uuidv4(),
    name,
    car,
    date,
    time,
    purpose,
    status: 'pending',
    createdAt: new Date().toISOString(),
    calendarEvent: null,
    managerNote: ''
  };

  bookings.push(booking);
  await writeBookings(bookings);

  return res.status(201).json(booking);
});

app.patch('/api/bookings/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status, managerNote } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Status must be approved or rejected.' });
  }

  const bookings = await readBookings();
  const target = bookings.find((booking) => booking.id === id);

  if (!target) {
    return res.status(404).json({ error: 'Booking not found.' });
  }

  target.status = status;
  target.managerNote = managerNote || '';

  if (status === 'approved') {
    try {
      target.calendarEvent = await createCalendarEvent(target);
    } catch (error) {
      target.calendarEvent = {
        synced: false,
        reason: `Calendar sync failed: ${error.message}`
      };
    }
  }

  await writeBookings(bookings);

  res.json(target);
});

app.listen(PORT, () => {
  console.log(`Vehicle booking system running at http://localhost:${PORT}`);
});

const fs = require('fs/promises');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'bookings.json');

async function readBookings() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function writeBookings(bookings) {
  await fs.writeFile(DATA_FILE, JSON.stringify(bookings, null, 2));
}

module.exports = {
  readBookings,
  writeBookings
};

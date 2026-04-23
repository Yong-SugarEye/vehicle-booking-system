const { google } = require('googleapis');

function getCalendarClient() {
  const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env;

  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    return null;
  }

  const auth = new google.auth.JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/calendar']
  });

  return google.calendar({ version: 'v3', auth });
}

async function createCalendarEvent(booking) {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const client = getCalendarClient();

  if (!calendarId || !client) {
    return {
      synced: false,
      reason: 'Google Calendar credentials are missing. Booking still approved locally.'
    };
  }

  const start = new Date(`${booking.date}T${booking.time}:00`);
  const end = new Date(start.getTime() + 60 * 60 * 1000);

  const event = {
    summary: `Vehicle Booking - ${booking.car}`,
    description: `Booked by ${booking.name}\nPurpose: ${booking.purpose}`,
    start: { dateTime: start.toISOString() },
    end: { dateTime: end.toISOString() }
  };

  const result = await client.events.insert({
    calendarId,
    requestBody: event
  });

  return {
    synced: true,
    eventId: result.data.id,
    htmlLink: result.data.htmlLink
  };
}

module.exports = {
  createCalendarEvent
};

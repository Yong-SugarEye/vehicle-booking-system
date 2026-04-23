const bookingForm = document.getElementById('bookingForm');
const bookingList = document.getElementById('bookingList');
const formMessage = document.getElementById('formMessage');
const carSelect = document.getElementById('carSelect');

async function loadConfig() {
  const response = await fetch('/api/config');
  const data = await response.json();

  carSelect.innerHTML = data.fleet
    .map((car) => `<option value="${car}">${car}</option>`)
    .join('');
}

async function loadDashboard() {
  const response = await fetch('/api/dashboard');
  const data = await response.json();

  document.getElementById('availableCount').textContent = data.available;
  document.getElementById('bookedCount').textContent = data.booked;
  document.getElementById('pendingCount').textContent = data.pending;
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function updateBookingStatus(id, status) {
  const managerNote = prompt('Optional manager note:') || '';

  const response = await fetch(`/api/bookings/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status, managerNote })
  });

  if (!response.ok) {
    alert('Failed to update booking status.');
    return;
  }

  await refreshData();
}

async function loadBookings() {
  const response = await fetch('/api/bookings');
  const bookings = await response.json();

  if (bookings.length === 0) {
    bookingList.innerHTML = '<p>No bookings yet.</p>';
    return;
  }

  bookingList.innerHTML = bookings
    .map((booking) => {
      const calendarText = booking.calendarEvent?.synced
        ? `<p class="small-note">Calendar event created: <a href="${booking.calendarEvent.htmlLink}" target="_blank" rel="noreferrer">Open</a></p>`
        : booking.status === 'approved' && booking.calendarEvent?.reason
          ? `<p class="small-note">Calendar sync note: ${escapeHtml(booking.calendarEvent.reason)}</p>`
          : '';

      const buttons =
        booking.status === 'pending'
          ? `<div class="action-row">
               <button onclick="updateBookingStatus('${booking.id}', 'approved')">Approve</button>
               <button class="reject" onclick="updateBookingStatus('${booking.id}', 'rejected')">Reject</button>
             </div>`
          : '';

      return `<article class="booking-item">
          <p><strong>${escapeHtml(booking.name)}</strong> booked <strong>${escapeHtml(booking.car)}</strong></p>
          <p class="booking-meta">${escapeHtml(booking.date)} at ${escapeHtml(booking.time)} • ${escapeHtml(booking.purpose)}</p>
          <p><span class="badge ${booking.status}">${booking.status}</span></p>
          ${booking.managerNote ? `<p class="small-note">Manager note: ${escapeHtml(booking.managerNote)}</p>` : ''}
          ${calendarText}
          ${buttons}
        </article>`;
    })
    .join('');
}

async function refreshData() {
  await Promise.all([loadDashboard(), loadBookings()]);
}

bookingForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(bookingForm);
  const payload = Object.fromEntries(formData.entries());

  const response = await fetch('/api/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const error = await response.json();
    formMessage.textContent = error.error || 'Failed to create booking.';
    formMessage.style.color = '#d93025';
    return;
  }

  bookingForm.reset();
  formMessage.textContent = 'Booking submitted and waiting for manager review.';
  formMessage.style.color = '#0f8a3f';

  await refreshData();
});

async function init() {
  await loadConfig();
  await refreshData();
}

init();

window.updateBookingStatus = updateBookingStatus;

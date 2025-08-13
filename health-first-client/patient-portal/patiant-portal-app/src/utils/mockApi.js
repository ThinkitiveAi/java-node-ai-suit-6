const STORAGE_KEY = 'ehr_mock_db_v1';

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}
function save(db) { localStorage.setItem(STORAGE_KEY, JSON.stringify(db)); }

export async function getProviders() {
  const db = load();
  return db.providers || [];
}

export async function setAvailability(providerId, slots) {
  const db = load();
  db.availability = db.availability || {};
  db.availability[providerId] = slots;
  save(db);
  return true;
}

export async function getAvailability(providerId) {
  const db = load();
  return (db.availability && db.availability[providerId]) || [];
}

export async function createAppointment(appt) {
  const db = load();
  db.appointments = db.appointments || [];
  db.appointments.push({ id: Date.now().toString(), ...appt });
  save(db);
  return true;
}

export async function listAppointments(filters = {}) {
  const db = load();
  let list = db.appointments || [];
  if (filters.providerId) list = list.filter(a => a.providerId === filters.providerId);
  if (filters.status) list = list.filter(a => a.status === filters.status);
  return list;
} 
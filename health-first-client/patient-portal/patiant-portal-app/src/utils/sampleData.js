export const providers = [
  { id: 'p1', name: 'Jacob Jones', specialty: 'Cardiology', avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=80&auto=format&fit=crop&crop=faces' },
  { id: 'p2', name: 'Bessie Cooper', specialty: 'Dermatology', avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=80&auto=format&fit=crop&crop=faces' },
  { id: 'p3', name: 'Wade Warren', specialty: 'Neurology', avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=80&auto=format&fit=crop&crop=faces' },
  { id: 'p4', name: 'Darrell Steward', specialty: 'Pediatrics', avatar: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?q=80&w=80&auto=format&fit=crop&crop=faces' },
  { id: 'p5', name: 'Savannah Nguyen', specialty: 'Ophthalmology', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=80&auto=format&fit=crop&crop=faces' },
  { id: 'p6', name: 'Arlene McCoy', specialty: 'Orthopedics', avatar: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=80&auto=format&fit=crop&crop=faces' },
];

export const patients = [
  { id: 'u1', name: 'Heena West (F)', dob: '1959-10-21', phone: '202-555-0188' },
  { id: 'u2', name: 'Arlene McCoy (M)', dob: '1982-04-11', phone: '202-555-0186' },
  { id: 'u3', name: 'Esther Howard (M)', dob: '1970-12-03', phone: '202-555-0172' },
  { id: 'u4', name: 'Jane Cooper (F)', dob: '1992-07-18', phone: '202-555-0124' },
];

export const appointmentTypes = ['New', 'Follow Up'];

export const reasons = [
  'Infection Disease',
  'Itching',
  'Insomnia',
  'Blurred Vision',
  'Hearing Loss',
  'Headache',
  'Stomach Pain',
  'Eye Redness',
];

export const appointments = Array.from({ length: 11 }).map((_, i) => ({
  id: `a${i+1}`,
  dateTime: ['02/24/21, 11:17am','02/26/21, 9:40pm','03/07/21, 5:23am','03/01/21, 6:05am','03/10/21, 8:01pm','03/03/21, 10:48am'][i%6],
  type: appointmentTypes[i%2],
  patient: patients[i%patients.length],
  provider: providers[i%providers.length].name,
  reason: reasons[i%reasons.length],
  status: ['scheduled','checked-in','cancelled','in-exam'][i%4],
})); 
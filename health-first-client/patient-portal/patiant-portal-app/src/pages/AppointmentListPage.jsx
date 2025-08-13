import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/ui/Navbar';
import Button from '../components/ui/Button';
import { Table, THead, TH, TBody, TR, TD } from '../components/ui/Table';
import StatusBadge from '../components/ui/StatusBadge';
import Pagination from '../components/ui/Pagination';
import BookAppointmentModal from './BookAppointmentModal';
import { appointments as seedData, providers } from '../utils/sampleData';
import { Plus } from 'lucide-react';
import Select from '../components/ui/Select';
import { createAppointment, listAppointments } from '../utils/mockApi';
import { useToast } from '../context/ToastContext';

export default function AppointmentListPage() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('');
  const [providerId, setProviderId] = useState('');
  const [rows, setRows] = useState([]);
  const pageSize = 11;
  const { enqueueToast } = useToast();

  async function load() {
    let list = await listAppointments({ providerId, status });
    if (list.length === 0 && !providerId && !status) {
      // seed once into UI (mock api can remain empty, we display seeds if no data)
      list = seedData.map(a => ({
        id: a.id,
        dateTime: a.dateTime,
        type: a.type,
        patient: a.patient,
        provider: a.provider,
        providerId: providers.find(p => p.name === a.provider)?.id,
        reason: a.reason,
        status: a.status,
      }));
    }
    setRows(list);
  }

  useEffect(() => { load(); }, [providerId, status]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [rows, page]);

  const handleCreate = async (form) => {
    await createAppointment({
      providerId: form.providerId,
      provider: providers.find(p => p.id === form.providerId)?.name,
      patient: { name: seedData[0].patient.name, dob: seedData[0].patient.dob, phone: seedData[0].patient.phone },
      type: form.type || 'New',
      status: 'scheduled',
      dateTime: `${form.date || '2025-01-01'}, ${form.time || '09:00'}`,
      reason: form.reason || '',
    });
    enqueueToast({ variant: 'success', title: 'Scheduled', message: 'Appointment created.' });
    setOpen(false);
    setPage(1);
    await load();
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      <Navbar active="Scheduling" />
      <div className="mx-auto mt-2 flex gap-2 rounded bg-white px-4 py-4 shadow" style={{ width: '1416px', maxWidth: 'calc(100% - 24px)' }}>
        <div className="w-full">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded bg-[#F8F8F8] px-2 py-1 text-xs text-gray-700">Appointments</div>
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 sm:flex">
                <Select
                  className="w-44"
                  value={providerId}
                  onChange={(v)=>{ setProviderId(v); setPage(1); }}
                  options={[{ value: '', label: 'All Providers' }, ...providers.map(p=>({ value: p.id, label: p.name }))]}
                />
                <Select
                  className="w-40"
                  value={status}
                  onChange={(v)=>{ setStatus(v); setPage(1); }}
                  options={[{ value: '', label: 'All Status' }, { value: 'scheduled', label: 'Scheduled' }, { value: 'checked-in', label: 'Checked In' }, { value: 'in-exam', label: 'In Exam' }, { value: 'cancelled', label: 'Cancelled' }]}
                />
              </div>
              <Button variant="outline" size="sm" leadingIcon={Plus} onClick={() => setOpen(true)}>Schedule Appointment</Button>
            </div>
          </div>

          <Table>
            <THead>
              <TR>
                <TH>Date & Time</TH>
                <TH>Appointment Type</TH>
                <TH>Patient Name</TH>
                <TH>Date of Birth</TH>
                <TH>Contact Details</TH>
                <TH>Provider Name</TH>
                <TH>Reason for Visit</TH>
                <TH>Status</TH>
                <TH>Action</TH>
              </TR>
            </THead>
            <TBody>
              {paged.map((a) => (
                <TR key={a.id}>
                  <TD className="text-gray-600">{a.dateTime}</TD>
                  <TD className="text-gray-600">{a.type}</TD>
                  <TD className="font-medium text-[#233853]">{a.patient.name}</TD>
                  <TD className="text-gray-600">{a.patient.dob}</TD>
                  <TD className="text-gray-600">{a.patient.phone}</TD>
                  <TD className="text-gray-700">{a.provider}</TD>
                  <TD className="text-gray-700">{a.reason}</TD>
                  <TD>
                    <StatusBadge status={a.status} />
                  </TD>
                  <TD>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">Start</Button>
                      <div className="h-4 w-px bg-gray-200" />
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>

          <div className="mt-4">
            <Pagination
              page={page}
              pageSize={pageSize}
              total={rows.length}
              onPrev={() => setPage((p)=>Math.max(1, p-1))}
              onNext={() => setPage((p)=> (p * pageSize >= rows.length ? p : p+1))}
            />
          </div>
        </div>
      </div>

      <BookAppointmentModal open={open} onClose={() => setOpen(false)} onSave={handleCreate} />
    </div>
  );
} 
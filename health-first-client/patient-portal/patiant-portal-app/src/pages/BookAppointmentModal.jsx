import React, { useState } from 'react';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import { providers, patients, appointmentTypes, reasons } from '../utils/sampleData';

export default function BookAppointmentModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    patientId: '',
    mode: 'in-person',
    providerId: '',
    type: '',
    amount: '',
    date: '',
    time: '',
    reason: '',
  });

  const handle = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const save = () => {
    onSave?.(form);
    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose} title="Schedule New Appointment" maxWidth="max-w-xl">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <Select
            label="Patient Name"
            value={form.patientId}
            onChange={(v)=>handle('patientId', v)}
            placeholder="Search & Select Patient"
            options={patients.map(p => ({ value: p.id, label: p.name }))}
          />
        </div>

        <div>
          <div className="mb-2 text-xs font-medium text-[#565656]">Appointment Mode</div>
          <div className="flex items-center gap-6 text-sm">
            {[
              { key: 'in-person', label: 'In-Person' },
              { key: 'video', label: 'Video Call' },
              { key: 'home', label: 'Home' },
            ].map(opt => (
              <label key={opt.key} className="inline-flex items-center gap-2">
                <input
                  type="radio"
                  name="mode"
                  value={opt.key}
                  checked={form.mode === opt.key}
                  onChange={(e)=>handle('mode', e.target.value)}
                  className="h-4 w-4 text-[#233853] focus:ring-[#233853]"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Select
            label="Provider"
            value={form.providerId}
            onChange={(v)=>handle('providerId', v)}
            placeholder="Search Provider"
            options={providers.map(p => ({ value: p.id, label: p.name }))}
          />
          <Select
            label="Appointment Type"
            value={form.type}
            onChange={(v)=>handle('type', v)}
            placeholder="Select Type"
            options={appointmentTypes.map(t => ({ value: t, label: t }))}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-[#565656]">Estimated Amount ($)</label>
            <input
              type="number"
              inputMode="decimal"
              placeholder="Enter Amount"
              value={form.amount}
              onChange={(e)=>handle('amount', e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#565656]">Date & Time</label>
            <div className="grid grid-cols-2 gap-2">
              <input type="date" value={form.date} onChange={(e)=>handle('date', e.target.value)} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500" />
              <input type="time" value={form.time} onChange={(e)=>handle('time', e.target.value)} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500" />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-[#565656]">Reason for Visit</label>
          <input
            type="text"
            placeholder="Enter Reason"
            value={form.reason}
            onChange={(e)=>handle('reason', e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div className="flex justify-end gap-2 border-t border-gray-200 pt-3">
          <Button variant="tertiary" className="h-8 px-4" onClick={onClose}>Close</Button>
          <Button className="h-8 px-4" onClick={save}>Save & Close</Button>
        </div>
      </div>
    </Modal>
  );
} 
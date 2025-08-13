import React, { useState } from 'react';
import Navbar from '../components/ui/Navbar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

function DayRow({ value, onChange, onRemove }) {
  return (
    <div className="flex items-end gap-4">
      <div className="flex-1">
        <label className="mb-1 block text-xs font-medium text-[#595F63]">Day</label>
        <select
          value={value.day}
          onChange={(e)=>onChange({ ...value, day: e.target.value })}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500"
        >
          {days.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div className="flex-1">
        <label className="mb-1 block text-xs font-medium text-[#595F63]">From</label>
        <input type="time" value={value.from} onChange={(e)=>onChange({ ...value, from: e.target.value })} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500" />
      </div>
      <div className="flex-1">
        <label className="mb-1 block text-xs font-medium text-[#595F63]">Till</label>
        <input type="time" value={value.till} onChange={(e)=>onChange({ ...value, till: e.target.value })} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500" />
      </div>
      <Button variant="outline" size="sm" onClick={onRemove}>Delete</Button>
    </div>
  );
}

function BlockRow({ value, onChange, onRemove }) {
  return (
    <div className="flex items-end gap-4">
      <div className="w-40">
        <label className="mb-1 block text-xs font-medium text-[#595F63]">Date</label>
        <input type="date" value={value.date} onChange={(e)=>onChange({ ...value, date: e.target.value })} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500" />
      </div>
      <div className="flex-1">
        <label className="mb-1 block text-xs font-medium text-[#595F63]">From</label>
        <input type="time" value={value.from} onChange={(e)=>onChange({ ...value, from: e.target.value })} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500" />
      </div>
      <div className="flex-1">
        <label className="mb-1 block text-xs font-medium text-[#595F63]">Till</label>
        <input type="time" value={value.till} onChange={(e)=>onChange({ ...value, till: e.target.value })} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500" />
      </div>
      <Button variant="outline" size="sm" onClick={onRemove}>Delete</Button>
    </div>
  );
}

export default function ProviderAvailabilityPage() {
  const [dayWise, setDayWise] = useState(days.map((d)=>({ day: d, from: '09:00', till: '18:00' })));
  const [timeZone, setTimeZone] = useState('');
  const [blocks, setBlocks] = useState([{ date: '', from: '', till: '' }]);

  return (
    <div className="min-h-screen bg-[#F3F3F3]">
      <Navbar active="Settings" />
      <div className="mx-auto mt-4 grid w-[1408px] max-w-full grid-cols-1 gap-8 rounded bg-white p-4 shadow" style={{ boxShadow: '1px 1px 8px rgba(0,0,0,0.25)' }}>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="text-base font-medium text-[#21262B]">Day Wise Availability</div>
            <div className="space-y-6">
              {dayWise.map((row, idx) => (
                <DayRow
                  key={idx}
                  value={row}
                  onChange={(val)=>setDayWise((prev)=>prev.map((r,i)=> i===idx? val : r))}
                  onRemove={()=>setDayWise((prev)=>prev.filter((_,i)=>i!==idx))}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="text-base font-medium text-[#21262B]">Slot Creation Setting</div>
              <div className="w-[310px] max-w-full">
                <label className="mb-1 block text-xs font-medium text-[#595F63]">Time Zone</label>
                <select value={timeZone} onChange={(e)=>setTimeZone(e.target.value)} className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-primary-500 focus:ring-primary-500">
                  <option value="">Select Time Zone</option>
                  <option value="EST">EST</option>
                  <option value="CST">CST</option>
                  <option value="PST">PST</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-[#393939]">Block Days</div>
              <div className="space-y-4">
                {blocks.map((row, idx) => (
                  <BlockRow
                    key={idx}
                    value={row}
                    onChange={(val)=>setBlocks((prev)=>prev.map((r,i)=> i===idx? val : r))}
                    onRemove={()=>setBlocks((prev)=>prev.filter((_,i)=>i!==idx))}
                  />
                ))}
              </div>
              <Button variant="outline" size="sm" onClick={()=>setBlocks((prev)=>[...prev,{ date: '', from: '', till: '' }])}>Add Block Days</Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-gray-200 pt-3">
          <Button variant="tertiary" className="h-8 px-4">Close</Button>
          <Button className="h-8 px-4">Save</Button>
        </div>
      </div>
    </div>
  );
} 
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Plus } from 'lucide-react';
import AvailabilityCalendar from './AvailabilityCalendar';
import SlotFormModal from './SlotFormModal';
import SmokyCursor from '../SmookyCursor';
import { useToast } from '../../context/ToastContext';
import { setAvailability } from '../../utils/mockApi';

const ProviderDashboard = () => {
  const [view, setView] = useState('week');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slots, setSlots] = useState([]);
  const [pendingCells, setPendingCells] = useState([]);
  const { enqueueToast } = useToast();

  useEffect(() => {
    const mockSlots = [
      {
        id: 1,
        date: '2024-01-15',
        startTime: '09:00',
        endTime: '10:00',
        type: 'consultation',
        maxPatients: 3,
        currentPatients: 1,
        isRecurring: true,
        recurrence: 'weekly'
      },
    ];
    setSlots(mockSlots);
  }, []);

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setIsModalOpen(true);
  };

  const handleSlotSave = (slotData) => {
    if (selectedSlot) {
      setSlots(prev => prev.map(slot => slot.id === selectedSlot.id ? { ...slot, ...slotData } : slot));
    } else {
      setSlots(prev => [...prev, { ...slotData, id: Date.now() }]);
    }
    setIsModalOpen(false);
    setSelectedSlot(null);
    enqueueToast({ variant: 'success', title: 'Saved', message: 'Time slot has been saved.' });
  };

  const handleSlotDelete = (slotId) => {
    setSlots(prev => prev.filter(slot => slot.id !== slotId));
    setIsModalOpen(false);
    setSelectedSlot(null);
    enqueueToast({ variant: 'success', title: 'Deleted', message: 'Time slot has been deleted.' });
  };

  const handleSaveCells = async () => {
    await setAvailability('p1', pendingCells);
    enqueueToast({ variant: 'success', title: 'Availability saved', message: `${pendingCells.length} cells saved.` });
    setPendingCells([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-healthcare-50 via-primary-50 to-healthcare-100 relative">
      <SmokyCursor />
      <motion.div 
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-br from-primary-100 to-healthcare-100 rounded-lg">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Provider Availability</h1>
                <p className="text-sm text-gray-600">Manage your schedule and patient bookings</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={pendingCells.length === 0}
                onClick={handleSaveCells}
                className="rounded bg-primary-600 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
              >
                Save Changes
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-healthcare-500 text-white rounded-lg hover:from-primary-600 hover:to-healthcare-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => { setSelectedSlot(null); setIsModalOpen(true); }}
              >
                <Plus className="w-4 h-4" />
                <span>New Slot</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AvailabilityCalendar
            view={view}
            slots={slots}
            onSlotClick={handleSlotClick}
            onChange={setPendingCells}
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <SlotFormModal
            initialValues={selectedSlot}
            onSave={handleSlotSave}
            onDelete={handleSlotDelete}
            onClose={() => { setIsModalOpen(false); setSelectedSlot(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProviderDashboard; 
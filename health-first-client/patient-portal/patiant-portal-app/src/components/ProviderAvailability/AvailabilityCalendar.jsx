import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, Users, Calendar as CalendarIcon } from 'lucide-react';

const AvailabilityCalendar = ({ view, slots, onSlotClick, onChange, selectedKeys, smokyHover }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredSlot, setHoveredSlot] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [selectedCells, setSelectedCells] = useState(new Set());
  const gridRef = useRef(null);

  useEffect(() => {
    if (selectedKeys) {
      setSelectedCells(new Set(selectedKeys));
    }
  }, [selectedKeys]);

  const calendarData = useMemo(() => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const days = [];
    const totalDays = 7;
    for (let i = 0; i < totalDays; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    return days;
  }, [currentDate]);

  const timeSlots = useMemo(() => {
    const s = [];
    for (let hour = 8; hour <= 18; hour++) {
      s.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return s;
  }, []);

  const getCellKey = (date, time) => `${date.toISOString().split('T')[0]}_${time}`;

  const toggleCell = (key) => {
    setSelectedCells((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      onChange?.(Array.from(next));
      return next;
    });
  };

  const handleMouseDown = (key) => {
    setDragging(true);
    toggleCell(key);
  };

  const handleMouseEnter = (key) => {
    if (dragging) toggleCell(key);
  };

  const handleMouseUp = () => setDragging(false);

  const getSlotsForDateAndTime = (date, time) => {
    const dateStr = date.toISOString().split('T')[0];
    return slots.filter(slot => 
      slot.date === dateStr && slot.startTime === time
    );
  };

  const getSlotColor = (slot) => {
    const occupancy = slot.currentPatients / slot.maxPatients;
    if (occupancy === 1) return 'bg-red-100 border-red-300 text-red-800';
    if (occupancy >= 0.7) return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    return 'bg-green-100 border-green-300 text-green-800';
  };

  const getSlotIcon = (slot) => {
    switch (slot.type) {
      case 'consultation':
        return <Users className="w-3 h-3" />;
      case 'follow-up':
        return <Clock className="w-3 h-3" />;
      default:
        return <CalendarIcon className="w-3 h-3" />;
    }
  };

  const navigateCalendar = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      weekday: 'short'
    });
  };

  const formatTime = (time) => {
    const [hour] = time.split(':');
    const hourNum = parseInt(hour);
    return hourNum > 12 ? `${hourNum - 12} PM` : `${hourNum} AM`;
  };

  const isKeySelected = (key) => {
    return selectedKeys ? new Set(selectedKeys).has(key) : selectedCells.has(key);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 overflow-hidden select-none" onMouseLeave={handleMouseUp}>
      <div className="bg-[#0ea5e9] text-white p-4">
        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            onClick={() => navigateCalendar(-1)}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <div className="text-center">
            <h2 className="text-lg font-semibold">
              {`${formatDate(calendarData[0])} - ${formatDate(calendarData[6])}`}
            </h2>
            <p className="text-sm opacity-90">Week View</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
            onClick={() => navigateCalendar(1)}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <div className="overflow-x-auto" ref={gridRef} onMouseUp={handleMouseUp}>
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 border-b border-gray-200">
            <div className="p-3 bg-gray-50 font-medium text-gray-700">Time</div>
            {calendarData.map((date, index) => (
              <div key={index} className="p-3 bg-gray-50 text-center">
                <div className="font-medium text-gray-900">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-sm text-gray-600">
                  {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>

          {timeSlots.map((time) => (
            <div key={time} className="grid grid-cols-8 border-b border-gray-100">
              <div className="p-3 bg-gray-50 text-sm text-gray-600 font-medium border-r border-gray-200">
                {formatTime(time)}
              </div>
              {calendarData.map((date, dayIndex) => {
                const daySlots = getSlotsForDateAndTime(date, time);
                const isToday = date.toDateString() === new Date().toDateString();
                const key = getCellKey(date, time);
                const isSelected = isKeySelected(key);
                return (
                  <div
                    key={dayIndex}
                    className={`p-2 border-r border-gray-100 min-h-[64px] relative ${
                      isToday ? 'bg-blue-50/50' : ''
                    } ${isSelected ? 'ring-2 ring-primary-400/60' : ''}`}
                    onMouseDown={() => handleMouseDown(key)}
                    onMouseEnter={() => handleMouseEnter(key)}
                  >
                    <AnimatePresence>
                      {daySlots.map((slot) => (
                        <motion.div
                          key={slot.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
                          className={`absolute inset-2 p-2 rounded-lg border cursor-pointer transition-all duration-200 ${getSlotColor(slot)} ${
                            hoveredSlot === slot.id ? 'ring-2 ring-teal-400 ring-opacity-50' : ''
                          }`}
                          onClick={() => onSlotClick?.(slot)}
                          onMouseEnter={() => setHoveredSlot(slot.id)}
                          onMouseLeave={() => setHoveredSlot(null)}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center space-x-1">
                              {getSlotIcon(slot)}
                              <span className="text-xs font-medium capitalize">{slot.type}</span>
                            </div>
                            <span className="text-xs">{slot.currentPatients}/{slot.maxPatients}</span>
                          </div>
                          <div className="text-xs opacity-75">{slot.startTime} - {slot.endTime}</div>
                          {slot.isRecurring && (
                            <div className="absolute top-1 right-1"><div className="w-2 h-2 bg-current rounded-full opacity-60" /></div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 text-xs text-gray-600">Click or drag to toggle availability slots. Selected cells will be saved.</div>
    </div>
  );
};

export default AvailabilityCalendar; 
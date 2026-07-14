import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Calendar as CalendarIcon, Bell, Activity } from 'lucide-react';
import { useAppStore } from '../store/appStore';

// Event Types Definition
const EVENT_TYPES = {
  appointment: { label: 'Doctor Appointment', color: '#3b82f6' }, // Blue
  lab: { label: 'Lab Test', color: '#a855f7' }, // Purple
  medication: { label: 'Medication Reminder', color: '#10b981' }, // Green
  vaccination: { label: 'Vaccination', color: '#f59e0b' }, // Orange
  hospital: { label: 'Hospital Visit', color: '#ef4444' }, // Red
  checkup: { label: 'Health Checkup', color: '#ec4899' }, // Pink
  followup: { label: 'Follow-up Visit', color: '#8b5cf6' }, // Violet
  custom: { label: 'Custom Reminder', color: '#64748b' }, // Slate
};

export default function HealthCalendarWidget() {
  const { darkMode } = useAppStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [displayDate, setDisplayDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isWidgetExpanded, setIsWidgetExpanded] = useState(true);

  // Form State
  const [time, setTime] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [notes, setNotes] = useState('');
  const [eventType, setEventType] = useState('appointment');
  const [reminder, setReminder] = useState(true);

  // Real-time synchronization
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      if (now.getDate() !== currentDate.getDate()) {
        setCurrentDate(now);
      }
    }, 60000); // Check every minute
    return () => clearInterval(timer);
  }, [currentDate]);

  // Calendar Logic
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(displayDate.getFullYear(), displayDate.getMonth());
  const firstDay = getFirstDayOfMonth(displayDate.getFullYear(), displayDate.getMonth());

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null); // Empty slots for previous month
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const handlePrevMonth = () => {
    setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDisplayDate(new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    if (!day) return;
    const clickedDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
    setSelectedDate(clickedDate);
    setIsPopupOpen(true);
  };

  const dateKey = (date) => {
    if (!date) return '';
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!time) return;

    const key = dateKey(selectedDate);
    const newEvent = {
      id: Date.now().toString(),
      title: EVENT_TYPES[eventType].label,
      time,
      notes,
      type: eventType,
      reminder,
      color: EVENT_TYPES[eventType].color,
    };

    setEvents((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), newEvent].sort((a, b) => a.time.localeCompare(b.time)),
    }));

    // Reset form and close popup
    setTime('');
    setNotes('');
    setEventType('appointment');
    setReminder(true);
    setIsPopupOpen(false);
  };

  const deleteEvent = (dateKeyStr, eventId) => {
    setEvents((prev) => ({
      ...prev,
      [dateKeyStr]: prev[dateKeyStr].filter((e) => e.id !== eventId),
    }));
  };

  const formatMonthYear = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const isToday = (day) => {
    return (
      day === currentDate.getDate() &&
      displayDate.getMonth() === currentDate.getMonth() &&
      displayDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const getEventsForDay = (day) => {
    if (!day) return [];
    const date = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
    return events[dateKey(date)] || [];
  };

  const todayEvents = events[dateKey(currentDate)] || [];

  // Styles (Dark Glassmorphism)
  const widgetContainerStyle = {
    position: 'relative',
    width: 380, // Increased width from 340
    zIndex: 10,
    backgroundColor: 'rgba(11, 16, 32, 0.65)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderRadius: 24,
    border: '1px solid rgba(89, 225, 255, 0.2)', // Neon blue soft border
    boxShadow: '0 24px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 20px rgba(59, 130, 246, 0.1)',
    color: '#f8fafc',
    fontFamily: 'inherit',
    overflow: 'visible',
    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    transform: isWidgetExpanded ? 'translateY(0)' : 'translateY(-20px)',
  };

  const dayStyle = {
    width: 40, // Slightly larger to fit new width
    height: 40,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    cursor: 'pointer',
    fontSize: 15,
    fontWeight: 500,
    position: 'relative',
    transition: 'all 0.25s ease',
  };

  const inputStyle = {
    width: '100%',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: '10px 14px',
    color: '#fff',
    fontSize: 14,
    outline: 'none',
    marginBottom: 12,
    transition: 'border 0.2s',
  };

  return (
    <div style={widgetContainerStyle}>
      <style>{`
        .cal-day:hover {
          transform: scale(1.05) translateY(-2px);
          background-color: rgba(59, 130, 246, 0.15);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
          color: #59e1ff;
        }
        .cal-nav-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        .event-type-btn.active {
          background-color: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
        }
        .cal-scroll::-webkit-scrollbar { width: 4px; }
        .cal-scroll::-webkit-scrollbar-track { background: transparent; }
        .cal-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, #3b82f6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}>
            <CalendarIcon size={16} color="#fff" />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: -0.3 }}>{formatMonthYear(displayDate)}</h3>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button className="cal-nav-btn" onClick={handlePrevMonth} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 6, borderRadius: 8, display: 'flex' }}>
            <ChevronLeft size={18} />
          </button>
          <button className="cal-nav-btn" onClick={handleNextMonth} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 6, borderRadius: 8, display: 'flex' }}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div style={{ padding: '16px 20px' }}>
        {/* Weekdays */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 12 }}>
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
            <div key={d} style={{ textAlign: 'center', fontSize: 12, color: '#64748b', fontWeight: 700 }}>{d}</div>
          ))}
        </div>

        {/* Days */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
          {days.map((day, idx) => {
            const isTdy = isToday(day);
            const dayEvents = getEventsForDay(day);

            return (
              <div
                key={idx}
                className={day ? "cal-day" : ""}
                onClick={() => handleDateClick(day)}
                style={{
                  ...dayStyle,
                  opacity: day ? 1 : 0,
                  pointerEvents: day ? 'auto' : 'none',
                  backgroundColor: isTdy ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
                  color: isTdy ? '#59e1ff' : '#cbd5e1',
                  border: isTdy ? '1px solid rgba(89, 225, 255, 0.3)' : '1px solid transparent',
                  animation: isTdy ? 'pulse-glow 2s infinite' : 'none',
                }}
              >
                {day}
                {/* Event Dots */}
                {dayEvents.length > 0 && (
                  <div style={{ display: 'flex', gap: 2, position: 'absolute', bottom: 4 }}>
                    {dayEvents.slice(0, 3).map((ev, i) => (
                      <span key={i} style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: ev.color, boxShadow: `0 0 6px ${ev.color}` }}></span>
                    ))}
                    {dayEvents.length > 3 && <span style={{ fontSize: 8, lineHeight: '4px', color: '#94a3b8' }}>+</span>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Today's Schedule */}
      <div style={{ padding: '16px 24px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)', borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>Today's Schedule</h4>
        
        {todayEvents.length === 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b', fontSize: 13 }}>
            <Activity size={14} />
            <span>No health events scheduled for today.</span>
          </div>
        ) : (
          <div className="cal-scroll" style={{ maxHeight: 120, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {todayEvents.map(ev => (
              <div key={ev.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, borderLeft: `3px solid ${ev.color}` }}>
                <div style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600, minWidth: 42 }}>{ev.time}</div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{ev.title}</div>
                  <div style={{ color: ev.color, fontSize: 11, fontWeight: 500 }}>{EVENT_TYPES[ev.type]?.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isPopupOpen && selectedDate && (
        <div style={{
          position: 'absolute', top: 0, right: 'calc(100% + 24px)', 
          width: 320, backgroundColor: 'rgba(11, 16, 32, 0.95)', backdropFilter: 'blur(32px)',
          borderRadius: 24, border: '1px solid rgba(89, 225, 255, 0.3)', padding: 20,
          boxShadow: '0 24px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
          zIndex: 1000, color: '#fff', animation: 'fadeSlide 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <style>{`
            @keyframes fadeSlide { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
          `}</style>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</h4>
            <button onClick={() => setIsPopupOpen(false)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={18} /></button>
          </div>

          <form onSubmit={handleAddEvent}>
            
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8, fontWeight: 600 }}>Event Type</div>
              <div className="cal-scroll" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {Object.entries(EVENT_TYPES).map(([key, info]) => {
                  const isActive = eventType === key;
                  return (
                    <div key={key} onClick={() => setEventType(key)} style={{
                      padding: '8px 12px', borderRadius: 12, border: isActive ? `1px solid ${info.color}` : '1px solid transparent',
                      background: isActive ? `${info.color}22` : 'rgba(255,255,255,0.03)', 
                      color: isActive ? info.color : '#cbd5e1', fontSize: 12, fontWeight: isActive ? 600 : 500, cursor: 'pointer',
                      whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s'
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: info.color, boxShadow: isActive ? `0 0 6px ${info.color}` : 'none' }}></span>
                      {info.label}
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8, fontWeight: 600 }}>Select Time</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 8 }}>
                {['09:00', '12:00', '15:00', '18:00'].map(t => (
                  <div key={t} onClick={() => setTime(t)} style={{
                    padding: '8px 0', textAlign: 'center', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 600,
                    background: time === t ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255,255,255,0.03)',
                    color: time === t ? '#59e1ff' : '#94a3b8',
                    border: time === t ? '1px solid rgba(89, 225, 255, 0.3)' : '1px solid transparent',
                    transition: 'all 0.2s'
                  }}>
                    {t}
                  </div>
                ))}
              </div>
              <div style={{ position: 'relative' }}>
                <div 
                  onClick={() => setShowTimePicker(!showTimePicker)}
                  style={{...inputStyle, marginBottom: 0, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}
                >
                  <span style={{ color: time ? '#fff' : '#94a3b8' }}>{time || "Select custom time..."}</span>
                  <span style={{ fontSize: 12 }}>⏰</span>
                </div>
                
                {showTimePicker && (
                  <div style={{
                    position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 8, 
                    background: 'rgba(15, 23, 42, 0.95)', border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: 12, padding: 8, zIndex: 10, display: 'flex', gap: 8, backdropFilter: 'blur(12px)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                  }}>
                    <div style={{ flex: 1, height: 140, overflowY: 'auto' }} className="cal-scroll">
                      {Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')).map(h => {
                        const isSelected = time && time.split(':')[0] === h;
                        return (
                          <div key={h} onClick={() => setTime(`${h}:${time ? time.split(':')[1] : '00'}`)}
                            style={{ padding: '6px 0', textAlign: 'center', cursor: 'pointer', borderRadius: 6, 
                            background: isSelected ? 'rgba(59, 130, 246, 0.3)' : 'transparent', 
                            color: isSelected ? '#59e1ff' : '#cbd5e1', fontSize: 13, fontWeight: isSelected ? 700 : 500 }}>
                            {h}
                          </div>
                        );
                      })}
                    </div>
                    <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }}></div>
                    <div style={{ flex: 1, height: 140, overflowY: 'auto' }} className="cal-scroll">
                      {['00', '15', '30', '45'].map(m => {
                        const isSelected = time && time.split(':')[1] === m;
                        return (
                          <div key={m} onClick={() => { 
                              const h = time ? time.split(':')[0] : '12';
                              setTime(`${h}:${m}`); 
                              setShowTimePicker(false); 
                            }}
                            style={{ padding: '6px 0', textAlign: 'center', cursor: 'pointer', borderRadius: 6,
                            background: isSelected ? 'rgba(59, 130, 246, 0.3)' : 'transparent', 
                            color: isSelected ? '#59e1ff' : '#cbd5e1', fontSize: 13, fontWeight: isSelected ? 700 : 500 }}>
                            {m}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <input type="text" placeholder="Notes (Optional)" value={notes} onChange={e => setNotes(e.target.value)} style={inputStyle} />
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#cbd5e1' }}><Bell size={14} /> Remind me</div>
              <div onClick={() => setReminder(!reminder)} style={{ width: 36, height: 20, borderRadius: 10, background: reminder ? '#3b82f6' : 'rgba(255,255,255,0.1)', position: 'relative', cursor: 'pointer', transition: '0.3s' }}>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', position: 'absolute', top: 2, left: reminder ? 18 : 2, transition: '0.3s' }} />
              </div>
            </div>

            <button type="submit" style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)' }}>
              Add Event
            </button>
          </form>

          {/* List existing events for this day */}
          {events[dateKey(selectedDate)]?.length > 0 && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8, fontWeight: 600 }}>Scheduled Events</div>
              <div className="cal-scroll" style={{ maxHeight: 120, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {events[dateKey(selectedDate)].map(ev => (
                  <div key={ev.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', background: 'rgba(255,255,255,0.05)', borderRadius: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: ev.color }}></span>
                      <div style={{ fontSize: 12, color: '#fff' }}>{ev.title} <span style={{ color: '#94a3b8', fontSize: 11 }}>({ev.time})</span></div>
                    </div>
                    <button onClick={() => deleteEvent(dateKey(selectedDate), ev.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', opacity: 0.7 }}><X size={14} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

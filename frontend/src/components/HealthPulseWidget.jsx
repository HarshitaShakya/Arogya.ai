import React, { useState, useEffect } from 'react';
import { Droplet, Activity, HeartPulse, Stethoscope, Pill, Flame, Sparkles, Heart, Trophy, ShieldCheck, ChevronRight, Play, Calendar, FileText, X } from 'lucide-react';
import { usePersistentHealthData } from '../hooks/useHealthData';

export default function HealthPulseWidget() {
  const [data, toggleTask, initJourney, removeTimelineEvent] = usePersistentHealthData();
  const [animatedScore, setAnimatedScore] = useState(0);

  // Calculate Current Wellness Score (0 to 100) based strictly on core daily actions
  const coreTasks = ['water', 'activity', 'sleep', 'medicine', 'checkin'];
  const completedCount = coreTasks.filter(k => data.today[k].completed).length;
  const targetScore = data.initialized ? Math.floor((completedCount / coreTasks.length) * 100) : 0;

  useEffect(() => {
    let start = animatedScore;
    const end = targetScore;
    if (start === end) return;
    const step = end > start ? 1 : -1;
    const timer = setInterval(() => {
      start += step;
      setAnimatedScore(start);
      if (start === end) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [targetScore]);

  const getDynamicInsight = () => {
    if (!data.initialized || completedCount === 0) return "Complete more health activities to receive personalized AI insights.";
    
    if (data.today.medicine.completed && !data.today.water.completed) {
      return "You've taken your medication, but haven't recorded your water intake today.";
    }
    if (completedCount === coreTasks.length) {
      return "Incredible! You've completed all your daily health goals.";
    }
    if (data.streak > 3) {
      return `You have maintained a healthy streak for ${data.streak} consecutive days! Keep it up.`;
    }
    if (data.today.sleep.completed) {
      return "Your sleep has been recorded. Consistent sleep improves overall Wellness Score.";
    }
    return "Every small action counts. Keep logging your daily tasks to build your health profile.";
  };

  const widgetContainerStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: 1000,
    zIndex: 10,
    color: '#f8fafc',
    fontFamily: 'inherit',
    padding: '24px 0',
    display: 'flex',
    justifyContent: 'center',
    gap: '64px',
    margin: '0 auto'
  };

  if (!data.initialized) {
    return (
      <div style={widgetContainerStyle}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
          <div style={{ 
            background: 'rgba(11, 16, 32, 0.75)', backdropFilter: 'blur(32px)', 
            borderRadius: 24, border: '1px solid rgba(89, 225, 255, 0.15)', 
            padding: '48px', textAlign: 'center', maxWidth: 460,
            boxShadow: '0 32px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 30px rgba(59, 130, 246, 0.05)'
          }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', border: '1px solid rgba(59,130,246,0.3)' }}>
              <HeartPulse size={32} color="#59e1ff" />
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12, color: '#f8fafc' }}>Welcome to Arogya.ai</h2>
            <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.6, marginBottom: 32 }}>
              Complete your first health check-in to begin building your personalized wellness dashboard.
            </p>
            <button 
              onClick={initJourney}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #6366f1)', border: 'none', borderRadius: 12,
                color: '#fff', fontSize: 16, fontWeight: 700, padding: '16px 32px', cursor: 'pointer',
                boxShadow: '0 8px 16px rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', gap: 8, margin: '0 auto', transition: 'all 0.2s'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Start My Health Journey <Play size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const tasksConfig = [
    { id: 'water', label: 'Drink Water', icon: Droplet, color: '#3b82f6' },
    { id: 'activity', label: 'Walking', icon: Activity, color: '#10b981' },
    { id: 'sleep', label: 'Sleep', icon: HeartPulse, color: '#8b5cf6' },
    { id: 'medicine', label: 'Medicine', icon: Pill, color: '#f59e0b' },
    { id: 'checkin', label: 'Daily Check-in', icon: Stethoscope, color: '#ec4899' },
  ];

  const getHeatmapColor = (tasksCompleted, totalTasks) => {
    if (!totalTasks || tasksCompleted === 0) return 'rgba(255,255,255,0.05)';
    const ratio = tasksCompleted / totalTasks;
    if (ratio > 0.8) return '#10b981'; // Green high
    if (ratio > 0.5) return '#3b82f6'; // Blue mid
    return '#8b5cf6'; // Purple low
  };

  return (
    <div style={widgetContainerStyle}>
      <style>{`
        @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbitReverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes breathe { 0%, 100% { transform: scale(1); filter: brightness(1); } 50% { transform: scale(1.05); filter: brightness(1.2); } }
        .ai-orb {
          background: radial-gradient(circle at 30% 30%, #59e1ff, #3b82f6 40%, #6366f1 70%, #0f172a 100%);
          animation: breathe 4s ease-in-out infinite;
          box-shadow: 0 0 40px rgba(59, 130, 246, 0.4), inset -10px -10px 20px rgba(0,0,0,0.5), inset 10px 10px 20px rgba(255,255,255,0.4);
        }
        .glass-chip {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(12px);
          transition: all 0.3s ease;
        }
        .glass-chip:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(89, 225, 255, 0.3);
          transform: translateY(-2px);
        }
        .progress-capsule {
          transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .heatmap-cell {
          transition: all 0.2s;
        }
        .heatmap-cell:hover {
          transform: scale(1.3);
          z-index: 10;
          box-shadow: 0 0 10px rgba(255,255,255,0.5);
        }
        .timeline-delete-btn {
          opacity: 0.5;
          transition: all 0.2s;
        }
        .timeline-delete-btn:hover {
          opacity: 1;
          color: #ef4444 !important;
        }
      `}</style>

      {/* LEFT COLUMN: Orb & Level */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ position: 'relative', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', width: 220, height: 220, borderRadius: '50%', border: '1px solid rgba(59, 130, 246, 0.2)', borderTopColor: '#59e1ff', borderRightColor: '#8b5cf6', animation: 'orbit 8s linear infinite' }} />
          <div style={{ position: 'absolute', width: 190, height: 190, borderRadius: '50%', border: '1px dashed rgba(89, 225, 255, 0.3)', borderBottomColor: '#ec4899', animation: 'orbitReverse 12s linear infinite' }} />
          
          <div className="ai-orb" style={{ width: 140, height: 140, borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
            <Heart size={20} color="#fff" style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.8))', marginBottom: 4 }} />
            <div style={{ fontSize: 42, fontWeight: 900, lineHeight: 1, letterSpacing: -1, textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
              {animatedScore}
            </div>
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.9 }}>Wellness Score</div>
          </div>
        </div>

        {/* Level System */}
        <div style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))', borderRadius: 20, padding: 20, border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #f97316, #ef4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.4)' }}>
                <Flame size={18} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: -0.3 }}>Level {data.level}</div>
                <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>Wellness XP</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>{data.xp} <span style={{ color: '#64748b', fontWeight: 600 }}>/ {data.level * 1000} XP</span></div>
            </div>
          </div>
          
          <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, marginBottom: 20, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(data.xp / (data.level * 1000)) * 100}%`, background: 'linear-gradient(90deg, #f97316, #ef4444)', borderRadius: 3, transition: 'width 1s ease-out' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>Current Streak</div>
              <div style={{ fontSize: 16, color: '#f8fafc', fontWeight: 700 }}>{data.streak} Days</div>
            </div>
            <div style={{ width: 1, height: 30, background: 'rgba(255,255,255,0.1)' }}></div>
            <div>
              <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>Longest</div>
              <div style={{ fontSize: 16, color: '#f8fafc', fontWeight: 700 }}>{data.longestStreak} Days</div>
            </div>
            <div style={{ width: 1, height: 30, background: 'rgba(255,255,255,0.1)' }}></div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: '#f59e0b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                <ShieldCheck size={12} /> Status
              </div>
              <div style={{ fontSize: 14, color: '#f8fafc', fontWeight: 700 }}>{data.streak > 0 ? 'Active' : 'At Risk'}</div>
            </div>
          </div>
        </div>

        {/* Health Timeline */}
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>Health Timeline</h4>
          {data.timeline.length === 0 ? (
            <div style={{ fontSize: 13, color: '#64748b', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: 12 }}>
              No recent activity. Complete tasks to build your timeline.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.timeline.map((item, idx) => (
                <div key={idx} className="timeline-item" style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#59e1ff', boxShadow: '0 0 8px #59e1ff' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginBottom: 2 }}>{item.date} • {item.time}</div>
                    <div style={{ fontSize: 13, color: '#f8fafc', fontWeight: 600 }}>{item.event}</div>
                  </div>
                  <button 
                    onClick={() => removeTimelineEvent(idx)}
                    className="timeline-delete-btn"
                    style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
                    title="Remove event"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT COLUMN: Progress, Heatmap, Insights */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Daily Progress */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 }}>
            <h4 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>Daily Progress</h4>
            <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Click to log</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {tasksConfig.map((task) => {
              const state = data.today[task.id];
              const displayVal = state.completed ? state.max : state.val;
              const percent = (displayVal / state.max) * 100;
              let valText = `${displayVal}${state.label} / ${state.max}${state.label}`;
              if (task.id === 'checkin') valText = state.completed ? 'Completed' : 'Pending';
              if (task.id === 'medicine') valText = state.completed ? `${state.max} of ${state.max} doses` : `0 of ${state.max} doses`;

              return (
                <div key={task.id} onClick={() => toggleTask(task.id)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16, padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.03)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${task.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <task.icon size={18} color={task.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#f8fafc' }}>{task.label}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: state.completed ? task.color : '#94a3b8' }}>
                        {valText} <span style={{ color: '#f59e0b', fontSize: 10, marginLeft: 4 }}>+{state.xp} XP</span>
                      </span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
                      <div className="progress-capsule" style={{ 
                        height: '100%', width: `${percent}%`, 
                        background: state.completed ? `linear-gradient(90deg, ${task.color}, #fff)` : task.color,
                        boxShadow: state.completed ? `0 0 10px ${task.color}` : 'none',
                        borderRadius: 3
                      }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contribution Graph */}
        <div>
          <h4 style={{ margin: '0 0 12px 0', fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 }}>Contribution Graph</h4>
          {!data.initialized ? (
            <div style={{ padding: '24px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)' }}>
              <Calendar size={24} color="#64748b" style={{ margin: '0 auto 12px' }} />
              <div style={{ fontSize: 13, color: '#94a3b8', fontWeight: 600 }}>Start your wellness journey today.</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 10, background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.05)', maxWidth: 280 }}>
              {(() => {
                const totalDays = 21;
                const historyToDisplay = [...data.history];
                while (historyToDisplay.length < totalDays - 1) {
                  historyToDisplay.unshift({ date: 'No Data', tasksCompleted: 0, totalTasks: 0, score: 0 });
                }
                historyToDisplay.push({ date: 'Today', tasksCompleted: completedCount, totalTasks: coreTasks.length, score: targetScore });

                return historyToDisplay.map((day, i, arr) => {
                  const color = getHeatmapColor(day.tasksCompleted, day.totalTasks);
                  const isToday = i === arr.length - 1;
                  const isActive = day.tasksCompleted > 0;
                  const isEmpty = day.date === 'No Data';
                  
                  return (
                    <div key={i} className="heatmap-cell" 
                      title={isEmpty ? 'No data' : `${day.date} | Tasks: ${day.tasksCompleted}/${day.totalTasks} | Score: ${day.score}`}
                      style={{ 
                        width: '100%', aspectRatio: '1/1', borderRadius: 6, cursor: isEmpty ? 'default' : 'pointer',
                        background: isActive ? color : (isEmpty ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.03)'),
                        boxShadow: isActive ? `0 4px 12px ${color}40, inset 0 2px 4px rgba(255,255,255,0.2)` : (isEmpty ? 'none' : 'inset 0 2px 4px rgba(0,0,0,0.2)'),
                        border: isToday ? `1px solid ${isActive ? color : 'rgba(255,255,255,0.3)'}` : (isEmpty ? '1px dashed rgba(255,255,255,0.05)' : '1px solid rgba(255,255,255,0.05)'),
                        transform: isToday ? 'scale(1.15)' : 'none',
                        zIndex: isToday ? 2 : 1,
                        position: 'relative'
                      }} 
                    />
                  );
                });
              })()}
            </div>
          )}
        </div>

        {/* AI Insight Card */}
        <div className="glass-chip" style={{ padding: '20px', borderRadius: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Sparkles size={16} color="#f59e0b" />
            <span style={{ fontSize: 12, fontWeight: 800, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: 1 }}>AI Insight</span>
          </div>
          <p style={{ margin: 0, fontSize: 15, color: '#e2e8f0', lineHeight: 1.6, fontWeight: 600 }}>
            {getDynamicInsight()}
          </p>
        </div>
      </div>
    </div>
  );
}

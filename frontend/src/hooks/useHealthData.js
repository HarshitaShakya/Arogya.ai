import { useState, useEffect } from 'react';

export function usePersistentHealthData() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('arogya_health_data_v2');
    if (saved) return JSON.parse(saved);
    
    // Empty Initial State
    return {
      initialized: false,
      lastUpdate: new Date().toDateString(),
      xp: 0,
      level: 1,
      streak: 0,
      longestStreak: 0,
      today: {
        water: { completed: false, val: 0, max: 2, label: 'L', xp: 15 },
        activity: { completed: false, val: 0, max: 6000, label: 'steps', xp: 20 },
        sleep: { completed: false, val: 0, max: 8, label: 'h', xp: 15 },
        medicine: { completed: false, val: 0, max: 1, label: 'doses', xp: 25 },
        checkin: { completed: false, val: 0, max: 1, label: '', xp: 20 },
        lab: { completed: false, val: 0, max: 1, label: 'report', xp: 40 }, 
        rx: { completed: false, val: 0, max: 1, label: 'rx', xp: 20 },
      },
      history: [],
      timeline: []
    };
  });

  useEffect(() => {
    // Check for midnight reset
    const todayStr = new Date().toDateString();
    if (data.initialized && data.lastUpdate !== todayStr) {
      // Calculate yesterday's score
      const taskKeys = ['water', 'activity', 'sleep', 'medicine', 'checkin']; // core daily tasks
      const completedCount = taskKeys.filter(k => data.today[k].completed).length;
      const score = Math.floor((completedCount / taskKeys.length) * 100);
      
      const newHistory = [...data.history, { 
        date: new Date(Date.now() - 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), 
        score: score,
        tasksCompleted: completedCount,
        totalTasks: taskKeys.length
      }];

      let newStreak = data.streak;
      if (completedCount > 0) newStreak += 1;
      else newStreak = 0; // Gentle reset

      setData(prev => ({
        ...prev,
        lastUpdate: todayStr,
        history: newHistory.slice(-21), // keep last 21 days for heatmap
        streak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        today: {
          water: { ...prev.today.water, completed: false, val: 0 },
          activity: { ...prev.today.activity, completed: false, val: 0 },
          sleep: { ...prev.today.sleep, completed: false, val: 0 },
          medicine: { ...prev.today.medicine, completed: false, val: 0 },
          checkin: { ...prev.today.checkin, completed: false, val: 0 },
          lab: { ...prev.today.lab, completed: false, val: 0 },
          rx: { ...prev.today.rx, completed: false, val: 0 },
        }
      }));
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem('arogya_health_data_v2', JSON.stringify(data));
  }, [data]);

  const initJourney = () => {
    setData(prev => ({ ...prev, initialized: true, lastUpdate: new Date().toDateString() }));
  };

  const toggleTask = (taskKey, customLog = null) => {
    if (!data.initialized) return;

    setData(prev => {
      const isCompleted = !prev.today[taskKey].completed;
      let xpChange = isCompleted ? prev.today[taskKey].xp : -prev.today[taskKey].xp;
      let autoCheckin = false;
      
      // Automatically trigger check-in if completing any activity for the first time today
      if (isCompleted && taskKey !== 'checkin' && !prev.today.checkin.completed) {
        autoCheckin = true;
        xpChange += prev.today.checkin.xp;
      }
      
      let newXp = prev.xp + xpChange;
      let newLevel = prev.level;
      if (newXp >= newLevel * 1000) {
        newLevel += 1;
        newXp = newXp - ((newLevel - 1) * 1000);
      } else if (newXp < 0 && newLevel > 1) {
        newLevel -= 1;
        newXp = (newLevel * 1000) + newXp;
      }

      // Add to timeline if completed
      let newTimeline = [...prev.timeline];
      let msg = customLog;
      if (!msg) {
        if (taskKey === 'water') msg = 'Reached daily hydration goal';
        if (taskKey === 'activity') msg = 'Hit daily walking target';
        if (taskKey === 'sleep') msg = 'Recorded sleep duration';
        if (taskKey === 'medicine') msg = 'Logged medication adherence';
        if (taskKey === 'checkin') msg = 'Completed Daily Check-in';
        if (taskKey === 'lab') msg = 'Uploaded Lab Report';
        if (taskKey === 'rx') msg = 'Uploaded Prescription';
      }

      if (isCompleted) {
        newTimeline.unshift({
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          event: msg,
          taskKey: taskKey
        });
        
        if (autoCheckin) {
          newTimeline.unshift({
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            event: 'Completed Daily Check-in',
            taskKey: 'checkin'
          });
        }
      } else {
        // Remove the specific message if unchecked today
        const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const eventIndex = newTimeline.findIndex(t => t.date === todayStr && t.event === msg);
        if (eventIndex !== -1) {
          newTimeline.splice(eventIndex, 1);
        }
      }
      
      const newToday = {
        ...prev.today,
        [taskKey]: { 
          ...prev.today[taskKey], 
          completed: isCompleted,
          val: isCompleted ? prev.today[taskKey].max : 0
        }
      };

      if (autoCheckin) {
        newToday.checkin = {
          ...prev.today.checkin,
          completed: true,
          val: prev.today.checkin.max
        };
      }

      return {
        ...prev,
        xp: Math.max(0, newXp),
        level: newLevel,
        timeline: newTimeline.slice(0, 10), // keep latest 10
        today: newToday
      };
    });
  };

  const removeTimelineEvent = (indexToRemove) => {
    setData(prev => {
      const item = prev.timeline[indexToRemove];
      const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      
      if (item && item.date === todayStr && item.taskKey && prev.today[item.taskKey] && prev.today[item.taskKey].completed) {
         const taskKey = item.taskKey;
         const xpChange = -prev.today[taskKey].xp;
         
         let newXp = prev.xp + xpChange;
         let newLevel = prev.level;
         if (newXp < 0 && newLevel > 1) {
            newLevel -= 1;
            newXp = (newLevel * 1000) + newXp;
         }

         return {
           ...prev,
           xp: Math.max(0, newXp),
           level: newLevel,
           timeline: prev.timeline.filter((_, idx) => idx !== indexToRemove),
           today: {
             ...prev.today,
             [taskKey]: {
               ...prev.today[taskKey],
               completed: false,
               val: 0
             }
           }
         };
      }

      return {
        ...prev,
        timeline: prev.timeline.filter((_, idx) => idx !== indexToRemove)
      };
    });
  };

  return [data, toggleTask, initJourney, removeTimelineEvent];
}

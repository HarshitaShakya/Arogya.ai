import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'
import PageGlow from '../components/PageGlow'
import HealthCalendarWidget from '../components/HealthCalendarWidget'
import HealthPulseWidget from '../components/HealthPulseWidget'

export default function HealthStreak() {
  const { darkMode } = useAppStore()
  const th = getTheme(darkMode)

  return (
    <div className="resp-stack resp-p-page" style={{ 
      backgroundColor: th.bg, 
      backgroundImage: darkMode ? th.bgGradient : 'none', 
      minHeight: '100vh', 
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 32,
      width: '100%',
      position: 'relative' 
    }}>
      <PageGlow corner="top-right" />
      
      <div className="resp-w-full" style={{ flex: 1, position: 'relative', zIndex: 1, maxWidth: 'calc(100% - 440px)' }}>
        <HealthPulseWidget />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <HealthCalendarWidget />
      </div>
    </div>
  )
}
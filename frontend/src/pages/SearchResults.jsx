import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'
import PageGlow from '../components/PageGlow'
import HealthCalendarWidget from '../components/HealthCalendarWidget'
import HealthPulseWidget from '../components/HealthPulseWidget'

export default function SearchResults() {
  const { darkMode } = useAppStore()
  const th = getTheme(darkMode)

  return (
    <div style={{ 
      backgroundColor: th.bg, 
      backgroundImage: darkMode ? th.bgGradient : 'none', 
      minHeight: '100vh', 
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      width: '100%',
      padding: '76px 24px 40px',
      position: 'relative' 
    }}>
      <PageGlow corner="top-right" />
      
      <div style={{ flex: 1, position: 'relative', zIndex: 1, maxWidth: 'calc(100% - 440px)' }}>
        <HealthPulseWidget />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <HealthCalendarWidget />
      </div>
    </div>
  )
}
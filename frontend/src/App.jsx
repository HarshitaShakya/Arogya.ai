import { Routes, Route } from 'react-router-dom'
import { useAppStore } from './store/appStore'
import Navbar from './components/Navbar'
import AIChat from './components/AIChat'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import HospitalProfile from './pages/HospitalProfile'
import Auth from './pages/Auth'
import Favourites from './pages/Favourites'
import FreeServicesResults from './pages/FreeServicesResults'
import AiAnalysis from './pages/AiAnalysis'

function App() {
  const darkMode = useAppStore(s => s.darkMode)
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/free-services-search" element={<FreeServicesResults />} />
          <Route path="/hospital/:id" element={<HospitalProfile />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/ai-analysis" element={<AiAnalysis />} />
        </Routes>
        <AIChat />
      </div>
    </div>
  )
}

export default App

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
import AiTreatmentJourney from './pages/AiTreatmentJourney'
import InfoPage from './pages/InfoPage'
import HelpCenter from './pages/HelpCenter'
import Faqs from './pages/Faqs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'
import OurMission from './pages/OurMission'
import Careers from './pages/Careers'
import MediaKit from './pages/MediaKit'
import Features from './pages/Features'
import CommunityReviews from './pages/CommunityReviews'

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
          <Route path="/features" element={<Features />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/ai-analysis" element={<AiAnalysis />} />
          <Route path="/ai-treatment-journey" element={<AiTreatmentJourney />} />
          <Route path="/info/faqs" element={<Faqs />} />
          <Route path="/info/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/info/terms-of-use" element={<TermsOfUse />} />
          <Route path="/info/contact-us" element={<ContactUs />} />
          <Route path="/info/about-us" element={<AboutUs />} />
          <Route path="/info/our-mission" element={<OurMission />} />
          <Route path="/info/careers" element={<Careers />} />
          <Route path="/info/media-kit" element={<MediaKit />} />
          <Route path="/info/community-reviews" element={<CommunityReviews />} />
          <Route path="/info/:pageId" element={<InfoPage />} />
          <Route path="/help-center" element={<HelpCenter />} />
        </Routes>
        <AIChat />
      </div>
    </div>
  )
}

export default App

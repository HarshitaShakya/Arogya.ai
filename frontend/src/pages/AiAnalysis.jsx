import { useState, useRef } from 'react'
import { useAppStore } from '../store/appStore'
import { getTheme } from '../utils/theme'
import PageGlow from '../components/PageGlow'

export default function AiAnalysis() {
  const { darkMode } = useAppStore()
  const th = getTheme(darkMode)

  const [selectedFile, setSelectedFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setAnalysisComplete(false)
        setIsAnalyzing(false)
        setAnalysisResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setAnalysisComplete(false)
        setIsAnalyzing(false)
        setAnalysisResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const startAnalysis = async () => {
    if (!selectedFile) return
    setIsAnalyzing(true)
    setAnalysisComplete(false)
    setAnalysisResult(null)
    
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      
      const response = await fetch('http://localhost:8000/api/ai/analyze-image', {
        method: 'POST',
        body: formData,
      })
      
      const result = await response.json()
      setAnalysisResult(result)
    } catch (error) {
      console.error("Error analyzing image:", error)
      setAnalysisResult({
        detected_anomaly: false,
        confidence_score: 0,
        severity: 'Error',
        analysis_text: 'Failed to connect to the backend server. Please make sure the Python backend (uvicorn app.main:app) is running to get real AI analysis.'
      })
    } finally {
      setIsAnalyzing(false)
      setAnalysisComplete(true)
    }
  }

  const resetAnalysis = () => {
    setSelectedFile(null)
    setImagePreview(null)
    setIsAnalyzing(false)
    setAnalysisComplete(false)
    setAnalysisResult(null)
  }

  const scanLineStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '4px',
    background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)',
    boxShadow: '0 0 20px 4px rgba(59, 130, 246, 0.5)',
    animation: 'scan 2s linear infinite',
    zIndex: 10
  }

  const boundingBoxStyle = {
    position: 'absolute',
    top: '30%',
    left: '25%',
    width: '40%',
    height: '35%',
    border: '3px solid #ef4444',
    boxShadow: '0 0 15px rgba(239, 68, 68, 0.8), inset 0 0 15px rgba(239, 68, 68, 0.4)',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: '8px',
    animation: 'pulse-box 2s infinite',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    pointerEvents: 'none'
  }

  const labelStyle = {
    position: 'absolute',
    top: '-35px',
    left: '-3px',
    background: '#ef4444',
    color: '#fff',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    boxShadow: '0 4px 10px rgba(239, 68, 68, 0.5)'
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 73px)', position: 'relative', overflow: 'hidden', padding: '40px 24px' }}>
      <PageGlow />
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes pulse-box {
          0%, 100% { border-color: #ef4444; box-shadow: 0 0 15px rgba(239,68,68,0.8), inset 0 0 15px rgba(239,68,68,0.4); }
          50% { border-color: #f87171; box-shadow: 0 0 25px rgba(248,113,113,1), inset 0 0 25px rgba(248,113,113,0.6); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: 16, background: th.accentGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.02em' }}>
            AI Medical Imaging Analysis
          </h1>
          <p style={{ fontSize: '1.125rem', color: th.muted, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
            Upload X-rays, MRIs, or CT scans. Our advanced neural networks will scan for anomalies and highlight potential areas of concern instantly.
          </p>
        </div>

        {/* Main Content Area */}
        <div style={{ 
          background: th.cardBg, 
          border: '1px solid ' + th.border, 
          borderRadius: 24, 
          padding: '40px', 
          boxShadow: th.shadow,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        }}>
          
          {!imagePreview ? (
            /* Upload Zone */
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              style={{
                border: '2px dashed ' + th.border,
                borderRadius: 16,
                padding: '60px 20px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backgroundColor: th.inputBg,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#3b82f6'; e.currentTarget.style.backgroundColor = darkMode ? 'rgba(59,130,246,0.05)' : 'rgba(59,130,246,0.02)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = th.border; e.currentTarget.style.backgroundColor = th.inputBg }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px', animation: 'float 4s ease-in-out infinite' }}>🩻</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: th.text, marginBottom: '8px' }}>Drag & Drop your scan here</h3>
              <p style={{ color: th.muted, marginBottom: '24px' }}>Supports X-ray, MRI, and CT (JPG, PNG, DICOM simulation)</p>
              
              <button style={{
                background: th.accentGradient,
                color: '#fff',
                border: 'none',
                padding: '12px 28px',
                borderRadius: 12,
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Browse Files
              </button>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/png, image/jpeg, image/jpg" 
                style={{ display: 'none' }} 
              />
            </div>
          ) : (
            /* Image Preview & Analysis Area */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ 
                position: 'relative', 
                maxWidth: '100%', 
                borderRadius: 16, 
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                backgroundColor: '#000' // Dark background for medical images
              }}>
                <img 
                  src={imagePreview} 
                  alt="Medical Scan" 
                  style={{ 
                    maxHeight: '600px', 
                    width: 'auto', 
                    display: 'block',
                    opacity: isAnalyzing ? 0.7 : 1,
                    transition: 'opacity 0.3s ease',
                    filter: isAnalyzing ? 'contrast(1.2) brightness(0.9)' : 'none'
                  }} 
                />
                
                {/* Overlay layer to ensure effects are contained to the image boundaries */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                  {isAnalyzing && <div style={scanLineStyle}></div>}
                  
                  {isAnalyzing && (
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      background: 'radial-gradient(circle at center, transparent 30%, rgba(59, 130, 246, 0.1) 100%)',
                      animation: 'pulse-bg 2s infinite alternate'
                    }}></div>
                  )}

                  {analysisComplete && analysisResult?.detected_anomaly && (
                    <div style={boundingBoxStyle}>
                      <div style={labelStyle}>
                        ⚠️ Anomaly Detected - {analysisResult?.confidence_score}% Confidence
                      </div>
                    </div>
                  )}
                  {analysisComplete && !analysisResult?.detected_anomaly && (
                    <div style={{ ...boundingBoxStyle, borderColor: '#22c55e', boxShadow: '0 0 15px rgba(34,197,94,0.5)', backgroundColor: 'transparent', animation: 'none' }}>
                      <div style={{ ...labelStyle, background: '#22c55e' }}>
                        ✅ No Anomalies Detected
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div style={{ marginTop: 32, display: 'flex', gap: 16 }}>
                {!analysisComplete && !isAnalyzing && (
                  <button onClick={startAnalysis} style={{
                    background: th.accentGradient,
                    color: '#fff',
                    border: 'none',
                    padding: '14px 32px',
                    borderRadius: 12,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    ✨ Run AI Analysis
                  </button>
                )}

                {isAnalyzing && (
                  <button disabled style={{
                    background: th.cardSolid,
                    color: th.accent2,
                    border: '2px solid ' + th.accent2,
                    padding: '12px 32px',
                    borderRadius: 12,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    cursor: 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing Scan...
                  </button>
                )}

                {(analysisComplete || imagePreview) && !isAnalyzing && (
                  <button onClick={resetAnalysis} style={{
                    background: th.inputBg,
                    color: th.text,
                    border: '1px solid ' + th.border,
                    padding: '14px 24px',
                    borderRadius: 12,
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = th.inputBg}
                  >
                    Upload New Image
                  </button>
                )}
              </div>

              {analysisComplete && analysisResult && (
                <div style={{
                  marginTop: 24,
                  padding: 24,
                  background: darkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  ...(!analysisResult.detected_anomaly && {
                    background: darkMode ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.05)',
                    border: '1px solid rgba(34, 197, 94, 0.3)'
                  }),
                  borderRadius: 16,
                  maxWidth: 600,
                  width: '100%'
                }}>
                  <h4 style={{ color: analysisResult.detected_anomaly ? '#ef4444' : '#22c55e', fontSize: '1.2rem', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>🔬</span> Analysis Report
                  </h4>
                  <p style={{ color: th.text, margin: '0 0 12px 0', lineHeight: 1.5 }}>
                    {analysisResult.analysis_text}
                  </p>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ background: th.cardSolid, padding: '8px 16px', borderRadius: 8, fontSize: '0.9rem', border: '1px solid ' + th.border }}>
                      <span style={{ color: th.muted }}>Confidence:</span> <strong style={{ color: th.text }}>{analysisResult.confidence_score}%</strong>
                    </div>
                    <div style={{ background: th.cardSolid, padding: '8px 16px', borderRadius: 8, fontSize: '0.9rem', border: '1px solid ' + th.border }}>
                      <span style={{ color: th.muted }}>Severity:</span> <strong style={{ color: analysisResult.detected_anomaly ? '#f59e0b' : '#22c55e' }}>{analysisResult.severity}</strong>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: th.muted, marginTop: 16, marginBottom: 0 }}>
                    * This analysis is powered by Gemini Vision API. Always consult a certified radiologist for medical diagnosis.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

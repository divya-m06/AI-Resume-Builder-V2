import { useState, useRef } from 'react'
import jsPDF from 'jspdf'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { generateCoverLetter, apiFetch } from '../services/api'

export default function CoverLetter() {
  const [formData, setFormData] = useState({
    full_name: "",
    job_role: "",
    skills: "",
    experience: "",
    company: ""
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  
  const printRef = useRef()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleGenerate = async () => {
    if (!formData.full_name.trim() || !formData.job_role.trim() || !formData.skills.trim() || !formData.experience.trim()) {
      setError("Please fill in all required fields (Name, Role, Skills, Experience).")
      return
    }
    
    setLoading(true)
    setError(null)
    setResult(null)
    setCopied(false)
    
    try {
      const data = await generateCoverLetter({
        full_name: formData.full_name,
        job_title: formData.job_role,
        skills: formData.skills,
        work_experience: formData.experience,
        company_name: formData.company
      })
      if (data?.cover_letter) {
        setResult(data.cover_letter)
      } else {
        throw new Error("Could not generate cover letter.")
      }
    } catch (err) {
      setError(err?.message || "Something went wrong. Make sure the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const downloadPDF = () => {
    if (!result) return;
    const doc = new jsPDF()
    const lines = doc.splitTextToSize(result, 180)
    doc.setFontSize(12)
    doc.text(lines, 15, 20)
    doc.save('cover-letter.pdf')
  }

  return (
    <div style={{ fontFamily: "Montserrat, sans-serif" }}>
      <Navbar page="app" />

      {/* Header Bar */}
      <header style={{
        background: "var(--brand-charcoal)",
        padding: "52px 40px",
        paddingTop: "72px",
        textAlign: "center"
      }}>
        <h1 style={{
          fontSize: "34px",
          fontWeight: "800",
          color: "var(--brand-cream)",
          margin: "0 0 8px 0"
        }}>
          Cover Letter Generator
        </h1>
        <p style={{
          fontSize: "16px",
          color: "var(--brand-olive-lt)",
          margin: 0
        }}>
          Generate a professional cover letter tailored to your target role
        </p>
      </header>

      {/* Content */}
      <main style={{
        background: "var(--section-bg)",
        padding: "48px 24px",
        minHeight: "calc(100vh - 250px)"
      }}>
        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "32px"
        }}>
          
          {/* Form Card */}
          <div style={{
            background: "white",
            borderRadius: "16px",
            border: "1px solid #ebebeb",
            padding: "32px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)"
          }}>
            <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: 0 }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--brand-charcoal)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ebebeb', fontFamily: 'Montserrat, sans-serif', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--brand-charcoal)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                  Target Job Role
                </label>
                <input
                  type="text"
                  name="job_role"
                  value={formData.job_role}
                  onChange={handleInputChange}
                  placeholder="e.g. Software Engineer"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ebebeb', fontFamily: 'Montserrat, sans-serif', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--brand-charcoal)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                  Your Skills
                </label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="e.g. Python, React, FastAPI, SQL"
                  rows="3"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ebebeb', fontFamily: 'Montserrat, sans-serif', fontSize: '14px', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--brand-charcoal)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                  Work Experience
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Briefly describe your experience and projects"
                  rows="4"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ebebeb', fontFamily: 'Montserrat, sans-serif', fontSize: '14px', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: 'var(--brand-charcoal)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                  Company Name (Optional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Leave blank for a general cover letter"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ebebeb', fontFamily: 'Montserrat, sans-serif', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  background: 'var(--brand-olive)',
                  color: 'white',
                  borderRadius: '40px',
                  padding: '14px',
                  fontSize: '16px',
                  fontWeight: '700',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  marginTop: '8px',
                  fontFamily: 'Montserrat, sans-serif'
                }}
              >
                {loading ? "Generating..." : "Generate Cover Letter"}
              </button>

              {error && (
                <div style={{
                  background: "rgba(193,18,31,0.08)",
                  borderLeft: "4px solid #c1121f",
                  color: "#c1121f",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  marginTop: "8px"
                }}>
                  {error}
                </div>
              )}
            </form>
          </div>

          {/* Result Section */}
          {result && (
            <div style={{
              background: "white",
              borderRadius: "16px",
              border: "1px solid #ebebeb",
              padding: "32px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)"
            }}>
              <h2 style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "var(--brand-charcoal)",
                margin: "0 0 24px 0"
              }}>
                Your Cover Letter
              </h2>
              
              <div 
                ref={printRef}
                style={{
                  background: "#fdfdfc",
                  border: "1px solid #ebebeb",
                  borderRadius: "12px",
                  padding: "24px",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "var(--brand-charcoal)",
                  whiteSpace: "pre-wrap",
                  marginBottom: "24px",
                  fontFamily: "Arial, sans-serif" // Standard font for the actual letter body
                }}
              >
                {result}
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  onClick={handleCopy}
                  style={{
                    flex: 1,
                    minWidth: '200px',
                    background: 'transparent',
                    color: 'var(--brand-olive)',
                    border: '2px solid var(--brand-olive)',
                    borderRadius: '40px',
                    padding: '12px 24px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: 'Montserrat, sans-serif',
                    transition: 'all 0.2s'
                  }}
                >
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </button>
                
                <button
                  onClick={downloadPDF}
                  style={{
                    flex: 1,
                    minWidth: '200px',
                    background: 'var(--brand-olive)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '40px',
                    padding: '12px 24px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                >
                  Download as PDF
                </button>
              </div>
            </div>
          )}

        </div>
      </main>
      
      <Footer />
    </div>
  )
}

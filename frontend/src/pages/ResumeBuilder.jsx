import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { apiFetch, getStoredUser, saveResume } from "../services/api";

export default function ResumeBuilder() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [formData, setFormData] = useState({
    job_role: "",
    education: "",
    experience: "",
    skills: "",
    projects: "",
    previous_company: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleDownload = async (format) => {
    if (!fullName || !formData.job_role || !formData.skills) {
      setError("Please fill in at least your name, job role, and skills.")
      return
    }
    setLoading(true)
    setError(null)
    try {
      const skillsArray = formData.skills.split(",").map((s) => s.trim()).filter(Boolean)
      const downloadPayload = {
        ...formData,
        full_name: fullName,
        email,
        phone,
        skills: skillsArray,
      }

      const user = getStoredUser()
      if (user) {
        try {
          await saveResume({
            userid: user.userid,
            full_name: fullName,
            job_title: formData.job_role,
            resume_data: downloadPayload,
          })
        } catch {
          /* ignore save failures — still download */
        }
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/resume/download-${format}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(downloadPayload)
        }
      )
      if (!response.ok) throw new Error("Failed to generate resume")
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `resume_${fullName.replace(" ", "_")}.${format === "pdf" ? "pdf" : "docx"}`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      setError("Something went wrong. Make sure the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar page="app" />

      {/* Header Bar */}
      <header style={{
        background: "var(--brand-charcoal)",
        padding: "52px 40px",
        paddingTop: "72px",
        textAlign: "center"
      }} className="resume-builder-header">
        <h1 style={{
          fontSize: "34px",
          fontWeight: "800",
          color: "var(--brand-cream)",
          marginBottom: "8px"
        }} className="resume-builder-heading">
          Build Your Resume
        </h1>
        <p style={{
          fontSize: "16px",
          color: "var(--brand-olive-lt)"
        }}>
          Fill in your details below and download your professional resume instantly.
        </p>
      </header>

      {/* Content Area */}
      <main style={{
        background: "var(--section-bg)",
        padding: "48px 24px"
      }} className="resume-builder-content">
        <div style={{
          maxWidth: "760px",
          margin: "0 auto"
        }}>
          {/* Personal Information Card */}
          <div style={{
            background: "white",
            borderRadius: "16px",
            border: "1px solid #ebebeb",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            padding: "28px 32px",
            marginBottom: "20px"
          }} className="form-card">
            <h2 style={{
              fontSize: "16px",
              fontWeight: "700",
              marginBottom: "20px"
            }}>
              Personal Information
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px"
            }} className="personal-info-grid">
              <div>
                <label style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--brand-charcoal)",
                  display: "block",
                  marginBottom: "8px"
                }}>
                  Full Name
                </label>
                <input
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1.5px solid #e0e0d8",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontFamily: "Montserrat",
                    background: "#fafaf8",
                    color: "var(--brand-charcoal)",
                    outline: "none"
                  }}
                />
              </div>
              <div>
                <label style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--brand-charcoal)",
                  display: "block",
                  marginBottom: "8px"
                }}>
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1.5px solid #e0e0d8",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontFamily: "Montserrat",
                    background: "#fafaf8",
                    color: "var(--brand-charcoal)",
                    outline: "none"
                  }}
                />
              </div>
              <div>
                <label style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "var(--brand-charcoal)",
                  display: "block",
                  marginBottom: "8px"
                }}>
                  Phone
                </label>
                <input
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1.5px solid #e0e0d8",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontFamily: "Montserrat",
                    background: "#fafaf8",
                    color: "var(--brand-charcoal)",
                    outline: "none"
                  }}
                />
              </div>
            </div>
          </div>

          {/* Target Role Card */}
          <div style={{
            background: "white",
            borderRadius: "16px",
            border: "1px solid #ebebeb",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            padding: "28px 32px",
            marginBottom: "20px"
          }} className="form-card">
            <h2 style={{
              fontSize: "16px",
              fontWeight: "700",
              marginBottom: "20px"
            }}>
              Target Role
            </h2>
            <div>
              <label style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--brand-charcoal)",
                display: "block",
                marginBottom: "8px"
              }}>
                Job Role
              </label>
              <textarea
                value={formData.job_role}
                onChange={(e) => handleInputChange('job_role', e.target.value)}
                placeholder="e.g. Data Scientist, Frontend Developer..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1.5px solid #e0e0d8",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontFamily: "Montserrat",
                  background: "#fafaf8",
                  color: "var(--brand-charcoal)",
                  outline: "none",
                  minHeight: "80px",
                  resize: "vertical"
                }}
              />
            </div>
          </div>

          {/* Education Card */}
          <div style={{
            background: "white",
            borderRadius: "16px",
            border: "1px solid #ebebeb",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            padding: "28px 32px",
            marginBottom: "20px"
          }} className="form-card">
            <h2 style={{
              fontSize: "16px",
              fontWeight: "700",
              marginBottom: "20px"
            }}>
              Education
            </h2>
            <div>
              <label style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--brand-charcoal)",
                display: "block",
                marginBottom: "8px"
              }}>
                Education
              </label>
              <textarea
                value={formData.education}
                onChange={(e) => handleInputChange('education', e.target.value)}
                placeholder="e.g. BE in Computer Science, CGPA 8.5, ABC College..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1.5px solid #e0e0d8",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontFamily: "Montserrat",
                  background: "#fafaf8",
                  color: "var(--brand-charcoal)",
                  outline: "none",
                  minHeight: "80px",
                  resize: "vertical"
                }}
              />
            </div>
          </div>

          {/* Experience Card */}
          <div style={{
            background: "white",
            borderRadius: "16px",
            border: "1px solid #ebebeb",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            padding: "28px 32px",
            marginBottom: "20px"
          }} className="form-card">
            <h2 style={{
              fontSize: "16px",
              fontWeight: "700",
              marginBottom: "20px"
            }}>
              Work Experience
            </h2>
            <div>
              <label style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--brand-charcoal)",
                display: "block",
                marginBottom: "8px"
              }}>
                Experience
              </label>
              <textarea
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                placeholder="e.g. Software Intern at XYZ, built REST APIs using Python..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1.5px solid #e0e0d8",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontFamily: "Montserrat",
                  background: "#fafaf8",
                  color: "var(--brand-charcoal)",
                  outline: "none",
                  minHeight: "80px",
                  resize: "vertical"
                }}
              />
            </div>
          </div>

          {/* Skills Card */}
          <div style={{
            background: "white",
            borderRadius: "16px",
            border: "1px solid #ebebeb",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            padding: "28px 32px",
            marginBottom: "20px"
          }} className="form-card">
            <h2 style={{
              fontSize: "16px",
              fontWeight: "700",
              marginBottom: "20px"
            }}>
              Skills
            </h2>
            <div>
              <label style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--brand-charcoal)",
                display: "block",
                marginBottom: "8px"
              }}>
                Skills
              </label>
              <textarea
                value={formData.skills}
                onChange={(e) => handleInputChange('skills', e.target.value)}
                placeholder="e.g. Python, React, SQL, Machine Learning, Docker..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1.5px solid #e0e0d8",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontFamily: "Montserrat",
                  background: "#fafaf8",
                  color: "var(--brand-charcoal)",
                  outline: "none",
                  minHeight: "80px",
                  resize: "vertical"
                }}
              />
            </div>
          </div>

          {/* Projects Card */}
          <div style={{
            background: "white",
            borderRadius: "16px",
            border: "1px solid #ebebeb",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            padding: "28px 32px",
            marginBottom: "20px"
          }} className="form-card">
            <h2 style={{
              fontSize: "16px",
              fontWeight: "700",
              marginBottom: "20px"
            }}>
              Projects
            </h2>
            <div>
              <label style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--brand-charcoal)",
                display: "block",
                marginBottom: "8px"
              }}>
                Projects
              </label>
              <textarea
                value={formData.projects}
                onChange={(e) => handleInputChange('projects', e.target.value)}
                placeholder="e.g. Built an AI chatbot using Python and NLP..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1.5px solid #e0e0d8",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontFamily: "Montserrat",
                  background: "#fafaf8",
                  color: "var(--brand-charcoal)",
                  outline: "none",
                  minHeight: "80px",
                  resize: "vertical"
                }}
              />
            </div>
          </div>

          {/* Previous Company Card */}
          <div style={{
            background: "white",
            borderRadius: "16px",
            border: "1px solid #ebebeb",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            padding: "28px 32px",
            marginBottom: "20px"
          }} className="form-card">
            <h2 style={{
              fontSize: "16px",
              fontWeight: "700",
              marginBottom: "20px"
            }}>
              Previous Company
            </h2>
            <div>
              <label style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--brand-charcoal)",
                display: "block",
                marginBottom: "8px"
              }}>
                Previous Company
              </label>
              <textarea
                value={formData.previous_company}
                onChange={(e) => handleInputChange('previous_company', e.target.value)}
                placeholder="e.g. Google, Software Engineer, 2 years, built..."
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1.5px solid #e0e0d8",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontFamily: "Montserrat",
                  background: "#fafaf8",
                  color: "var(--brand-charcoal)",
                  outline: "none",
                  minHeight: "80px",
                  resize: "vertical"
                }}
              />
            </div>
          </div>

          {/* Submit Section */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            marginTop: "32px"
          }} className="download-buttons">
            <button
              onClick={() => handleDownload("pdf")}
              disabled={loading}
              style={{
                background: "var(--brand-olive)",
                color: "white",
                borderRadius: "40px",
                padding: "14px 36px",
                fontSize: "15px",
                fontWeight: "700",
                cursor: loading ? "not-allowed" : "pointer",
                border: "none",
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? "Generating..." : "Download PDF"}
            </button>
            <button
              onClick={() => handleDownload("docx")}
              disabled={loading}
              style={{
                background: "transparent",
                border: "1.5px solid var(--brand-olive)",
                color: "var(--brand-olive-dk)",
                borderRadius: "40px",
                padding: "14px 36px",
                fontSize: "15px",
                fontWeight: "700",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? "Generating..." : "Download DOCX"}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background: "rgba(193,18,31,0.08)",
              borderLeft: "4px solid #c1121f",
              color: "#c1121f",
              borderRadius: "8px",
              padding: "14px 18px",
              fontSize: "14px",
              marginTop: "16px"
            }}>
              {error}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
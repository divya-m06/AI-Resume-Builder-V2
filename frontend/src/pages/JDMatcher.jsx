import { useState } from 'react'
import Navbar from '../components/Navbar'
import { analyzeJD } from '../services/api'

export default function JDMatcher() {
  const [jdText, setJdText] = useState("")
  const [resumeText, setResumeText] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAnalyze = async () => {
    if (!jdText.trim() || !resumeText.trim()) {
      setError("Please fill in both job description and resume text.")
      return
    }
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await analyzeJD(jdText, resumeText)
      setResult(data)
    } catch (err) {
      setError(err?.message || "Something went wrong. Make sure the backend is running.")
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
      }} className="skill-gap-header">
        <h1 style={{
          fontSize: "34px",
          fontWeight: "800",
          color: "var(--brand-cream)",
          marginBottom: "8px"
        }} className="skill-gap-heading">
          JD Keyword Matcher
        </h1>
        <p style={{
          fontSize: "16px",
          color: "var(--brand-olive-lt)"
        }}>
          See how well your resume matches a job description
        </p>
      </header>

      {/* Content */}
      <main style={{
        background: "var(--section-bg)",
        padding: "48px 24px"
      }}>
        <div style={{
          maxWidth: "1000px",
          margin: "0 auto"
        }}>
          {/* Input Section */}
          <div style={{
            background: "white",
            borderRadius: "16px",
            border: "1px solid #ebebeb",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            padding: "28px 32px",
            marginBottom: "24px"
          }}>
            <form onSubmit={(e) => e.preventDefault()} style={{ margin: 0 }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "24px",
              marginBottom: "32px"
            }}>
              {/* Job Description */}
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
                  Job Description
                </label>
                <textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste the job description here..."
                  style={{
                    width: "100%",
                    minHeight: "220px",
                    border: "1px solid #ebebeb",
                    borderRadius: "12px",
                    fontFamily: "Montserrat",
                    padding: "16px",
                    fontSize: "14px",
                    resize: "vertical",
                    outline: "none",
                    background: "white",
                    color: "var(--brand-charcoal)"
                  }}
                />
              </div>

              {/* Resume Text */}
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
                  Your Resume
                </label>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume text here..."
                  style={{
                    width: "100%",
                    minHeight: "220px",
                    border: "1px solid #ebebeb",
                    borderRadius: "12px",
                    fontFamily: "Montserrat",
                    padding: "16px",
                    fontSize: "14px",
                    resize: "vertical",
                    outline: "none",
                    background: "white",
                    color: "var(--brand-charcoal)"
                  }}
                />
              </div>
            </div>

            {/* Analyze Button */}
            <div style={{ textAlign: "center" }}>
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={loading || !jdText.trim() || !resumeText.trim()}
                style={{
                  background: "var(--brand-olive)",
                  color: "white",
                  borderRadius: "40px",
                  padding: "14px 36px",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: loading || !jdText.trim() || !resumeText.trim() ? "not-allowed" : "pointer",
                  border: "none",
                  opacity: loading || !jdText.trim() || !resumeText.trim() ? 0.6 : 1
                }}
              >
                {loading ? "Analyzing..." : "Analyze Match"}
              </button>
            </div>
            </form>
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
              marginBottom: "24px"
            }}>
              {error}
            </div>
          )}

          {/* Results Section */}
          {result && (
            <div>
              {/* Match Score */}
              <div style={{
                background: "white",
                borderRadius: "16px",
                border: "1px solid #ebebeb",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                padding: "32px",
                textAlign: "center",
                marginBottom: "24px"
              }}>
                <div style={{
                  fontSize: "48px",
                  fontWeight: "800",
                  color: "var(--brand-olive)",
                  marginBottom: "8px"
                }}>
                  {result.score}%
                </div>
                <div style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--brand-charcoal)"
                }}>
                  Keyword Match Score
                </div>
              </div>

              {/* Keywords */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                gap: "24px",
                marginBottom: "24px"
              }}>
                {/* Matched Keywords */}
                <div style={{
                  background: "white",
                  borderRadius: "16px",
                  border: "1px solid #ebebeb",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  padding: "28px"
                }}>
                  <h3 style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    marginBottom: "16px",
                    color: "var(--brand-charcoal)"
                  }}>
                    Matched Keywords
                  </h3>
                  <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px"
                  }}>
                    {result.matched.map((keyword, index) => (
                      <span key={index} style={{
                        background: "var(--brand-olive-lt)",
                        color: "var(--brand-olive-dk)",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "600"
                      }}>
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div style={{
                  background: "white",
                  borderRadius: "16px",
                  border: "1px solid #ebebeb",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  padding: "28px"
                }}>
                  <h3 style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    marginBottom: "16px",
                    color: "var(--brand-charcoal)"
                  }}>
                    Missing Keywords
                  </h3>
                  <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px"
                  }}>
                    {result.missing.map((keyword, index) => (
                      <span key={index} style={{
                        background: "#ebebeb",
                        color: "var(--brand-charcoal)",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "600"
                      }}>
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Suggestion */}
              <div style={{
                background: "var(--section-bg)",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid #ebebeb"
              }}>
                <p style={{
                  fontSize: "15px",
                  lineHeight: "1.6",
                  color: "var(--brand-charcoal)",
                  margin: 0
                }}>
                  {result.suggestion}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
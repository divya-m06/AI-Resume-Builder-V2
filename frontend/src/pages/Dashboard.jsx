import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div style={{ fontFamily: "Montserrat, sans-serif" }}>
      {/* Navbar */}
      <Navbar page="app" />

      {/* Header Bar */}
      <header style={{
        background: "var(--brand-charcoal)",
        padding: "52px 40px",
        paddingTop: "72px",
        textAlign: "center"
      }} className="dashboard-header">
        <h1 style={{
          fontSize: "34px",
          fontWeight: "800",
          color: "var(--brand-cream)",
          marginBottom: "8px"
        }} className="dashboard-heading">
          {user ? `Welcome, ${(user.email?.split("@")[0]) || user.userid || user.name || "User"}` : "Welcome Back"}
        </h1>
        <p style={{
          fontSize: "16px",
          color: "var(--brand-olive-lt)",
          margin: 0
        }}>
          What would you like to do today?
        </p>
      </header>

      {/* Content Area */}
      <main style={{
        background: "var(--section-bg)",
        padding: "48px 24px"
      }} className="dashboard-content">
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto"
        }}>
          {/* Feature Cards Grid */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "24px",
            marginBottom: "60px"
          }} className="feature-cards-grid">
            {/* Resume Builder Card */}
            <div style={{
              background: "white",
              borderRadius: "16px",
              border: "1px solid #ebebeb",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              padding: "36px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "calc(33.333% - 16px)",
              minWidth: "300px"
            }} className="feature-card">
              <div style={{
                fontSize: "10px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--brand-olive)",
                background: "rgba(125,155,118,0.1)",
                padding: "3px 10px",
                borderRadius: "20px",
                alignSelf: "flex-start"
              }}>
                AI POWERED
              </div>
              <h3 style={{
                fontSize: "22px",
                fontWeight: "800",
                color: "var(--brand-charcoal)",
                margin: 0
              }}>
                Build Your Resume
              </h3>
              <p style={{
                fontSize: "14px",
                color: "#666",
                lineHeight: "1.7",
                margin: 0,
                flex: 1
              }}>
                Fill in your details and generate a professional resume instantly. Download as PDF or DOCX.
              </p>
              <Link
                to="/resume-builder"
                style={{
                  background: "var(--brand-olive)",
                  color: "white",
                  borderRadius: "40px",
                  padding: "12px 28px",
                  fontWeight: "600",
                  fontSize: "15px",
                  textDecoration: "none",
                  display: "inline-block",
                  alignSelf: "flex-start"
                }}
              >
                Start Building
              </Link>
            </div>

            {/* Skill Gap Analysis Card */}
            <div style={{
              background: "white",
              borderRadius: "16px",
              border: "1px solid #ebebeb",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              padding: "36px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "calc(33.333% - 16px)",
              minWidth: "300px"
            }} className="feature-card">
              <div style={{
                fontSize: "10px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--brand-olive)",
                background: "rgba(125,155,118,0.1)",
                padding: "3px 10px",
                borderRadius: "20px",
                alignSelf: "flex-start"
              }}>
                UPLOAD RESUME
              </div>
              <h3 style={{
                fontSize: "22px",
                fontWeight: "800",
                color: "var(--brand-charcoal)",
                margin: 0
              }}>
                Analyze Skill Gap
              </h3>
              <p style={{
                fontSize: "14px",
                color: "#666",
                lineHeight: "1.7",
                margin: 0,
                flex: 1
              }}>
                Upload your resume and select a target job role. See your score, missing skills, courses, and a personalized learning roadmap.
              </p>
              <Link
                to="/skill-gap"
                style={{
                  background: "var(--brand-olive)",
                  color: "white",
                  borderRadius: "40px",
                  padding: "12px 28px",
                  fontWeight: "600",
                  fontSize: "15px",
                  textDecoration: "none",
                  display: "inline-block",
                  alignSelf: "flex-start"
                }}
              >
                Analyze Now
              </Link>
            </div>

            {/* JD Keyword Matcher Card */}
            <div style={{
              background: "white",
              borderRadius: "16px",
              border: "1px solid #ebebeb",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              padding: "36px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "calc(33.333% - 16px)",
              minWidth: "300px"
            }} className="feature-card">
              <div style={{
                fontSize: "10px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--brand-olive)",
                background: "rgba(125,155,118,0.1)",
                padding: "3px 10px",
                borderRadius: "20px",
                alignSelf: "flex-start"
              }}>
                SMART MATCH
              </div>
              <h3 style={{
                fontSize: "22px",
                fontWeight: "800",
                color: "var(--brand-charcoal)",
                margin: 0
              }}>
                Match Job Description
              </h3>
              <p style={{
                fontSize: "14px",
                color: "#666",
                lineHeight: "1.7",
                margin: 0,
                flex: 1
              }}>
                Paste a job description and upload your resume. Get a match score, keyword analysis, and project suggestions.
              </p>
              <Link
                to="/jd-matcher"
                style={{
                  background: "var(--brand-olive)",
                  color: "white",
                  borderRadius: "40px",
                  padding: "12px 28px",
                  fontWeight: "600",
                  fontSize: "15px",
                  textDecoration: "none",
                  display: "inline-block",
                  alignSelf: "flex-start"
                }}
              >
                Match Now
              </Link>
            </div>

            {/* Cover Letter Card */}
            <div style={{
              background: "white",
              borderRadius: "16px",
              border: "1px solid #ebebeb",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              padding: "36px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "calc(33.333% - 16px)",
              minWidth: "300px"
            }} className="feature-card">
              <div style={{
                fontSize: "10px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--brand-olive)",
                background: "rgba(125,155,118,0.1)",
                padding: "3px 10px",
                borderRadius: "20px",
                alignSelf: "flex-start"
              }}>
                AI POWERED
              </div>
              <h3 style={{
                fontSize: "22px",
                fontWeight: "800",
                color: "var(--brand-charcoal)",
                margin: 0
              }}>
                Generate Cover Letter
              </h3>
              <p style={{
                fontSize: "14px",
                color: "#666",
                lineHeight: "1.7",
                margin: 0,
                flex: 1
              }}>
                Create personalized cover letters tailored to specific job applications. Highlight your skills and experience.
              </p>
              <Link
                to="/cover-letter"
                style={{
                  background: "var(--brand-olive)",
                  color: "white",
                  borderRadius: "40px",
                  padding: "12px 28px",
                  fontWeight: "600",
                  fontSize: "15px",
                  textDecoration: "none",
                  display: "inline-block",
                  alignSelf: "flex-start"
                }}
              >
                Create Letter
              </Link>
            </div>

            {/* My Resumes Card */}
            <div style={{
              background: "white",
              borderRadius: "16px",
              border: "1px solid #ebebeb",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              padding: "36px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              width: "calc(33.333% - 16px)",
              minWidth: "300px"
            }} className="feature-card">
              <div style={{
                fontSize: "10px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--brand-olive)",
                background: "rgba(125,155,118,0.1)",
                padding: "3px 10px",
                borderRadius: "20px",
                alignSelf: "flex-start"
              }}>
                YOUR HISTORY
              </div>
              <h3 style={{
                fontSize: "22px",
                fontWeight: "800",
                color: "var(--brand-charcoal)",
                margin: 0
              }}>
                My Resumes
              </h3>
              <p style={{
                fontSize: "14px",
                color: "#666",
                lineHeight: "1.7",
                margin: 0,
                flex: 1
              }}>
                View and download all your previously generated resumes. Access your career history anytime.
              </p>
              <Link
                to="/my-resumes"
                style={{
                  background: "var(--brand-olive)",
                  color: "white",
                  borderRadius: "40px",
                  padding: "12px 28px",
                  fontWeight: "600",
                  fontSize: "15px",
                  textDecoration: "none",
                  display: "inline-block",
                  alignSelf: "flex-start"
                }}
              >
                View Resumes
              </Link>
            </div>
          </div>

          {/* How It Works Section */}
          <section style={{
            padding: "60px 0",
            textAlign: "center"
          }}>
            <h2 style={{
              fontSize: "28px",
              fontWeight: "800",
              color: "var(--brand-charcoal)",
              marginBottom: "40px"
            }}>
              How It Works
            </h2>

            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "48px",
              flexWrap: "wrap"
            }} className="how-it-works-steps">
              {/* Step 1 */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
                maxWidth: "200px"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "2px solid var(--brand-olive)",
                  color: "var(--brand-olive)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  fontWeight: "800"
                }}>
                  1
                </div>
                <h4 style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "var(--brand-charcoal)",
                  margin: 0
                }}>
                  Fill Details
                </h4>
                <p style={{
                  fontSize: "13px",
                  color: "#666",
                  margin: 0,
                  lineHeight: "1.5"
                }}>
                  Enter your info, skills, and target role
                </p>
              </div>

              {/* Step 2 */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
                maxWidth: "200px"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "2px solid var(--brand-olive)",
                  color: "var(--brand-olive)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  fontWeight: "800"
                }}>
                  2
                </div>
                <h4 style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "var(--brand-charcoal)",
                  margin: 0
                }}>
                  AI Analysis
                </h4>
                <p style={{
                  fontSize: "13px",
                  color: "#666",
                  margin: 0,
                  lineHeight: "1.5"
                }}>
                  Our AI analyzes gaps and generates your roadmap
                </p>
              </div>

              {/* Step 3 */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
                maxWidth: "200px"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "2px solid var(--brand-olive)",
                  color: "var(--brand-olive)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "18px",
                  fontWeight: "800"
                }}>
                  3
                </div>
                <h4 style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "var(--brand-charcoal)",
                  margin: 0
                }}>
                  Download & Apply
                </h4>
                <p style={{
                  fontSize: "13px",
                  color: "#666",
                  margin: 0,
                  lineHeight: "1.5"
                }}>
                  Download your resume and start applying
                </p>
              </div>
            </div>
          </section>

          {/* Quick Stats Section */}
          <section style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            flexWrap: "wrap"
          }} className="stats-grid">
            {/* Stat 1 */}
            <div style={{
              background: "white",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
              minWidth: "160px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
            }} className="stat-card">
              <div style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "var(--brand-olive)",
                marginBottom: "4px"
              }}>
                16+
              </div>
              <div style={{
                fontSize: "13px",
                color: "#666"
              }}>
                Job Roles Supported
              </div>
              <div style={{
                fontSize: "11px",
                color: "#aaa",
                marginTop: "2px"
              }}>
                From Software Developer to AI Engineer
              </div>
            </div>

            {/* Stat 2 */}
            <div style={{
              background: "white",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
              minWidth: "160px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
            }} className="stat-card">
              <div style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "var(--brand-olive)",
                marginBottom: "4px"
              }}>
                AI Powered
              </div>
              <div style={{
                fontSize: "13px",
                color: "#666"
              }}>
                Learning Roadmap
              </div>
              <div style={{
                fontSize: "11px",
                color: "#aaa",
                marginTop: "2px"
              }}>
                Personalized week-by-week plan using Groq LLM
              </div>
            </div>

            {/* Stat 3 */}
            <div style={{
              background: "white",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
              minWidth: "160px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
            }} className="stat-card">
              <div style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "var(--brand-olive)",
                marginBottom: "4px"
              }}>
                4-in-1
              </div>
              <div style={{
                fontSize: "13px",
                color: "#666"
              }}>
                Career Toolkit
              </div>
              <div style={{
                fontSize: "11px",
                color: "#aaa",
                marginTop: "2px"
              }}>
                Resume Builder, Skill Gap Analyzer, JD Matcher, Cover Letter
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
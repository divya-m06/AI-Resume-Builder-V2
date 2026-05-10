import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"

export default function Landing() {
  return (
    <div style={{ fontFamily: "Montserrat, sans-serif" }}>
      <Navbar page="landing" />

      {/* Hero Section */}
      <section style={{
        background: "var(--brand-charcoal)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "72px"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "80px 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "center"
        }} className="hero-grid hero-padding">
          {/* Left Content */}
          <div>
            <div style={{
              background: "rgba(125, 155, 118, 0.1)",
              border: "1px solid var(--brand-olive)",
              color: "var(--brand-olive)",
              borderRadius: "30px",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.12em",
              padding: "6px 16px",
              display: "inline-block",
              marginBottom: "24px",
              textTransform: "uppercase"
            }}>
              AI-POWERED CAREER TOOLS
            </div>

            <h1 style={{
              fontSize: "52px",
              fontWeight: "800",
              color: "var(--brand-cream)",
              letterSpacing: "-1.5px",
              lineHeight: "1.08",
              marginBottom: "16px"
            }} className="hero-heading">
              Build a Resume That<br />
              <span style={{ color: "var(--brand-olive)" }}>Gets You Hired.</span>
            </h1>

            <p style={{
              fontSize: "17px",
              color: "var(--brand-cream2)",
              maxWidth: "480px",
              lineHeight: "1.7",
              marginBottom: "32px"
            }} className="hero-subtext">
              AI-powered resume builder with skill gap analysis, JD keyword matching, and personalized project recommendations.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }} className="hero-buttons">
              <Link
                to="/login"
                style={{
                  background: "var(--brand-olive)",
                  color: "white",
                  borderRadius: "40px",
                  padding: "13px 32px",
                  fontSize: "15px",
                  fontWeight: "600",
                  textDecoration: "none",
                  display: "inline-block"
                }}
              >
                Get Started Free
              </Link>

              <button
                onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}
                style={{
                  background: "transparent",
                  border: "1.5px solid rgba(125, 155, 118, 0.4)",
                  color: "var(--brand-cream2)",
                  borderRadius: "40px",
                  padding: "13px 32px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontFamily: "Montserrat, sans-serif"
                }}
              >
                See Features ↓
              </button>
            </div>
          </div>

          {/* Right Content - Mock Resume Card */}
          <div style={{
            background: "var(--brand-charcoal3)",
            border: "1px solid rgba(125, 155, 118, 0.2)",
            borderRadius: "20px",
            padding: "28px",
            maxWidth: "380px",
            margin: "0 auto"
          }}>
            <div style={{
              borderBottom: "1px solid rgba(125, 155, 118, 0.2)",
              paddingBottom: "20px",
              marginBottom: "24px"
            }}>
              <h3 style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "var(--brand-cream)",
                marginBottom: "4px"
              }}>
                John Doe
              </h3>
              <p style={{
                fontSize: "16px",
                color: "var(--brand-olive)",
                fontWeight: "500"
              }}>
                Software Engineer
              </p>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <h4 style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "var(--brand-cream)",
                marginBottom: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}>
                Skills
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {["Python", "React", "SQL", "Docker"].map(skill => (
                  <span key={skill} style={{
                    background: "rgba(125, 155, 118, 0.1)",
                    color: "var(--brand-olive)",
                    border: "1px solid rgba(125, 155, 118, 0.3)",
                    borderRadius: "20px",
                    padding: "4px 12px",
                    fontSize: "12px",
                    fontWeight: "500"
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "32px" }}>
              <h4 style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "var(--brand-cream)",
                marginBottom: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}>
                Experience
              </h4>
              <p style={{
                fontSize: "14px",
                color: "var(--brand-cream2)",
                lineHeight: "1.5"
              }}>
                Senior Software Engineer at Tech Corp with 5+ years of experience in full-stack development...
              </p>
            </div>

            <button style={{
              background: "var(--brand-olive)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px 24px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              width: "100%",
              fontFamily: "Montserrat, sans-serif"
            }}>
              Download PDF
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" style={{
        background: "var(--section-bg)",
        padding: "100px 0"
      }} className="section-padding">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{
              color: "var(--brand-olive)",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "16px"
            }}>
              SIMPLE. SMART. EFFECTIVE.
            </div>
            <h2 style={{
              fontSize: "38px",
              fontWeight: "800",
              color: "var(--brand-charcoal)",
              marginBottom: "20px"
            }}>
              How It Works
            </h2>
            <p style={{
              fontSize: "17px",
              color: "#666",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: "1.6"
            }}>
              Three steps from resume to dream job.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "32px",
            maxWidth: "1000px",
            margin: "0 auto"
          }} className="how-it-works-grid">
            {[
              {
                number: "01",
                title: "Fill Your Details",
                description: "Enter your personal info, skills, experience, and job role. Takes less than 5 minutes."
              },
              {
                number: "02",
                title: "Analyze Skill Gaps",
                description: "Upload your resume and target role. Our AI identifies exactly what you are missing."
              },
              {
                number: "03",
                title: "Get Your Roadmap",
                description: "Receive a week-by-week AI learning plan with courses and project suggestions."
              }
            ].map((step, index) => (
              <div key={index} style={{
                background: "white",
                border: "1px solid #ebebeb",
                borderRadius: "16px",
                padding: "36px 32px",
                textAlign: "center"
              }}>
                <div style={{
                  fontSize: "48px",
                  color: "rgba(125, 155, 118, 0.2)",
                  fontWeight: "800",
                  marginBottom: "20px",
                  lineHeight: "1"
                }}>
                  {step.number}
                </div>
                <h3 style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "var(--brand-charcoal)",
                  marginBottom: "16px"
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontSize: "15px",
                  color: "#666",
                  lineHeight: "1.6"
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        background: "var(--section-dark)",
        padding: "100px 0"
      }} className="section-padding">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <div style={{
              color: "var(--brand-olive)",
              fontSize: "13px",
              fontWeight: "600",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "16px"
            }}>
              WHAT WE OFFER
            </div>
            <h2 style={{
              fontSize: "38px",
              fontWeight: "800",
              color: "white",
              marginBottom: "20px"
            }}>
              Everything You Need
            </h2>
            <p style={{
              fontSize: "17px",
              color: "var(--brand-cream2)",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: "1.6"
            }}>
              All the tools to build, analyze, and improve your career.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "24px"
          }} className="features-grid">
            {[
              {
                title: "AI Resume Builder",
                description: "Generate a professional resume instantly. Download as PDF or DOCX.",
                badge: "INSTANT"
              },
              {
                title: "Skill Gap Analysis",
                description: "Upload your resume and find exactly what skills you are missing for your target role.",
                badge: "AI POWERED"
              },
              {
                title: "JD Keyword Matcher",
                description: "Paste a job description and see how well your resume matches it with a score.",
                badge: "SMART MATCH"
              },
              {
                title: "Learning Roadmap",
                description: "Get a personalized week-by-week learning plan for your missing skills.",
                badge: "PERSONALIZED"
              },
              {
                title: "Project Suggestions",
                description: "Get project ideas matched to the job description to build your portfolio.",
                badge: "CURATED"
              },
              {
                title: "Interview Prep",
                description: "Practice with role-specific interview questions tailored to your target job.",
                badge: "ROLE SPECIFIC"
              }
            ].map((feature, index) => (
              <div key={index} style={{
                background: "var(--brand-charcoal3)",
                border: "1px solid rgba(125, 155, 118, 0.15)",
                borderRadius: "16px",
                padding: "32px 28px"
              }}>
                <div style={{
                  background: "rgba(125, 155, 118, 0.12)",
                  color: "var(--brand-olive)",
                  borderRadius: "20px",
                  padding: "3px 10px",
                  fontSize: "10px",
                  fontWeight: "600",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  display: "inline-block",
                  marginBottom: "16px"
                }}>
                  {feature.badge}
                </div>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "var(--brand-cream)",
                  marginBottom: "12px"
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: "14px",
                  color: "var(--brand-cream2)",
                  lineHeight: "1.7",
                  margin: 0
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        background: "var(--brand-olive)",
        padding: "100px 0"
      }}>
        <div style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "0 40px",
          textAlign: "center"
        }}>
          <div style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "20px"
          }}>
            YOUR NEXT STEP STARTS HERE
          </div>
          <h2 style={{
            fontSize: "42px",
            fontWeight: "800",
            color: "white",
            lineHeight: "1.15",
            marginBottom: "24px"
          }}>
            Ready to build your resume?
          </h2>
          <p style={{
            fontSize: "18px",
            color: "rgba(255, 255, 255, 0.82)",
            lineHeight: "1.6",
            marginBottom: "40px"
          }}>
            Join thousands of students and professionals building smarter resumes with AI.
          </p>
          <Link
            to="/login"
            style={{
              background: "var(--brand-charcoal)",
              color: "var(--brand-cream)",
              borderRadius: "40px",
              padding: "14px 36px",
              fontSize: "15px",
              fontWeight: "700",
              textDecoration: "none",
              display: "inline-block"
            }}
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Simple Footer */}
      <footer style={{
        background: "var(--brand-charcoal)",
        color: "var(--brand-cream2)",
        padding: "40px 40px 20px",
        fontSize: "13px"
      }}>
        <div style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "32px"
        }}>
          <div>
            <div style={{
              fontSize: "20px",
              fontWeight: "800",
              color: "var(--brand-olive)",
              marginBottom: "16px"
            }}>
              AI Resume Builder
            </div>
            <p style={{ color: "var(--brand-cream2)", lineHeight: "1.6" }}>
              Build smarter resumes with AI-powered tools for career success.
            </p>
          </div>
          <div>
            <h4 style={{
              color: "var(--brand-cream)",
              fontWeight: "700",
              marginBottom: "12px"
            }}>
              Features
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "8px" }}>
                <a href="#" style={{ color: "var(--brand-cream2)", textDecoration: "none" }}>
                  Resume Builder
                </a>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <a href="#" style={{ color: "var(--brand-cream2)", textDecoration: "none" }}>
                  Skill Gap Analysis
                </a>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <a href="#" style={{ color: "var(--brand-cream2)", textDecoration: "none" }}>
                  JD Keyword Matcher
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 style={{
              color: "var(--brand-cream)",
              fontWeight: "700",
              marginBottom: "12px"
            }}>
              Support
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "8px" }}>
                <a href="#" style={{ color: "var(--brand-cream2)", textDecoration: "none" }}>
                  Help Center
                </a>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <a href="#" style={{ color: "var(--brand-cream2)", textDecoration: "none" }}>
                  Contact Us
                </a>
              </li>
              <li style={{ marginBottom: "8px" }}>
                <a href="#" style={{ color: "var(--brand-cream2)", textDecoration: "none" }}>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div style={{
          borderTop: "1px solid rgba(125, 155, 118, 0.2)",
          marginTop: "32px",
          paddingTop: "20px",
          textAlign: "center",
          color: "var(--brand-cream2)"
        }}>
          © 2024 AI Resume Builder. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { API_BASE_URL } from '../config.js'

const ANSWERS = {
  "Explain OOP concepts": "OOP stands for Object-Oriented Programming. The four main concepts are Encapsulation, Inheritance, Polymorphism, and Abstraction.",
  "What is JVM and JDK?": "JVM runs Java bytecode and makes Java platform-independent. JDK is the full development package including JVM, compiler, and tools.",
  "Explain GIL": "The Global Interpreter Lock prevents multiple threads from executing Python bytecode simultaneously, limiting true parallelism in CPU-bound tasks.",
  "What are decorators?": "Decorators are functions that wrap another function to extend its behavior without modifying it, defined using the @decorator syntax.",
  "What is normalization?": "Normalization organizes a database to reduce redundancy through normal forms (1NF, 2NF, 3NF) by dividing tables and defining relationships.",
  "Explain ETL process": "ETL stands for Extract, Transform, Load — extracting data from sources, transforming it into the required format, and loading it into a data warehouse.",
  "Difference between supervised and unsupervised learning": "Supervised learning trains on labeled data to predict outcomes. Unsupervised learning finds patterns in unlabeled data like clustering.",
  "Explain overfitting and underfitting": "Overfitting learns training data too well including noise. Underfitting is when a model is too simple to capture the underlying pattern.",
  "What is DevOps?": "DevOps combines software development and IT operations to shorten the development lifecycle and deliver high quality software continuously.",
  "Explain CI/CD pipeline": "CI automatically builds and tests code on every commit. CD automatically deploys tested code to production or staging environments.",
  "What is cybersecurity?": "Cybersecurity is the practice of protecting systems, networks, and programs from digital attacks, unauthorized access, and data breaches.",
  "Explain CIA triad": "CIA stands for Confidentiality (only authorized access), Integrity (data is accurate), and Availability (systems accessible when needed).",
  "What is machine learning?": "Machine learning is a subset of AI where systems learn from data to improve performance on tasks without being explicitly programmed.",
  "Difference between AI and ML": "AI is the broader concept of machines simulating human intelligence. ML is a subset focused on learning from data. Deep learning is a subset of ML.",
  "What is REST API?": "REST API is an architectural style for web services using HTTP methods GET, POST, PUT, DELETE and returning data typically in JSON format.",
  "Explain SDLC": "SDLC is the process of planning, creating, testing, and deploying software. Common models include Agile, Waterfall, and Spiral."
}

export default function SkillGap() {
  const [resumeFile, setResumeFile] = useState(null)
  const [jobRole, setJobRole] = useState("")
  const [selectedSkills, setSelectedSkills] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const [openIndex, setOpenIndex] = useState(null)

  const skillOptions = [
    "Java", "Python", "SQL", "Machine Learning", "Deep Learning",
    "React", "Node.js", "Docker", "Kubernetes", "AWS",
    "MongoDB", "PostgreSQL", "TensorFlow", "PyTorch", "NLP"
  ]

  const toggleSkill = (skill) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.docx'))) {
      setResumeFile(file)
    } else {
      setError("Please select a valid PDF or DOCX file.")
    }
  }

  const handleAnalyze = async () => {
    if (!resumeFile || !jobRole) {
      setError("Please upload a resume and select a job role.")
      return
    }
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const formData = new FormData()
      formData.append("resume_file", resumeFile)
      formData.append("job_role", jobRole)
      formData.append("additional_skills", selectedSkills.join(","))
      const response = await fetch(
        `${API_BASE_URL}/api/skill-gap/analyze`,
        { method: "POST", body: formData }
      )
      if (!response.ok) throw new Error("Analysis failed")
      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError("Something went wrong. Make sure the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
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
          Skill Gap Analysis
        </h1>
        <p style={{
          fontSize: "16px",
          color: "var(--brand-olive-lt)"
        }}>
          Upload your resume and select a job role to see exactly what you are missing.
        </p>
      </header>

      {/* Content Area */}
      <main style={{
        background: "var(--section-bg)",
        padding: "48px 24px"
      }} className="skill-gap-content">
        <div style={{
          maxWidth: "860px",
          margin: "0 auto"
        }}>
          {/* Form Card */}
          <div style={{
            background: "white",
            borderRadius: "16px",
            border: "1px solid #ebebeb",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            padding: "28px 32px",
            marginBottom: "24px"
          }}>
            <h2 style={{
              fontSize: "18px",
              fontWeight: "700",
              marginBottom: "24px"
            }}>
              Analyze Your Resume
            </h2>

            {/* Upload Resume */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--brand-charcoal)",
                display: "block",
                marginBottom: "8px"
              }}>
                Upload Resume (PDF or DOCX)
              </label>
              <div
                style={{
                  border: "2px dashed #e0e0d8",
                  borderRadius: "10px",
                  padding: "24px",
                  textAlign: "center",
                  background: "#fafaf8",
                  cursor: "pointer"
                }}
                onClick={() => document.getElementById('resume-upload').click()}
              >
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                {resumeFile ? (
                  <div style={{ color: "var(--brand-charcoal)", fontWeight: "600" }}>
                    {resumeFile.name}
                  </div>
                ) : (
                  <div style={{ color: "#666" }}>
                    Click to upload or drag and drop — PDF or DOCX
                  </div>
                )}
              </div>
            </div>

            {/* Select Job Role */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--brand-charcoal)",
                display: "block",
                marginBottom: "8px"
              }}>
                Select Job Role
              </label>
              <select
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
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
              >
                <option value="" disabled>Select job role</option>
                <option value="Java Developer">Java Developer</option>
                <option value="Python Developer">Python Developer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="AIML Engineer">AIML Engineer</option>
                <option value="Software Developer">Software Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Cloud Engineer">Cloud Engineer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                <option value="Big Data Engineer">Big Data Engineer</option>
                <option value="Network Engineer">Network Engineer</option>
                <option value="AI Engineer">AI Engineer</option>
              </select>
            </div>

            {/* Additional Skills */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--brand-charcoal)",
                display: "block",
                marginBottom: "8px"
              }}>
                Additional Skills (Optional)
              </label>
              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px"
              }} className="skill-chips">
                {skillOptions.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "20px",
                      border: selectedSkills.includes(skill) ? "none" : "1px solid var(--brand-olive)",
                      background: selectedSkills.includes(skill) ? "var(--brand-olive)" : "white",
                      color: selectedSkills.includes(skill) ? "white" : "var(--brand-olive-dk)",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontFamily: "Montserrat"
                    }} className="skill-chip"
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={loading || !resumeFile || !jobRole}
              style={{
                width: "100%",
                background: "var(--brand-olive)",
                color: "white",
                borderRadius: "12px",
                padding: "15px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: loading || !resumeFile || !jobRole ? "not-allowed" : "pointer",
                border: "none",
                opacity: loading || !resumeFile || !jobRole ? 0.6 : 1
              }}
            >
              {loading ? "Analyzing your resume..." : "Analyze Resume"}
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
              marginBottom: "24px"
            }}>
              {error}
            </div>
          )}

          {/* Results Section */}
          {result && (
            <>
              {/* Score + ATS Results */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "16px",
                marginBottom: "24px"
              }} className="score-ats-grid">
                {/* Resume Score */}
                <div style={{
                  background: "white",
                  borderRadius: "16px",
                  border: "1px solid #ebebeb",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  padding: "24px",
                  textAlign: "center"
                }}>
                  <h3 style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "var(--brand-olive-dk)",
                    marginBottom: "16px"
                  }}>
                    Resume Score
                  </h3>
                  <div style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    position: "relative",
                    margin: "16px auto",
                    background: `conic-gradient(var(--brand-olive) ${result.resume_score}%, #f0f0f0 0%)`
                  }}>
                    <div style={{
                      position: "absolute",
                      top: "8px",
                      left: "8px",
                      right: "8px",
                      bottom: "8px",
                      borderRadius: "50%",
                      background: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column"
                    }}>
                      <div style={{
                        fontSize: "36px",
                        fontWeight: "800",
                        color: "var(--brand-charcoal)"
                      }}>
                        {result.resume_score || 0}
                      </div>
                      <div style={{
                        fontSize: "12px",
                        color: "#888"
                      }}>
                        /100
                      </div>
                    </div>
                  </div>
                </div>

                {/* ATS Skill Check */}
                <div style={{
                  background: "white",
                  borderRadius: "16px",
                  border: "1px solid #ebebeb",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  padding: "24px"
                }}>
                  <h3 style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    marginBottom: "16px"
                  }}>
                    ATS Skill Check
                  </h3>

                  <div style={{ marginBottom: "16px" }}>
                    <div style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--brand-charcoal)",
                      marginBottom: "8px"
                    }}>
                      Skills Found:
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {(result.ats_result?.found || []).map(skill => (
                        <span key={skill} style={{
                          background: "rgba(125,155,118,0.12)",
                          border: "1px solid rgba(125,155,118,0.25)",
                          color: "var(--brand-olive-dk)",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: "600"
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "var(--brand-charcoal)",
                      marginBottom: "8px"
                    }}>
                      Skills Missing:
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {(result.ats_result?.missing || []).map(skill => (
                        <span key={skill} style={{
                          background: "rgba(128,128,128,0.12)",
                          border: "1px solid rgba(128,128,128,0.25)",
                          color: "#666",
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: "13px",
                          fontWeight: "600"
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Learning Roadmap */}
              {result.roadmap && Array.isArray(result.roadmap) && (
                <div style={{ marginTop: "32px" }}>
                  <h3 style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "20px", marginBottom: "16px" }}>
                    Your Learning Roadmap
                  </h3>
                  {result.roadmap.map((item, index) => (
                    <div key={index} style={{
                      background: "white",
                      borderRadius: "12px",
                      border: "1px solid #ebebeb",
                      padding: "20px",
                      marginBottom: "16px",
                      display: "flex",
                      gap: "16px"
                    }}>
                      <div style={{
                        background: "var(--brand-charcoal)",
                        color: "white",
                        borderRadius: "8px",
                        padding: "8px 16px",
                        fontWeight: 700,
                        fontFamily: "Montserrat",
                        whiteSpace: "nowrap",
                        height: "fit-content"
                      }}>
                        Week {item.week}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontFamily: "Montserrat", fontSize: "16px", marginBottom: "8px", color: "var(--brand-charcoal)" }}>
                          {item.focus_skill}
                        </div>
                        <div style={{ color: "#666", marginBottom: "12px", fontFamily: "Montserrat", fontSize: "14px" }}>
                          {item.why_it_matters}
                        </div>
                        <ul style={{ paddingLeft: "20px", margin: 0 }}>
                          {item.action_items.map((action, i) => (
                            <li key={i} style={{ fontFamily: "Montserrat", fontSize: "14px", color: "var(--brand-charcoal)", marginBottom: "4px" }}>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Suggested Courses */}
              {result.roadmap && result.roadmap.length > 0 && (
                <div style={{ marginTop: "32px" }}>
                  <h3 style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "20px", marginBottom: "16px" }}>
                    Suggested Courses
                  </h3>
                  {result.roadmap.map((item, index) => (
                    <div key={index} style={{ marginBottom: "24px" }}>
                      <div style={{ fontFamily: "Montserrat", fontWeight: 600, fontSize: "16px", color: "var(--brand-olive)", marginBottom: "12px" }}>
                        {item.focus_skill}
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                        {[
                          { title: `${item.focus_skill} – Coursera`, link: `https://www.coursera.org/search?query=${encodeURIComponent(item.focus_skill)}` },
                          { title: `${item.focus_skill} – Udemy`, link: `https://www.udemy.com/courses/search/?q=${encodeURIComponent(item.focus_skill)}` },
                          { title: `${item.focus_skill} – YouTube`, link: `https://www.youtube.com/results?search_query=${encodeURIComponent(item.focus_skill)}` }
                        ].map((course, i) => (
                          <div key={i} style={{
                            background: "white",
                            borderRadius: "12px",
                            border: "1px solid #ebebeb",
                            padding: "16px",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.04)"
                          }}>
                            <div style={{ fontFamily: "Montserrat", fontWeight: 600, fontSize: "14px", marginBottom: "12px", color: "var(--brand-charcoal)" }}>
                              {course.title}
                            </div>
                            <a href={course.link} target="_blank" rel="noopener noreferrer" style={{
                              display: "block",
                              textAlign: "center",
                              padding: "8px",
                              background: "#f5f5e9",
                              borderRadius: "8px",
                              color: "var(--brand-charcoal)",
                              fontFamily: "Montserrat",
                              fontSize: "13px",
                              fontWeight: 500,
                              textDecoration: "none"
                            }}>
                              View →
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Interview Questions */}
              {result.interview_questions && result.interview_questions.length > 0 && (
                <div style={{ marginTop: "32px" }}>
                  <h3 style={{ fontFamily: "Montserrat", fontWeight: 700, fontSize: "20px", marginBottom: "16px" }}>
                    Interview Questions
                  </h3>
                  {result.interview_questions.map((item, index) => (
                    <details key={index} style={{
                      background: "white",
                      borderRadius: "12px",
                      border: "1px solid #ebebeb",
                      marginBottom: "12px",
                      padding: "0",
                      overflow: "hidden"
                    }}>
                      <summary style={{
                        padding: "16px 20px",
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                        fontSize: "15px",
                        cursor: "pointer",
                        color: "var(--brand-charcoal)",
                        listStyle: "none",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}>
                        {typeof item === "string" ? item : item.question}
                        <span style={{ color: "var(--brand-olive)", fontSize: "18px" }}>+</span>
                      </summary>
                      {typeof item === "object" && item.answer && (
                        <div style={{
                          padding: "0 20px 16px 20px",
                          fontFamily: "Montserrat",
                          fontSize: "14px",
                          color: "#555",
                          lineHeight: "1.6",
                          borderTop: "1px solid #ebebeb"
                        }}>
                          {item.answer}
                        </div>
                      )}
                    </details>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
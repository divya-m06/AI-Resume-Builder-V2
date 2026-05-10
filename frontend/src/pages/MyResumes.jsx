import { useEffect, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import { useAuth } from "../hooks/useAuth"
import { deleteResume, downloadResumePDF, getMyResumes, getStoredUser } from "../services/api"

function formatResumeDate(iso) {
  if (!iso) return ""
  const d = new Date(iso)
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export default function MyResumes() {
  const { user } = useAuth()
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [actionError, setActionError] = useState(null)
  const [downloadingId, setDownloadingId] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!getStoredUser()) {
        setLoading(false)
        setResumes([])
        return
      }

      setLoading(true)
      setError(null)

      try {
        const data = await getMyResumes()
        if (cancelled) return
        const list = data?.resumes
        setResumes(Array.isArray(list) ? list : [])
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || "Failed to load resumes.")
          setResumes([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [user])

  const handleDownload = async (id) => {
    setActionError(null)
    setDownloadingId(id)
    try {
      const blob = await downloadResumePDF(id)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `resume_${id}.pdf`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (e) {
      setActionError(e?.message || "Could not download PDF.")
    } finally {
      setDownloadingId(null)
    }
  }

  const handleDelete = async (id) => {
    setActionError(null)
    setDeletingId(id)
    try {
      await deleteResume(id)
      setResumes((prev) => prev.filter((r) => String(r.id) !== String(id)))
    } catch (e) {
      setActionError(e?.message || "Could not delete resume.")
    } finally {
      setDeletingId(null)
    }
  }

  const sessionUser = user ?? getStoredUser()
  const showFetchLoading = loading
  const showEmpty = !showFetchLoading && sessionUser && !error && resumes.length === 0
  const showGrid = !showFetchLoading && sessionUser && !error && resumes.length > 0

  if (!sessionUser) {
    return <Navigate to="/login" replace />
  }

  return (
    <div style={{ fontFamily: "Montserrat, sans-serif" }}>
      <Navbar page="app" />

      <header
        style={{
          background: "var(--brand-charcoal)",
          padding: "52px 40px",
          paddingTop: "72px",
          textAlign: "center",
        }}
        className="skill-gap-header"
      >
        <h1
          style={{
            fontSize: "34px",
            fontWeight: "800",
            color: "var(--brand-cream)",
            marginBottom: "8px",
          }}
          className="skill-gap-heading"
        >
          My Resumes
        </h1>
        <p style={{ fontSize: "16px", color: "var(--brand-olive-lt)" }}>
          All your previously generated resumes in one place
        </p>
      </header>

      <main
        style={{
          background: "var(--section-bg)",
          padding: "48px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {showFetchLoading && sessionUser && (
            <p
              style={{
                textAlign: "center",
                color: "var(--brand-charcoal)",
                fontSize: "15px",
                padding: "24px",
              }}
            >
              Fetching your resumes...
            </p>
          )}

          {error && sessionUser && (
            <div
              style={{
                background: "rgba(193,18,31,0.08)",
                borderLeft: "4px solid #c1121f",
                color: "#c1121f",
                borderRadius: "8px",
                padding: "14px 18px",
                fontSize: "14px",
                marginBottom: "24px",
              }}
            >
              {error}
            </div>
          )}

          {actionError && (
            <div
              style={{
                background: "rgba(193,18,31,0.08)",
                borderLeft: "4px solid #c1121f",
                color: "#c1121f",
                borderRadius: "8px",
                padding: "14px 18px",
                fontSize: "14px",
                marginBottom: "24px",
              }}
            >
              {actionError}
            </div>
          )}

          {showEmpty && (
            <div
              style={{
                textAlign: "center",
                padding: "48px 24px",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                  color: "var(--brand-charcoal)",
                  marginBottom: "24px",
                }}
              >
                No resumes yet. Go build one!
              </p>
              <Link
                to="/resume-builder"
                style={{
                  display: "inline-block",
                  background: "var(--brand-olive)",
                  color: "white",
                  borderRadius: "40px",
                  padding: "14px 36px",
                  fontSize: "16px",
                  fontWeight: "700",
                  textDecoration: "none",
                }}
              >
                Resume Builder
              </Link>
            </div>
          )}

          {showGrid && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "24px",
              }}
            >
              {resumes.map((resume) => {
                const id = resume.id
                const title = resume.full_name || "Untitled"
                const job =
                  resume.job_title ?? resume.job_role ?? ""
                const created =
                  resume.created_at ?? resume.createdAt

                return (
                  <div
                    key={id}
                    style={{
                      background: "white",
                      borderRadius: "16px",
                      border: "1px solid #ebebeb",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                      padding: "24px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "var(--brand-charcoal)",
                        margin: "0 0 8px 0",
                      }}
                    >
                      {title}
                    </h2>
                    <p
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "var(--brand-olive)",
                        margin: "0 0 12px 0",
                      }}
                    >
                      {job || "—"}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "var(--brand-cream2)",
                        margin: "0 0 24px 0",
                      }}
                    >
                      {formatResumeDate(created)}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginTop: "auto",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleDownload(id)}
                        disabled={
                          downloadingId === id ||
                          deletingId === id
                        }
                        style={{
                          flex: 1,
                          background: "var(--brand-olive)",
                          color: "white",
                          borderRadius: "40px",
                          padding: "12px 16px",
                          fontSize: "14px",
                          fontWeight: "700",
                          cursor:
                            downloadingId === id || deletingId === id
                              ? "not-allowed"
                              : "pointer",
                          border: "none",
                          fontFamily: "Montserrat, sans-serif",
                          opacity:
                            downloadingId === id || deletingId === id
                              ? 0.65
                              : 1,
                        }}
                      >
                        {downloadingId === id ? "Downloading..." : "Download PDF"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(id)}
                        disabled={
                          deletingId === id ||
                          downloadingId === id
                        }
                        style={{
                          flex: 1,
                          background: "white",
                          border: "1px solid #ebebeb",
                          color: "var(--brand-charcoal)",
                          borderRadius: "40px",
                          padding: "12px 16px",
                          fontSize: "14px",
                          fontWeight: "700",
                          cursor:
                            deletingId === id || downloadingId === id
                              ? "not-allowed"
                              : "pointer",
                          fontFamily: "Montserrat, sans-serif",
                          opacity:
                            deletingId === id || downloadingId === id
                              ? 0.65
                              : 1,
                        }}
                      >
                        {deletingId === id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

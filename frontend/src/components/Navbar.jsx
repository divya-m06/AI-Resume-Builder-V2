import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "../hooks/useAuth"
import { getStoredUser, clearAuth } from "../hooks/useAuth"
export default function Navbar({ page = "landing" }) {
  const { user, setUser } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSignOut = () => {
  clearAuth()
  setUser(null)
  navigate("/")
}

  const sessionUser = user ?? getStoredUser()
  const isLoggedIn = Boolean(sessionUser)

  const logoLink = page === "landing" ? "/" : "/dashboard"

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1000,
      background: "rgba(20, 20, 20, 0.85)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      padding: "16px 50px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      {/* Logo */}
      <Link
        to={logoLink}
        style={{
          color: "white",
          fontWeight: 700,
          fontSize: "20px",
          textDecoration: "none",
          fontFamily: "Montserrat, sans-serif"
        }}
      >
        AI Resume Builder
      </Link>

      {/* Right side navigation */}
      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        {page === "landing" ? (
          <>
            <Link
              to="/login"
              className="nav-btn"
              style={{ color: '#f5f5e9', letterSpacing: '0.01em' }}
            >
              Sign In
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/dashboard"
              className="nav-link"
              style={{ color: '#f5f5e9', letterSpacing: '0.01em' }}
            >
              Dashboard
            </Link>
            <Link
              to="/resume-builder"
              className="nav-link"
              style={{ color: '#f5f5e9', letterSpacing: '0.01em' }}
            >
              Resume Builder
            </Link>
            <Link
              to="/skill-gap"
              className="nav-link"
              style={{ color: '#f5f5e9', letterSpacing: '0.01em' }}
            >
              Skill Gap
            </Link>
            <Link
              to="/jd-matcher"
              className="nav-link"
              style={{ color: '#f5f5e9', letterSpacing: '0.01em' }}
            >
              JD Matcher
            </Link>
            <Link
              to="/cover-letter"
              className="nav-link"
              style={{ color: '#f5f5e9', letterSpacing: '0.01em' }}
            >
              Cover Letter
            </Link>
            <Link
              to="/my-resumes"
              className="nav-link"
              style={{ color: '#f5f5e9', letterSpacing: '0.01em' }}
            >
              My Resumes
            </Link>

            {isLoggedIn ? (
              <div style={{ position: "relative" }} ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "var(--brand-olive)",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Montserrat, sans-serif"
                  }}
                >
                  {(sessionUser?.email || sessionUser?.userid || sessionUser?.name || "?").charAt(0).toUpperCase()}
                </button>

                {dropdownOpen && (
                  <div style={{
                    position: "absolute",
                    right: 0,
                    top: "48px",
                    background: "white",
                    borderRadius: "10px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                    minWidth: "160px",
                    zIndex: 100
                  }}>
                    <Link
                      to="/profile"
                      style={{
                        display: "block",
                        padding: "12px 16px",
                        color: "var(--brand-charcoal)",
                        textDecoration: "none",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "14px",
                        borderBottom: "1px solid #eee"
                      }}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Edit Profile
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setDropdownOpen(false)
                      }}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "none",
                        border: "none",
                        color: "var(--brand-charcoal)",
                        textAlign: "left",
                        cursor: "pointer",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "14px"
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="nav-btn"
                  style={{ color: '#f5f5e9', letterSpacing: '0.01em' }}
                >
                  Sign In
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  )
}
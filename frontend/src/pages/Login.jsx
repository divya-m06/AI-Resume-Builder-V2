import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser, signupUser } from "../services/api"
import { useAuth } from "../hooks/useAuth"

export default function Login() {
  const { setUser } = useAuth()
  const [activeTab, setActiveTab] = useState("signin")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  // Form states
  const [signinForm, setSigninForm] = useState({
    userid: "",
    password: ""
  })

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    userid: "",
    phone: "",
    password: ""
  })

  const handleSignIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const data = await loginUser(signinForm.userid, signinForm.password)
      if (data?.user) {
        setUser(data.user)
        navigate("/dashboard")
      }
    } catch (err) {
      setError(err?.message || "Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      await signupUser(signupForm)
      setSuccess("Account created successfully! Please sign in.")
      setActiveTab("signin")
      setSignupForm({
        name: "",
        email: "",
        userid: "",
        phone: "",
        password: ""
      })
    } catch (err) {
      setError(err?.message || "Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--brand-charcoal)",
      fontFamily: "Montserrat, sans-serif",
      padding: "20px"
    }}>
      <div style={{
        background: "white",
        borderRadius: "16px",
        padding: "48px",
        maxWidth: "420px",
        width: "100%",
        boxShadow: "0 8px 40px rgba(0,0,0,0.18)"
      }}>
        {/* Logo */}
        <div style={{
          textAlign: "center",
          marginBottom: "8px"
        }}>
          <div style={{
            fontSize: "22px",
            fontWeight: "800",
            color: "var(--brand-olive)"
          }}>
            AI Resume Builder
          </div>
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: "26px",
          fontWeight: "800",
          color: "var(--brand-charcoal)",
          textAlign: "center",
          marginBottom: "8px"
        }}>
          Welcome Back
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: "14px",
          color: "#888",
          textAlign: "center",
          marginBottom: "32px"
        }}>
          Sign in to access your resumes and career tools.
        </p>

        {/* Google Sign In Button */}
        <button
          type="button"
          disabled
          style={{
            width: "100%",
            background: "#ccc",
            color: "white",
            borderRadius: "40px",
            padding: "13px",
            fontSize: "15px",
            fontWeight: "600",
            fontFamily: "Montserrat, sans-serif",
            border: "none",
            cursor: "not-allowed",
            marginBottom: "24px"
          }}
        >
          Continue with Google
        </button>

        {/* Divider */}
        <div style={{
          borderTop: "1px solid #eee",
          margin: "24px 0"
        }}></div>

        {/* Tab Switcher */}
        <div style={{
          display: "flex",
          marginBottom: "24px"
        }}>
          <button
            onClick={() => {
              setActiveTab("signin")
              setError("")
              setSuccess("")
            }}
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              fontFamily: "Montserrat, sans-serif",
              borderBottom: activeTab === "signin" ? "2px solid var(--brand-olive)" : "2px solid transparent",
              color: activeTab === "signin" ? "var(--brand-olive)" : "#888"
            }}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setActiveTab("signup")
              setError("")
              setSuccess("")
            }}
            style={{
              flex: 1,
              padding: "12px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              fontFamily: "Montserrat, sans-serif",
              borderBottom: activeTab === "signup" ? "2px solid var(--brand-olive)" : "2px solid transparent",
              color: activeTab === "signup" ? "var(--brand-olive)" : "#888"
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div style={{
            background: "#d4edda",
            color: "#155724",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
            fontSize: "14px",
            textAlign: "center"
          }}>
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div style={{
            background: "#f8d7da",
            color: "#721c24",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "16px",
            fontSize: "14px",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        {/* Sign In Form */}
        {activeTab === "signin" && (
          <form onSubmit={handleSignIn}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--brand-charcoal)",
                display: "block",
                marginBottom: "6px"
              }}>
                User ID
              </label>
              <input
                type="text"
                name="userid"
                value={signinForm.userid}
                onChange={(e) => setSigninForm({...signinForm, userid: e.target.value})}
                required
                style={{
                  width: "100%",
                  border: "1.5px solid #e0e0d8",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "14px",
                  background: "#fafaf8",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ marginBottom: "8px" }}>
              <label style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--brand-charcoal)",
                display: "block",
                marginBottom: "6px"
              }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={signinForm.password}
                onChange={(e) => setSigninForm({...signinForm, password: e.target.value})}
                required
                style={{
                  width: "100%",
                  border: "1.5px solid #e0e0d8",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "14px",
                  background: "#fafaf8",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{
              textAlign: "right",
              marginBottom: "24px"
            }}>
              <Link
                to="/forgot-password"
                style={{
                  fontSize: "12px",
                  color: "var(--brand-olive-dk)",
                  textDecoration: "none"
                }}
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "var(--brand-olive)",
                color: "white",
                borderRadius: "40px",
                padding: "13px",
                fontSize: "15px",
                fontWeight: "600",
                fontFamily: "Montserrat, sans-serif",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        )}

        {/* Sign Up Form */}
        {activeTab === "signup" && (
          <form onSubmit={handleSignUp}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--brand-charcoal)",
                display: "block",
                marginBottom: "6px"
              }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={signupForm.name}
                onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                required
                style={{
                  width: "100%",
                  border: "1.5px solid #e0e0d8",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "14px",
                  background: "#fafaf8",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--brand-charcoal)",
                display: "block",
                marginBottom: "6px"
              }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={signupForm.email}
                onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                required
                style={{
                  width: "100%",
                  border: "1.5px solid #e0e0d8",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "14px",
                  background: "#fafaf8",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--brand-charcoal)",
                display: "block",
                marginBottom: "6px"
              }}>
                User ID
              </label>
              <input
                type="text"
                name="userid"
                value={signupForm.userid}
                onChange={(e) => setSignupForm({...signupForm, userid: e.target.value})}
                required
                style={{
                  width: "100%",
                  border: "1.5px solid #e0e0d8",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "14px",
                  background: "#fafaf8",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--brand-charcoal)",
                display: "block",
                marginBottom: "6px"
              }}>
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={signupForm.phone}
                onChange={(e) => setSignupForm({...signupForm, phone: e.target.value})}
                style={{
                  width: "100%",
                  border: "1.5px solid #e0e0d8",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "14px",
                  background: "#fafaf8",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "var(--brand-charcoal)",
                display: "block",
                marginBottom: "6px"
              }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                value={signupForm.password}
                onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                required
                style={{
                  width: "100%",
                  border: "1.5px solid #e0e0d8",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "14px",
                  background: "#fafaf8",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "var(--brand-olive)",
                color: "white",
                borderRadius: "40px",
                padding: "13px",
                fontSize: "15px",
                fontWeight: "600",
                fontFamily: "Montserrat, sans-serif",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        )}

        {/* Continue without account */}
        <div style={{
          textAlign: "center",
          marginTop: "24px",
          fontSize: "14px",
          color: "#666"
        }}>
          Or continue without an account —{" "}
          <Link
            to="/dashboard"
            style={{
              color: "var(--brand-olive)",
              textDecoration: "none",
              fontWeight: "600"
            }}
          >
            Skip for now
          </Link>
        </div>

        {/* Back to Home */}
        <div style={{
          textAlign: "center",
          marginTop: "20px"
        }}>
          <Link
            to="/"
            style={{
              color: "var(--brand-olive-dk)",
              textDecoration: "none",
              fontSize: "13px",
              display: "block"
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { apiFetch, getStoredUser } from '../services/api'
import { useAuth } from '../hooks/useAuth'

export default function Profile() {
  const { user, setUser } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin_url: "",
    github_url: ""
  })
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) {
      setFormData(prev => ({
        ...prev,
        name: storedUser.name || "",
        email: storedUser.email || "",
        phone: storedUser.phone || "",
        linkedin_url: storedUser.linkedin_url || "",
        github_url: storedUser.github_url || ""
      }))
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    const currentUser = getStoredUser()
    if (!currentUser || !currentUser.userid) {
      setError("User not authenticated.")
      setLoading(false)
      return
    }

    try {
      const data = await apiFetch("/api/profile/update", {
        method: "POST",
        body: JSON.stringify({ userid: currentUser.userid, ...formData })
      })

      if (data && data.ok) {
        setSuccess(true)
        // Update local storage
        const updatedUser = { ...currentUser, name: formData.name, email: formData.email, phone: formData.phone, linkedin_url: formData.linkedin_url, github_url: formData.github_url }
        localStorage.setItem("auth_user", JSON.stringify(updatedUser))
        setUser(updatedUser)
        
        // Hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000)
      } else {
        throw new Error("Failed to update profile.")
      }
    } catch (err) {
      setError(err?.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
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
          My Profile
        </h1>
        <p style={{
          fontSize: "16px",
          color: "var(--brand-olive-lt)",
          margin: 0
        }}>
          Manage your personal information
        </p>
      </header>

      {/* Content */}
      <main style={{
        background: "var(--section-bg)",
        padding: "48px 24px",
        minHeight: "calc(100vh - 250px)"
      }}>
        <div style={{
          maxWidth: "600px",
          margin: "0 auto"
        }}>
          
          {/* Form Card */}
          <div style={{
            background: "white",
            borderRadius: "16px",
            border: "1px solid #ebebeb",
            padding: "32px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)"
          }}>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: 0 }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--brand-charcoal2, var(--brand-charcoal))', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ebebeb', fontFamily: 'Montserrat, sans-serif', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--brand-charcoal2, var(--brand-charcoal))', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ebebeb', fontFamily: 'Montserrat, sans-serif', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--brand-charcoal2, var(--brand-charcoal))', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ebebeb', fontFamily: 'Montserrat, sans-serif', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--brand-charcoal2, var(--brand-charcoal))', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  LinkedIn URL
                </label>
                <input
                  type="text"
                  name="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/yourname"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ebebeb', fontFamily: 'Montserrat, sans-serif', fontSize: '14px', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--brand-charcoal2, var(--brand-charcoal))', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  GitHub URL
                </label>
                <input
                  type="text"
                  name="github_url"
                  value={formData.github_url}
                  onChange={handleInputChange}
                  placeholder="https://github.com/yourusername"
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
                {loading ? "Saving..." : "Save Changes"}
              </button>

              {success && (
                <div style={{
                  background: "rgba(125,155,118,0.08)",
                  borderLeft: "4px solid var(--brand-olive)",
                  color: "var(--brand-olive-dk, var(--brand-olive))",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  marginTop: "8px",
                  fontWeight: "500"
                }}>
                  Profile updated successfully
                </div>
              )}

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

        </div>
      </main>
      
      <Footer />
    </div>
  )
}

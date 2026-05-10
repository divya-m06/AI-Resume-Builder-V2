import axios from "axios"

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
})

export async function apiFetch(path, options = {}) {
  const headers = new Headers(options.headers ?? undefined)

  if (options.body && typeof options.body === "string" && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  // Auto-attach JWT Bearer token if one exists
  const token = localStorage.getItem("auth_token")
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  const url = `${baseURL}${normalizedPath}`

  const res = await fetch(url, {
    ...options,
    headers,
  })

  if (!res.ok) {
    let msg = res.statusText
    try {
      const text = await res.text()
      if (text) {
        try {
          const j = JSON.parse(text)
          msg = typeof j.detail === "string" ? j.detail : Array.isArray(j.detail) ? JSON.stringify(j.detail) : j.detail ?? j.message ?? text
        } catch {
          msg = text
        }
      }
    } catch {
      /* ignore */
    }
    throw new Error(typeof msg === "string" ? msg : res.statusText)
  }

  const ct = res.headers.get("content-type") || ""

  if (ct.includes("application/pdf") || ct.includes("application/vnd.openxmlformats")) {
    return res.blob()
  }

  if (res.status === 204) {
    return null
  }

  const text = await res.text()
  if (!text) return null

  if (ct.includes("application/json")) {
    return JSON.parse(text)
  }

  return text
}

export const loginUser = async (userid, password) => {
  const data = await apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ userid, password }),
  })
  if (data?.user) {
    localStorage.removeItem("user")
    localStorage.setItem("auth_user", JSON.stringify(data.user))
  }
  // Store the JWT token so apiFetch can attach it to protected requests
  if (data?.token) {
    localStorage.setItem("auth_token", data.token)
  }
  return data
}

export const signupUser = (formData) =>
  apiFetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(formData),
  })

export const logoutUser = () => {
  localStorage.removeItem("auth_user")
  localStorage.removeItem("auth_token")
  localStorage.removeItem("user")
}

export const getStoredUser = () => {
  try {
    const u = localStorage.getItem("auth_user") ?? localStorage.getItem("user")
    return u ? JSON.parse(u) : null
  } catch {
    return null
  }
}

export const getMyResumes = () => {
  const user = getStoredUser()
  return apiFetch(`/api/my-resumes?userid=${encodeURIComponent(user?.userid || "")}`)
}

export const saveResume = (resumeData) =>
  apiFetch("/api/resume/save", {
    method: "POST",
    body: JSON.stringify(resumeData),
  })

export const downloadResumePDF = (id) =>
  apiFetch(`/api/resume/${id}/pdf`)

export const deleteResume = (id) =>
  apiFetch(`/api/resume/${id}`, { method: "DELETE" })

export const analyzeJD = (jdText, resumeText) =>
  apiFetch("/api/jd-match", {
    method: "POST",
    body: JSON.stringify({ jd_text: jdText, resume_text: resumeText }),
  })

export async function generateCoverLetter(data) {
  return apiFetch("/api/cover-letter/generate", {
    method: "POST",
    body: JSON.stringify(data)
  })
}

export default api

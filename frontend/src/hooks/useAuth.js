import { useState, useEffect } from "react"

export function getStoredUser() {
  try {
    const u = localStorage.getItem("auth_user")
    return u ? JSON.parse(u) : null
  } catch {
    return null
  }
}

export function getStoredToken() {
  return localStorage.getItem("auth_token") || null
}

export function clearAuth() {
  localStorage.removeItem("auth_user")
  localStorage.removeItem("auth_token")
}

export function useAuth() {
  const [user, setUser] = useState(() => getStoredUser())

  useEffect(() => {
    const handleStorage = () => setUser(getStoredUser())
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  return { user, setUser }
}
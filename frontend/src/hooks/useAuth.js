import { useState, useEffect } from "react"
import { getStoredUser } from "../services/api"

export function useAuth() {
  const [user, setUser] = useState(() => getStoredUser())

  useEffect(() => {
    const handleStorage = () => setUser(getStoredUser())
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  return { user, setUser }
}

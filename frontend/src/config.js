/** Backend API origin — set VITE_API_BASE_URL in frontend/.env for production. */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"

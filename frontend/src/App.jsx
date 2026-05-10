import { Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ResumeBuilder from "./pages/ResumeBuilder"
import SkillGap from "./pages/SkillGap"
import JDMatcher from "./pages/JDMatcher"
import MyResumes from "./pages/MyResumes"
import CoverLetter from "./pages/CoverLetter"
import Profile from "./pages/Profile"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/resume-builder" element={<ResumeBuilder />} />
      <Route path="/skill-gap" element={<SkillGap />} />
      <Route path="/jd-matcher" element={<JDMatcher />} />
      <Route path="/my-resumes" element={<MyResumes />} />
      <Route path="/cover-letter" element={<CoverLetter />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

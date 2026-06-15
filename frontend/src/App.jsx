import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import StudentRegistration from "./components/StudentRegistration";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";

function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e5aa8] via-[#103466] to-slate-900">

      {/* Show header only on registration page */}
      {location.pathname === "/" && <Header />}

      <div className={location.pathname === "/" ? "max-w-4xl mx-auto px-4 py-10" : "w-full"}>
        <Routes>
          <Route path="/" element={<StudentRegistration />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>

    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
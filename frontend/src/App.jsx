import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import LookupPage from "./pages/LookupPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LookupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
      <footer className="border-t border-gray-100 py-6 text-center text-xs text-gray-400">
        T-Mobile Smart Device Upgrade Tracker · Internal demo tool · Not a public-facing
        application
      </footer>
    </div>
  );
}

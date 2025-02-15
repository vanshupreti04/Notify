import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import Docs from "./pages/Docs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// Footer pages - Company
import AboutUs from "./pages/AboutUs";
import Careers from "./pages/Careers";
import Security from "./pages/Security";
import Status from "./pages/Status";

// Footer pages - Download
import MobileApps from "./pages/MobileApps";
import DesktopApps from "./pages/DesktopApps";
import CalendarSync from "./pages/CalendarSync";
import BrowserExtension from "./pages/BrowserExtension";

// Footer pages - Resources
import HelpCenter from "./pages/HelpCenter";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import Community from "./pages/Community";

// Footer pages - NoTiFy For
import SmallBusiness from "./pages/SmallBusiness";
import Personal from "./pages/Personal";

// New pages
import TermsPrivacy from "./pages/TermsPrivacy";   // Ensure file is named TermsPrivacy.jsx or TermsPrivacy.js
import Enterprise from "./pages/Enterprise";
import ExploreMore from "./pages/ExploreMore";      // Ensure file is named ExploreMore.jsx or ExploreMore.js

// Optional fallback for 404
const NotFound = () => (
  <div className="min-h-screen bg-black text-white flex items-center justify-center">
    <h1 className="text-5xl font-bold">404 - Page Not Found</h1>
  </div>
);

const App = () => {
  useEffect(() => {
    socket.connect(); // ✅ Connect WebSocket on app start
    return () => socket.disconnect(); // Cleanup on unmount
  }, []);

  return (
    <Router>
      <Routes>
        {/* Your original routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Protect Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Footer routes - Company */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/security" element={<Security />} />
        <Route path="/status" element={<Status />} />

        {/* Footer routes - Download */}
        <Route path="/mobile-apps" element={<MobileApps />} />
        <Route path="/desktop-apps" element={<DesktopApps />} />
        <Route path="/calendar-sync" element={<CalendarSync />} />
        <Route path="/browser-extension" element={<BrowserExtension />} />

        {/* Footer routes - Resources */}
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/community" element={<Community />} />

        {/* Footer routes - NoTiFy For */}
        <Route path="/small-business" element={<SmallBusiness />} />
        <Route path="/personal" element={<Personal />} />

        {/* New pages */}
        <Route path="/terms-privacy" element={<TermsPrivacy />} />
        <Route path="/enterprise" element={<Enterprise />} />
        <Route path="/explore-more" element={<ExploreMore />} />

        {/* Fallback route for unknown paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

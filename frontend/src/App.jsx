import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { io } from "socket.io-client";

// Importing pages
import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import Docs from "./pages/Docs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// Footer pages - Company
import AboutUs from "./OtherPages/AboutUs";
import Careers from "./OtherPages/Careers";
import Security from "./OtherPages/Security";
import Status from "./OtherPages/Status";

// Footer pages - Download
import MobileApps from "./OtherPages/MobileApps";
import DesktopApps from "./OtherPages/DesktopApps";
import CalendarSync from "./OtherPages/CalendarSync";
import BrowserExtension from "./OtherPages/BrowserExtension";

// Footer pages - Resources
import HelpCenter from "./OtherPages/HelpCenter";
import Pricing from "./OtherPages/Pricing";
import Blog from "./OtherPages/Blog";
import Community from "./OtherPages/Community";

// Footer pages - NoTiFy For
import SmallBusiness from "./OtherPages/SmallBusiness";
import Personal from "./OtherPages/Personal";

// New pages
import TermsPrivacy from "./OtherPages/TermsPrivacy";
import Enterprise from "./OtherPages/Enterprise";
import ExploreMore from "./OtherPages/ExploreMore";

// WebSocket connection
const socket = io("http://localhost:3000"); // Replace with actual URL

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// 404 Page
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
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Route - Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Footer Routes - Company */}
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/security" element={<Security />} />
        <Route path="/status" element={<Status />} />

        {/* Footer Routes - Download */}
        <Route path="/mobile-apps" element={<MobileApps />} />
        <Route path="/desktop-apps" element={<DesktopApps />} />
        <Route path="/calendar-sync" element={<CalendarSync />} />
        <Route path="/browser-extension" element={<BrowserExtension />} />

        {/* Footer Routes - Resources */}
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/community" element={<Community />} />

        {/* Footer Routes - NoTiFy For */}
        <Route path="/small-business" element={<SmallBusiness />} />
        <Route path="/personal" element={<Personal />} />

        {/* New Pages */}
        <Route path="/terms-privacy" element={<TermsPrivacy />} />
        <Route path="/enterprise" element={<Enterprise />} />
        <Route path="/explore-more" element={<ExploreMore />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

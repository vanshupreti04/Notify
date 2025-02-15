import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ Import useTranslation
import logo from "../assets/logo.png";
import Hero from "../components/Hero";
import { BentoGridSecondDemo } from "../blocks/BentoGrid/BentoGridSecondDemo";
import MovingText from "../blocks/Moving-Text/MovingText";
import UseCase from "../components/UseCase";
import Productivity from "../components/Productivity";
import Testimonial from "../components/Testimonial";
import Footer from "../components/Footer";

const Home = () => {
  const { t } = useTranslation(); // ✅ Initialize translation function

  return (
    <div className="relative min-h-screen bg-[#000000] text-white">
      {/* Navbar Section */}
      <nav className="relative flex items-center justify-between px-8 md:px-12 py-6">
        {/* Left Side: Logo & Project Name */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Uninote Logo" className="h-12 w-12" />
          <h1 className="text-2xl font-bold text-white">{t("logo_heading")}</h1> 
        </div>

        {/* Centered Navigation Links with Routes */}
        <div className="relative flex space-x-6">
          {[
            { name: t("home"), path: "/" },
            { name: t("features"), path: "/features" },
            { name: t("docs"), path: "/docs" },
            { name: t("about"), path: "/about" }
          ].map((item, index) => (
            <div key={index} className="relative group overflow-hidden rounded-2xl">
              <span className="absolute inset-0 w-full h-full bg-white transform scale-y-0 transition-all duration-300 ease-in-out group-hover:scale-y-100 rounded-2xl"></span>
              <Link
                to={item.path}
                className="relative z-10 block px-6 py-2 text-[#AAAAAA] font-medium text-lg rounded-2xl transition-all duration-300 ease-in-out group-hover:text-black"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Login Button with Routing */}
        <Link
          to="/login"
          className="px-6 py-2 text-lg font-medium text-white border-2 border-[#AC6AFF] rounded-lg bg-transparent transition-all duration-300 hover:text-[#AC6AFF]"
        >
          {t("login")}
        </Link>
      </nav>

      {/* Hero Section */}
      <div className="-mt-16">
        <Hero />
      </div>

      {/* Column Grid Section */}
      <div className="mt-12">
        <BentoGridSecondDemo />
      </div>

      {/* Moving Text Section */}
      <div className="mt-12">
        <MovingText />
      </div>

      {/* Use Case Section */}
      <div className="mt-20">
        <UseCase />
      </div>

      {/* Productivity Section */}
      <div className="mt-60 pb-32 ">
        <Productivity />
      </div> 

      {/* Testimonial Section */}
      <div className="mt-11 pb-32 ">
        <Testimonial />
      </div> 

      {/* ✅ Footer Section */}
      <div className="mt-10 pb-4">
        <hr className="border-t border-gray-100 opacity-20 w-full" />
        <Footer />
      </div>
    </div>
  );
};

export default Home;

"use client"
import React, { useState } from "react";
import {
  FiSun,
  FiMoon,
  FiGlobe,
  FiBell,
  FiMail,
  FiSettings,
} from "react-icons/fi";

const Topbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <header className="w-full h-26 flex items-center justify-between px-6 bg-white shadow-sm rounded-xl">
      <div className="flex flex-col justify-center gap-4">
        <h1 className="text-xl font-semibold text-black">Koleksiyon</h1>
        <p className="text-md text-black">Koleksiyon Listesi</p>
      </div>

      <div className="flex items-center gap-8 mr-22">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-1.5 rounded-full border border-gray-200 bg-gray-100 hover:shadow-md  duration-300"
        >
          <FiSun className={`w-6 h-6 ${!isDarkMode ? "text-blue-500" : "text-gray-400"}`} />
          <div className="relative w-10 h-5 bg-gray-300 rounded-full transition-all duration-300">
            <div
              className={`absolute top-0.5 h-4 w-4 rounded-full shadow-md transition-all duration-300 transform ${
                isDarkMode ? "translate-x-5 bg-gray-700" : "translate-x-0 bg-blue-600"
              }`}
            />
          </div>
          <FiMoon className={`w-6 h-6 ${isDarkMode ? "text-black" : "text-gray-400"}`} />
        </button>
                
         {/* Vertical Divider */}       
        <div className="w-[1px] h-12 border border-gray-300 " />

        <button className="hover:text-black text-gray-600 transition-all">
          <FiGlobe className="w-7 h-7" />
        </button>

        <button className="relative hover:text-black text-gray-600 transition-all">
          <FiBell className="w-7 h-7" />
          <span className="absolute -top-2 -right-2 text-[10px] bg-blue-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
            12
          </span>
        </button>

        <button className="hover:text-black text-gray-600 transition-all">
          <FiMail className="w-7 h-7" />
        </button>

        <button className="hover:text-black text-gray-600 transition-all">
          <FiSettings className="w-7 h-7" />
        </button>

        <div className="w-11 h-11 rounded-full bg-gray-300 border border-gray-400" />
      </div>
    </header>
  );
};

export default Topbar;
import React, { useState, useEffect, useRef } from "react";
import { MdOutlineTune } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiSolidMoon } from "react-icons/bi";
import { IoMdSunny } from "react-icons/io";

const Navbar = ({ onDisplayOptionsClick, onModeChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [arrowRotation, setArrowRotation] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDropdown = () => {
    onDisplayOptionsClick();
    setIsDropdownOpen(!isDropdownOpen);
    setArrowRotation((prevRotation) => (prevRotation === 0 ? 180 : 0));
  };

  const handleChange = () => {
    setDarkMode(!darkMode);
    onModeChange();
  };

  return (
    <nav
      className={
        darkMode
          ? `flex justify-between items-center px-5 py-3 bg-slate-900 text-white`
          : `flex justify-between items-center px-5 py-3 border border-b-1`
      }
    >
      <div className="">
        <button
          onClick={toggleDropdown}
          className={
            darkMode
              ? `inline-flex items-center gap-2 px-4 py-2 border-gray-500 border-2 rounded-md shadow-lg text-sm font-small text-white bg-slate-900 focus:outline-none transition-transform duration-300 ease-in-out`
              : `inline-flex items-center gap-2 px-4 py-2 border border-gray-100 rounded-md shadow-md text-sm font-small text-gray-700 bg-white focus:outline-none transition-transform duration-300 ease-in-out`
          }
          type="button"
        >
          <MdOutlineTune className="text-gray-600 size-4" />
          Display
          <IoIosArrowDown
            className={`transform ${isDropdownOpen ? "rotate-180" : ""}`}
            style={{ transition: "transform 300ms ease-in-out" }}
          />
        </button>
      </div>
      <div onClick={handleChange}>
        {!darkMode ? (
          <BiSolidMoon className="size-5" />
        ) : (
          <IoMdSunny className="size-5" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
